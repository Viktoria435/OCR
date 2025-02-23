export const base64ToBytes = (base64String: string): Uint8Array => {
   const binaryString = atob(base64String);
   const bytes = new Uint8Array(binaryString.length);

   for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
   }

   return bytes;
};
