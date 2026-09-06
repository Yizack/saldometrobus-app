export interface AltchaChallenge {
  algorithm: string;
  challenge: string;
  maxnumber: number;
  salt: string;
  signature: string;
}

const bytesToHex = (bytes: Uint8Array) => Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");

const encodeBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
};

export async function solveAltcha (challenge: AltchaChallenge) {
  try {
    const { algorithm, challenge: target, maxnumber, salt } = challenge;
    for (let number = 0; number <= maxnumber; number++) {
      const hashBuffer = await crypto.subtle.digest(algorithm, new TextEncoder().encode(salt + number));
      const hash = bytesToHex(new Uint8Array(hashBuffer));

      if (hash === target) {
        const solution = {
          algorithm,
          challenge: target,
          number,
          salt,
          signature: challenge.signature
        };
        const base64Solution = encodeBase64(JSON.stringify(solution));
        return base64Solution;
      }
    }
    return;
  }
  catch {
    return;
  }
}
