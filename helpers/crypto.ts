import * as Crypto from "expo-crypto";

export const crypto = {
  extractPublicIdFromUrl(url: string): string | null {
    const regex = /\/v\d+\/(.+?)(?:\.\w+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  },
  
  async generateSignature(publicId: string, timestamp: string, apiSecret: string): Promise<string> {
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`; 
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA1,
      stringToSign
    );
  },
};
