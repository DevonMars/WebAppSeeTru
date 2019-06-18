import { Injectable } from '@angular/core';
import { md, pki, util, asn1, cipher } from 'node-forge';
import { AuthService } from '../auth/auth.service';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  private _public_key;
  private _public_key_key;
  private _public_key_iv;
  private _private_key;
  private _private_key_key;
  private _private_key_iv;
  private _certificate;
  private _certificate_key;
  private _certificate_iv;
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
    // console.log({
    //   message: msg,
    //   hash: messageDigest.digest().toHex()
    // });
    const signature = this.private_key.sign(messageDigest);
    const sigHexed = util.bytesToHex(signature);
    const encodeSig = asn1.derToOid(signature);
    const decodeSig = asn1.oidToDer(encodeSig);
    console.log({
      encode: encodeSig,
      decode: decodeSig,
      sig: signature,
      sigHex: sigHexed,
    });
    return { signature, messageDigest, msg, encodeSig, sigHexed };
  }

  decryptCredential(cred) {
    const keyHex = cred.substring(0, 32);
    const ivHex = cred.substring(32, 64);
    const encHex = cred.substring(64, cred.length);

    const keyBytes = util.hexToBytes(keyHex);
    const ivBytes = util.hexToBytes(ivHex);
    const encBytes = util.hexToBytes(encHex);

    const decipher = cipher.createDecipher('AES-CBC', keyBytes);
    decipher.start({ iv: ivBytes });
    decipher.update(util.createBuffer(encBytes));
    console.log(decipher.finish());
    const deciphered = decipher.output;
    return deciphered;
  }

  verifySignature(obj) {
    const verified = this._certificate.publicKey.verify(obj.messageDigest.digest().bytes(), obj.signature);
    // console.log({
    //   sig: obj.signature,
    //   msghash: obj.messageDigest.digest().toHex(),
    //   msg: obj.msg,
    //   verified: verified,
    //   pub: this.public_key,
    //   certPub: this.certificate.publicKey
    // });
    // console.log({
    //   verified: verified
    // });
    return verified;
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
    return this._certificate;
  }

  set certificate(value) {
    this._certificate = pki.certificateFromPem(value);
  }

  get client_public_key() {
    return this._client_public_key;
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
