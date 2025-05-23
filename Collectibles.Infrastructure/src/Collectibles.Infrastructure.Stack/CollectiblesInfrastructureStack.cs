using Amazon.CDK;
using Amazon.CDK.AWS.AppConfig;
using Amazon.CDK.AWS.AppRunner;
using Amazon.CDK.AWS.DynamoDB;
using Amazon.CDK.AWS.Ecr.Assets;
using Amazon.CDK.AWS.IAM;
using Amazon.CDK.AWS.S3;
using Constructs;

namespace Collectibles.Infrastructure
{
    public class CollectiblesInfrastructureStack : Stack
    {
        internal CollectiblesInfrastructureStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            var appRuntimeRole = new Role(this, "AppRunnerRuntimeRole", new RoleProps
            {
                AssumedBy = new ServicePrincipal("tasks.apprunner.amazonaws.com")
            });

            ProvisionS3Bucket(appRuntimeRole);
            ProvisionDynamoDBTables(appRuntimeRole);
            ProvisionAppRunner(appRuntimeRole);
        }

        private void ProvisionS3Bucket(Role appRuntimeRole)
        {
            var bucket = new Bucket(this, "DevImagesBucket", new BucketProps
            {
                BucketName = "dev-images-collectibles-45a1eccc",
                RemovalPolicy = RemovalPolicy.DESTROY,
                AutoDeleteObjects = true
            });
            
            bucket.GrantReadWrite(appRuntimeRole);
        }

        private void ProvisionDynamoDBTables(Role appRuntimeRole)
        {
            var userTable = new Table(this, "UserTable", new TableProps
            {
                TableName = "User",
                PartitionKey = new Attribute { Name = "id", Type = AttributeType.STRING },
                BillingMode = BillingMode.PAY_PER_REQUEST,
                RemovalPolicy = RemovalPolicy.DESTROY,
            });
            
            userTable.AddGlobalSecondaryIndex(new GlobalSecondaryIndexProps
            {
                IndexName = "EmailIndex",
                PartitionKey = new Attribute { Name = "email", Type = AttributeType.STRING },
                ProjectionType = ProjectionType.ALL,
            });

            var collectionTable = new Table(this, "CollectionTable", new TableProps
            {
                TableName = "Collection",
                PartitionKey = new Attribute { Name = "id", Type = AttributeType.STRING },
                BillingMode = BillingMode.PAY_PER_REQUEST,
                RemovalPolicy = RemovalPolicy.DESTROY,
            });

            var collectibleTable = new Table(this, "CollectibleTable", new TableProps
            {
                TableName = "Collectible",
                PartitionKey = new Attribute { Name = "userId", Type = AttributeType.STRING },
                SortKey = new Attribute { Name = "collectibleId", Type = AttributeType.STRING },
                BillingMode = BillingMode.PAY_PER_REQUEST,
                RemovalPolicy = RemovalPolicy.DESTROY,
            });

            var refreshTable = new Table(this, "RefreshTable", new TableProps
            {
                TableName = "Refresh",
                PartitionKey = new Attribute { Name = "userId", Type = AttributeType.STRING },
                SortKey = new Attribute { Name = "tokenId", Type = AttributeType.STRING },
                BillingMode = BillingMode.PAY_PER_REQUEST,
                RemovalPolicy = RemovalPolicy.DESTROY,
            });

            refreshTable.AddGlobalSecondaryIndex(new GlobalSecondaryIndexProps
            {
                IndexName = "TokenIndex",
                PartitionKey = new Attribute { Name = "token", Type = AttributeType.STRING },
                ProjectionType = ProjectionType.ALL,
            });
            
            userTable.GrantReadWriteData(appRuntimeRole);
            collectionTable.GrantReadWriteData(appRuntimeRole);
            collectibleTable.GrantReadWriteData(appRuntimeRole);
            refreshTable.GrantReadWriteData(appRuntimeRole);
        }

        private void ProvisionAppRunner(Role appRuntimeRole)
        {
            var ecrAccessRole = new Role(this, "AppRunnerECRAccessRole", new RoleProps
            {
                AssumedBy = new ServicePrincipal("build.apprunner.amazonaws.com")
            });
            ecrAccessRole.AddManagedPolicy(ManagedPolicy.FromAwsManagedPolicyName("AmazonEC2ContainerRegistryReadOnly"));
            
            var imageAsset = new DockerImageAsset(this, "CollectiblesBackendImage", new DockerImageAssetProps
            {
                Directory = "../Collectibles.Backend/Collectibles.Backend.Api/",
                Platform = Platform_.LINUX_AMD64
            });

            var appRunnerService = new CfnService(this, "CollectiblesAppRunnerService", new CfnServiceProps
            {
                SourceConfiguration = new CfnService.SourceConfigurationProperty
                {
                    ImageRepository = new CfnService.ImageRepositoryProperty
                    {
                        ImageIdentifier = imageAsset.ImageUri,
                        ImageRepositoryType = "ECR",
                        ImageConfiguration = new CfnService.ImageConfigurationProperty
                        {
                            Port = "80"
                        }
                    },
                    AuthenticationConfiguration = new CfnService.AuthenticationConfigurationProperty
                    {
                        AccessRoleArn = ecrAccessRole.RoleArn
                    },
                    AutoDeploymentsEnabled = true
                },
                InstanceConfiguration = new CfnService.InstanceConfigurationProperty
                {
                    InstanceRoleArn = appRuntimeRole.RoleArn
                }
            });

            new CfnOutput(this, "ServiceUrl", new CfnOutputProps
            {
                Value = $"https://{appRunnerService.AttrServiceUrl}",
                Description = "App Runner Service URL"
            });
        }
    }
}
