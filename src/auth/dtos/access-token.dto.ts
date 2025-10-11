export class AccessTokenDto {
  access_token: string;
  user: {
    user_id: string;
    name: string;
    email: string;
    user_type: string;
    profile_picture: string;
  };
}