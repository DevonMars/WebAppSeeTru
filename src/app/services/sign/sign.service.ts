import { Injectable } from '@angular/core';
import { md, pki, util, asn1 } from 'node-forge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  private _publicKey;
  private _privateKey;
  private secret = 'seeChange';

  constructor() { }

  get publicKey() {
    return this._publicKey;
  }

  get privateKey() {
    return this._privateKey;
  }

  createKeyPair() {
    const keys = pki.rsa.generateKeyPair({ bits: 2048 });
    this._privateKey = keys.privateKey;
    this._publicKey = keys.publicKey;
    console.log({
      priv: this._privateKey,
      pub: this._publicKey
    });
  }

  digestMessage(msg: string) {
    const messageDigest = md.sha256.create();
    messageDigest.update(msg);
    // console.log(messageDigest.digest().toHex());
    return messageDigest.digest().toHex();
  }

  signHash(msg: string) {
    const messageDigest = md.sha256.create();
    messageDigest.update(msg, 'utf8');
    const signature = this.privateKey.sign(messageDigest);
    var hex = util.bytesToHex(signature);
    console.log(hex);
    return signature;
  }

}
