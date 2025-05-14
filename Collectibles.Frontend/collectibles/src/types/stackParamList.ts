import {Collectible, Collection} from "./collection";

export type AuthStackList = {
  'AuthStack': undefined;
  'Welcome': undefined;
  'Signup': undefined;
  'Login': undefined;
};

export type HomeStackList = {
  'HomeStack': undefined;
  'Home': undefined;
  'Collection': { collection: Collection };
  'CollectibleClue': { collectible: Collectible };
  'CollectibleStack': undefined;
};

export type CollectibleStackList = {
  'CollectibleStack': undefined;
  'CollectibleDetails': undefined;
  'CollectibleLog': undefined;
};

export type CollectStackList = {
  'CollectStack': undefined;
  'Collect': undefined;
  'ChooseCollectible': undefined;
  'UploadPhoto': undefined;
  'AddDetails': undefined;
  'ChangePhoto': undefined;
  'EditDetails': undefined;
};

export type SettingsStackList = {
  'SettingsStack': undefined;
  'Settings': undefined;
  'ChangePassword': undefined;
  'ChangeUsername': undefined;
};


export type MainStackList = {
  'HomeStack': undefined;
  'CollectStack': undefined;
  'SettingsStack': undefined;
};
