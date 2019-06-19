import { Injectable } from '@angular/core';
import { md, pki, util } from 'node-forge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  private _public_key;
  // private _public_key_key;
  // private _public_key_iv;
  private _private_key;
  // private _private_key_key;
  // private _private_key_iv;
  private _certificate;
  // private _certificate_key;
  // private _certificate_iv;
  private _client_private_key;
  private _client_public_key;

  constructor() { }

  generateKey(): Observable<any> {
    const keyPair = new Observable(observer => {
      observer.next(pki.rsa.generateKeyPair({bits: 2048}));
    });
    return keyPair;
  }

  signMessage(msg) {
    const messageDigest = md.sha256.create();
    messageDigest.update(msg);
    const signature = this.private_key.sign(messageDigest);
    const signatureHex = util.bytesToHex(signature);
    return signatureHex;
  }

  verifyMessages(messages) {
    for (let i = 0; i < messages.length; i++) {
      const crt = messages[i].cert;
      const circleCrtPem = pki.certificateFromPem(crt);
      let pub_key: any; // Typecast to any for verify
      pub_key = circleCrtPem.publicKey;
      const messageDigest = md.sha256.create();
      let msg = messages[i].message;
      // if (msg === 'testa') {
      //   msg = 'noby boy';
      // }
      messageDigest.update(msg);
      const signatureHex = messages[i].signatureHex;
      const signatureBytes = util.hexToBytes(signatureHex);
      const verified = pub_key.verify(messageDigest.digest().bytes(), signatureBytes);
      console.log({
        message: msg,
        verified: verified
      });
    }
  }

  // decryptCredential(cred) {
  //   const keyHex = cred.substring(0, 32);
  //   const ivHex = cred.substring(32, 64);
  //   const encHex = cred.substring(64, cred.length);

  //   const keyBytes = util.hexToBytes(keyHex);
  //   const ivBytes = util.hexToBytes(ivHex);
  //   const encBytes = util.hexToBytes(encHex);

  //   const decipher = cipher.createDecipher('AES-CBC', keyBytes);
  //   decipher.start({ iv: ivBytes });
  //   decipher.update(util.createBuffer(encBytes));
  //   console.log(decipher.finish());
  //   const deciphered = decipher.output;
  //   return deciphered;
  // }

  decryptPrivateKey(privateKey) {
    const e = privateKey.e;
    const eRsa = privateKey.eRsa;
    const decryptPassphrase = this.client_private_key.decrypt(e);
    const decryptRsaPrivateKey = pki.decryptRsaPrivateKey(eRsa, decryptPassphrase);
    this.private_key = pki.privateKeyToPem(decryptRsaPrivateKey);
    return decryptRsaPrivateKey;
  }

  get public_key() {
    return this._public_key;
  }

  set public_key(value) {
    this._public_key = pki.publicKeyFromPem(value);
  }

  get private_key() {
    return this._private_key;
  }

  set private_key(value) {
    this._private_key = pki.privateKeyFromPem(value);
  }

  get certificate() {
    const certificate_pem = pki.certificateToPem(this._certificate);
    return certificate_pem;
  }

  set certificate(value) {
    this._certificate = pki.certificateFromPem(value);
  }

  get client_public_key() {
    const client_public_key_pem = pki.publicKeyToPem(this._client_public_key);
    return client_public_key_pem;
  }

  set client_public_key(value) {
    this._client_public_key = value;
  }

  get client_private_key() {
    return this._client_private_key;
  }

  set client_private_key(value) {
    this._client_private_key = value;
  }

}
