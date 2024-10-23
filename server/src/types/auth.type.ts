export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type RefreshTokenRequest = {
  refreshToken: string;
};
