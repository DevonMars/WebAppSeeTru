import { Injectable } from '@angular/core';
import { md, pki, util, asn1 } from 'node-forge';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  private _public_key;
  private _private_key;
  private _certificate;

  constructor() { }

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
    const certPem = pki.certificateToPem(this._certificate);
    return certPem;
  }

  set certificate(value) {
    this._certificate = pki.certificateFromPem(value);
  }

}
