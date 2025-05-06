namespace Collectibles.Backend.Api.Exceptions;

public class EmailAlreadyExistsException : Exception
{
    public EmailAlreadyExistsException(string email)
        : base($"An account is already registered against email '{email}'.") { }
}

public class UserLookupException : Exception
{
    public UserLookupException(string message) : base(message) { }
}

public class RefreshTokenLookupException : Exception
{
    public RefreshTokenLookupException(string message) : base(message) { }
}