import { Algorithm } from 'jsonwebtoken';

export type DecryptJwtTokenPayload = {
  token: string;
  secret: string;
};

export type DecryptJwtTokenResponse = {
  id: string;
  exp: number;
  iat: number;
};

export type GenerateJwtTokenPayload = {
  id: string;
  secret: string;
  algorithm: Algorithm;
};

export type passwordHelperPayload = {
  password: string;
  hash?: string;
};
