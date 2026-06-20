(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var Sr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _=function(n,e){if(!n)throw At(e)},At=function(n){return new Error("Firebase Database ("+Ho.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Dc=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},bs={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),i.push(t[d],t[u],t[h],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(jo(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Dc(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new Mc;const h=r<<2|a>>4;if(i.push(h),c!==64){const p=a<<4&240|c>>2;if(i.push(p),u!==64){const g=c<<6&192|u;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Mc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Go=function(n){const e=jo(n);return bs.encodeByteArray(e,!0)},xn=function(n){return Go(n).replace(/\./g,"")},Dn=function(n){try{return bs.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lc(n){return qo(void 0,n)}function qo(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!$c(t)||(n[t]=qo(n[t],e[t]));return n}function $c(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc=()=>Fc().__FIREBASE_DEFAULTS__,Vc=()=>{if(typeof process>"u"||typeof Sr>"u")return;const n=Sr.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Bc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Dn(n[1]);return e&&JSON.parse(e)},Is=()=>{try{return Uc()||Vc()||Bc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},zo=n=>{var e,t;return(t=(e=Is())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Wc=n=>{const e=zo(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Ko=()=>{var n;return(n=Is())===null||n===void 0?void 0:n.config},Yo=n=>{var e;return(e=Is())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[xn(JSON.stringify(t)),xn(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ws(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Z())}function jc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gc(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Qo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function qc(){const n=Z();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function zc(){return Ho.NODE_ADMIN===!0}function Kc(){try{return typeof indexedDB=="object"}catch{return!1}}function Yc(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc="FirebaseError";class Ke extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Qc,Object.setPrototypeOf(this,Ke.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,dn.prototype.create)}}class dn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Jc(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ke(s,a,i)}}function Jc(n,e){return n.replace(Xc,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Xc=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(n){return JSON.parse(n)}function U(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Qt(Dn(r[0])||""),t=Qt(Dn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Zc=function(n){const e=Jo(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},eu=function(n){const e=Jo(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function tt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Qi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Mn(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ln(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(kr(r)&&kr(o)){if(!Ln(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function kr(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function nu(n,e){const t=new iu(n,e);return t.subscribe.bind(t)}class iu{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");su(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Oi),s.error===void 0&&(s.error=Oi),s.complete===void 0&&(s.complete=Oi);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function su(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Oi(){}function ci(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,_(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ui=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(n){return n&&n._delegate?n._delegate:n}class nt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Rt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(lu(e))try{this.getOrInitializeService({instanceIdentifier:Qe})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Qe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Qe){return this.instances.has(e)}getOptions(e=Qe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:au(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Qe){return this.component?this.component.multipleInstances?e:Qe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function au(n){return n===Qe?void 0:n}function lu(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ou(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(S||(S={}));const uu={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},du=S.INFO,hu={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},fu=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=hu[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Es{constructor(e){this.name=e,this._logLevel=du,this._logHandler=fu,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?uu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}const pu=(n,e)=>e.some(t=>n instanceof t);let Ar,Rr;function _u(){return Ar||(Ar=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function mu(){return Rr||(Rr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Xo=new WeakMap,Ji=new WeakMap,Zo=new WeakMap,xi=new WeakMap,Ts=new WeakMap;function gu(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t($e(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Xo.set(t,n)}).catch(()=>{}),Ts.set(e,n),e}function vu(n){if(Ji.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ji.set(n,e)}let Xi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ji.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Zo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return $e(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function yu(n){Xi=n(Xi)}function bu(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Di(this),e,...t);return Zo.set(i,e.sort?e.sort():[e]),$e(i)}:mu().includes(n)?function(...e){return n.apply(Di(this),e),$e(Xo.get(this))}:function(...e){return $e(n.apply(Di(this),e))}}function Iu(n){return typeof n=="function"?bu(n):(n instanceof IDBTransaction&&vu(n),pu(n,_u())?new Proxy(n,Xi):n)}function $e(n){if(n instanceof IDBRequest)return gu(n);if(xi.has(n))return xi.get(n);const e=Iu(n);return e!==n&&(xi.set(n,e),Ts.set(e,n)),e}const Di=n=>Ts.get(n);function wu(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=$e(o);return i&&o.addEventListener("upgradeneeded",l=>{i($e(o.result),l.oldVersion,l.newVersion,$e(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Eu=["get","getKey","getAll","getAllKeys","count"],Tu=["put","add","delete","clear"],Mi=new Map;function Nr(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Mi.get(e))return Mi.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Tu.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Eu.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Mi.set(e,r),r}yu(n=>({...n,get:(e,t,i)=>Nr(e,t)||n.get(e,t,i),has:(e,t)=>!!Nr(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Su(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Su(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zi="@firebase/app",Pr="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce=new Es("@firebase/app"),ku="@firebase/app-compat",Au="@firebase/analytics-compat",Ru="@firebase/analytics",Nu="@firebase/app-check-compat",Pu="@firebase/app-check",Ou="@firebase/auth",xu="@firebase/auth-compat",Du="@firebase/database",Mu="@firebase/data-connect",Lu="@firebase/database-compat",$u="@firebase/functions",Fu="@firebase/functions-compat",Uu="@firebase/installations",Vu="@firebase/installations-compat",Bu="@firebase/messaging",Wu="@firebase/messaging-compat",Hu="@firebase/performance",ju="@firebase/performance-compat",Gu="@firebase/remote-config",qu="@firebase/remote-config-compat",zu="@firebase/storage",Ku="@firebase/storage-compat",Yu="@firebase/firestore",Qu="@firebase/vertexai-preview",Ju="@firebase/firestore-compat",Xu="firebase",Zu="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es="[DEFAULT]",ed={[Zi]:"fire-core",[ku]:"fire-core-compat",[Ru]:"fire-analytics",[Au]:"fire-analytics-compat",[Pu]:"fire-app-check",[Nu]:"fire-app-check-compat",[Ou]:"fire-auth",[xu]:"fire-auth-compat",[Du]:"fire-rtdb",[Mu]:"fire-data-connect",[Lu]:"fire-rtdb-compat",[$u]:"fire-fn",[Fu]:"fire-fn-compat",[Uu]:"fire-iid",[Vu]:"fire-iid-compat",[Bu]:"fire-fcm",[Wu]:"fire-fcm-compat",[Hu]:"fire-perf",[ju]:"fire-perf-compat",[Gu]:"fire-rc",[qu]:"fire-rc-compat",[zu]:"fire-gcs",[Ku]:"fire-gcs-compat",[Yu]:"fire-fst",[Ju]:"fire-fst-compat",[Qu]:"fire-vertex","fire-js":"fire-js",[Xu]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=new Map,td=new Map,ts=new Map;function Or(n,e){try{n.container.addComponent(e)}catch(t){Ce.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function bt(n){const e=n.name;if(ts.has(e))return Ce.debug(`There were multiple attempts to register component ${e}.`),!1;ts.set(e,n);for(const t of $n.values())Or(t,n);for(const t of td.values())Or(t,n);return!0}function Cs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Me(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Fe=new dn("app","Firebase",nd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Fe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt=Zu;function ea(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:es,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Fe.create("bad-app-name",{appName:String(s)});if(t||(t=Ko()),!t)throw Fe.create("no-options");const r=$n.get(s);if(r){if(Ln(t,r.options)&&Ln(i,r.config))return r;throw Fe.create("duplicate-app",{appName:s})}const o=new cu(s);for(const l of ts.values())o.addComponent(l);const a=new id(t,i,o);return $n.set(s,a),a}function ta(n=es){const e=$n.get(n);if(!e&&n===es&&Ko())return ea();if(!e)throw Fe.create("no-app",{appName:n});return e}function Ue(n,e,t){var i;let s=(i=ed[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ce.warn(a.join(" "));return}bt(new nt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd="firebase-heartbeat-database",rd=1,Jt="firebase-heartbeat-store";let Li=null;function na(){return Li||(Li=wu(sd,rd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Jt)}catch(t){console.warn(t)}}}}).catch(n=>{throw Fe.create("idb-open",{originalErrorMessage:n.message})})),Li}async function od(n){try{const t=(await na()).transaction(Jt),i=await t.objectStore(Jt).get(ia(n));return await t.done,i}catch(e){if(e instanceof Ke)Ce.warn(e.message);else{const t=Fe.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ce.warn(t.message)}}}async function xr(n,e){try{const i=(await na()).transaction(Jt,"readwrite");await i.objectStore(Jt).put(e,ia(n)),await i.done}catch(t){if(t instanceof Ke)Ce.warn(t.message);else{const i=Fe.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ce.warn(i.message)}}}function ia(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad=1024,ld=30*24*60*60*1e3;class cd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new dd(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Dr();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=ld}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Ce.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Dr(),{heartbeatsToSend:i,unsentEntries:s}=ud(this._heartbeatsCache.heartbeats),r=xn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Ce.warn(t),""}}}function Dr(){return new Date().toISOString().substring(0,10)}function ud(n,e=ad){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Mr(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Mr(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class dd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Kc()?Yc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await od(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return xr(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return xr(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Mr(n){return xn(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(n){bt(new nt("platform-logger",e=>new Cu(e),"PRIVATE")),bt(new nt("heartbeat",e=>new cd(e),"PRIVATE")),Ue(Zi,Pr,n),Ue(Zi,Pr,"esm2017"),Ue("fire-js","")}hd("");var fd="firebase",pd="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ue(fd,pd,"app");function Ss(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function sa(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const _d=sa,ra=new dn("auth","Firebase",sa());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn=new Es("@firebase/auth");function md(n,...e){Fn.logLevel<=S.WARN&&Fn.warn(`Auth (${Pt}): ${n}`,...e)}function An(n,...e){Fn.logLevel<=S.ERROR&&Fn.error(`Auth (${Pt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(n,...e){throw ks(n,...e)}function _e(n,...e){return ks(n,...e)}function oa(n,e,t){const i=Object.assign(Object.assign({},_d()),{[e]:t});return new dn("auth","Firebase",i).create(e,{appName:n.name})}function et(n){return oa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ks(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return ra.create(n,...e)}function y(n,e,...t){if(!n)throw ks(e,...t)}function be(n){const e="INTERNAL ASSERTION FAILED: "+n;throw An(e),new Error(e)}function ke(n,e){n||be(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function gd(){return Lr()==="http:"||Lr()==="https:"}function Lr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(gd()||Gc()||"connection"in navigator)?navigator.onLine:!0}function yd(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,t){this.shortDelay=e,this.longDelay=t,ke(t>e,"Short delay should be less than long delay!"),this.isMobile=ws()||Qo()}get(){return vd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(n,e){ke(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;be("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;be("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;be("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id=new hn(3e4,6e4);function Rs(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ot(n,e,t,i,s={}){return la(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Nt(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},r);return jc()||(c.referrerPolicy="no-referrer"),aa.fetch()(ca(n,n.config.apiHost,t,a),c)})}async function la(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},bd),e);try{const s=new Ed(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Tn(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Tn(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Tn(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Tn(n,"user-disabled",o);const d=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw oa(n,d,c);Se(n,d)}}catch(s){if(s instanceof Ke)throw s;Se(n,"network-request-failed",{message:String(s)})}}async function wd(n,e,t,i,s={}){const r=await Ot(n,e,t,i,s);return"mfaPendingCredential"in r&&Se(n,"multi-factor-auth-required",{_serverResponse:r}),r}function ca(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?As(n.config,s):`${n.config.apiScheme}://${s}`}class Ed{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(_e(this.auth,"network-request-failed")),Id.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Tn(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=_e(n,e,i);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Td(n,e){return Ot(n,"POST","/v1/accounts:delete",e)}async function ua(n,e){return Ot(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Cd(n,e=!1){const t=Q(n),i=await t.getIdToken(e),s=Ns(i);y(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:jt($i(s.auth_time)),issuedAtTime:jt($i(s.iat)),expirationTime:jt($i(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function $i(n){return Number(n)*1e3}function Ns(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return An("JWT malformed, contained fewer than 3 sections"),null;try{const s=Dn(t);return s?JSON.parse(s):(An("Failed to decode base64 JWT payload"),null)}catch(s){return An("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function $r(n){const e=Ns(n);return y(e,"internal-error"),y(typeof e.exp<"u","internal-error"),y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xt(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Ke&&Sd(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Sd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=jt(this.lastLoginAt),this.creationTime=jt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Un(n){var e;const t=n.auth,i=await n.getIdToken(),s=await Xt(n,ua(t,{idToken:i}));y(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?da(r.providerUserInfo):[],a=Rd(n.providerData,o),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new is(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,u)}async function Ad(n){const e=Q(n);await Un(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Rd(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function da(n){return n.map(e=>{var{providerId:t}=e,i=Ss(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nd(n,e){const t=await la(n,{},async()=>{const i=Nt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=ca(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",aa.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Pd(n,e){return Ot(n,"POST","/v2/accounts:revokeToken",Rs(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){y(e.idToken,"internal-error"),y(typeof e.idToken<"u","internal-error"),y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):$r(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){y(e.length!==0,"internal-error");const t=$r(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Nd(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new _t;return i&&(y(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(y(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(y(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _t,this.toJSON())}_performRefresh(){return be("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(n,e){y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ie{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=Ss(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new kd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new is(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Xt(this,this.stsTokenManager.getToken(this.auth,e));return y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Cd(this,e)}reload(){return Ad(this)}_assign(e){this!==e&&(y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ie(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Un(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Me(this.auth.app))return Promise.reject(et(this.auth));const e=await this.getIdToken();return await Xt(this,Td(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,a,l,c,d;const u=(i=t.displayName)!==null&&i!==void 0?i:void 0,h=(s=t.email)!==null&&s!==void 0?s:void 0,p=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,g=(o=t.photoURL)!==null&&o!==void 0?o:void 0,E=(a=t.tenantId)!==null&&a!==void 0?a:void 0,A=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,ce=(c=t.createdAt)!==null&&c!==void 0?c:void 0,ve=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:ye,emailVerified:B,isAnonymous:pe,providerData:Ni,stsTokenManager:Cr}=t;y(ye&&Cr,e,"internal-error");const Oc=_t.fromJSON(this.name,Cr);y(typeof ye=="string",e,"internal-error"),Re(u,e.name),Re(h,e.name),y(typeof B=="boolean",e,"internal-error"),y(typeof pe=="boolean",e,"internal-error"),Re(p,e.name),Re(g,e.name),Re(E,e.name),Re(A,e.name),Re(ce,e.name),Re(ve,e.name);const Pi=new Ie({uid:ye,auth:e,email:h,emailVerified:B,displayName:u,isAnonymous:pe,photoURL:g,phoneNumber:p,tenantId:E,stsTokenManager:Oc,createdAt:ce,lastLoginAt:ve});return Ni&&Array.isArray(Ni)&&(Pi.providerData=Ni.map(xc=>Object.assign({},xc))),A&&(Pi._redirectEventId=A),Pi}static async _fromIdTokenResponse(e,t,i=!1){const s=new _t;s.updateFromServerResponse(t);const r=new Ie({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Un(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];y(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?da(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new _t;a.updateFromIdToken(i);const l=new Ie({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new is(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr=new Map;function we(n){ke(n instanceof Function,"Expected a class definition");let e=Fr.get(n);return e?(ke(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Fr.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ha.type="NONE";const Ur=ha;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(n,e,t){return`firebase:${n}:${e}:${t}`}class mt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Rn(this.userKey,s.apiKey,r),this.fullPersistenceKey=Rn("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ie._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new mt(we(Ur),e,i);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||we(Ur);const o=Rn(i,e.config.apiKey,e.name);let a=null;for(const c of t)try{const d=await c._get(o);if(d){const u=Ie._fromJSON(e,d);c!==r&&(a=u),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new mt(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new mt(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ma(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(fa(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(va(e))return"Blackberry";if(ya(e))return"Webos";if(pa(e))return"Safari";if((e.includes("chrome/")||_a(e))&&!e.includes("edge/"))return"Chrome";if(ga(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function fa(n=Z()){return/firefox\//i.test(n)}function pa(n=Z()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function _a(n=Z()){return/crios\//i.test(n)}function ma(n=Z()){return/iemobile/i.test(n)}function ga(n=Z()){return/android/i.test(n)}function va(n=Z()){return/blackberry/i.test(n)}function ya(n=Z()){return/webos/i.test(n)}function Ps(n=Z()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Od(n=Z()){var e;return Ps(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function xd(){return qc()&&document.documentMode===10}function ba(n=Z()){return Ps(n)||ga(n)||ya(n)||va(n)||/windows phone/i.test(n)||ma(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(n,e=[]){let t;switch(n){case"Browser":t=Vr(Z());break;case"Worker":t=`${Vr(Z())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Pt}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Md(n,e={}){return Ot(n,"GET","/v2/passwordPolicy",Rs(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld=6;class $d{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Ld,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Br(this),this.idTokenSubscription=new Br(this),this.beforeStateQueue=new Dd(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ra,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=we(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await mt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ua(this,{idToken:e}),i=await Ie._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Me(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Un(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=yd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Me(this.app))return Promise.reject(et(this));const t=e?Q(e):null;return t&&y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Me(this.app)?Promise.reject(et(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Me(this.app)?Promise.reject(et(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(we(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Md(this),t=new $d(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new dn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Pd(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&we(e)||this._popupRedirectResolver;y(t,this,"argument-error"),this.redirectPersistenceManager=await mt.create(this,[we(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(y(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ia(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&md(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Os(n){return Q(n)}class Br{constructor(e){this.auth=e,this.observer=null,this.addObserver=nu(t=>this.observer=t)}get next(){return y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ud(n){xs=n}function Vd(n){return xs.loadJS(n)}function Bd(){return xs.gapiScript}function Wd(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(n,e){const t=Cs(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Ln(r,e??{}))return s;Se(s,"already-initialized")}return t.initialize({options:e})}function jd(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(we);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Gd(n,e,t){const i=Os(n);y(i._canInitEmulator,i,"emulator-config-failed"),y(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=wa(e),{host:o,port:a}=qd(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),zd()}function wa(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function qd(n){const e=wa(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Wr(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Wr(o)}}}function Wr(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function zd(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return be("not implemented")}_getIdTokenResponse(e){return be("not implemented")}_linkToIdToken(e,t){return be("not implemented")}_getReauthenticationResolver(e){return be("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gt(n,e){return wd(n,"POST","/v1/accounts:signInWithIdp",Rs(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd="http://localhost";class it extends Ea{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new it(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Se("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=Ss(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new it(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return gt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,gt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,gt(e,t)}buildRequest(){const e={requestUri:Kd,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Nt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn extends Ta{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe extends fn{constructor(){super("facebook.com")}static credential(e){return it._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pe.credentialFromTaggedObject(e)}static credentialFromError(e){return Pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pe.credential(e.oauthAccessToken)}catch{return null}}}Pe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Pe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe extends fn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return it._fromParams({providerId:Oe.PROVIDER_ID,signInMethod:Oe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Oe.credentialFromTaggedObject(e)}static credentialFromError(e){return Oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Oe.credential(t,i)}catch{return null}}}Oe.GOOGLE_SIGN_IN_METHOD="google.com";Oe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe extends fn{constructor(){super("github.com")}static credential(e){return it._fromParams({providerId:xe.PROVIDER_ID,signInMethod:xe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xe.credentialFromTaggedObject(e)}static credentialFromError(e){return xe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return xe.credential(e.oauthAccessToken)}catch{return null}}}xe.GITHUB_SIGN_IN_METHOD="github.com";xe.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De extends fn{constructor(){super("twitter.com")}static credential(e,t){return it._fromParams({providerId:De.PROVIDER_ID,signInMethod:De.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return De.credentialFromTaggedObject(e)}static credentialFromError(e){return De.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return De.credential(t,i)}catch{return null}}}De.TWITTER_SIGN_IN_METHOD="twitter.com";De.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Ie._fromIdTokenResponse(e,i,s),o=Hr(i);return new It({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Hr(i);return new It({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Hr(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn extends Ke{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Vn.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Vn(e,t,i,s)}}function Ca(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Vn._fromErrorAndOperation(n,r,e,i):r})}async function Yd(n,e,t=!1){const i=await Xt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return It._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qd(n,e,t=!1){const{auth:i}=n;if(Me(i.app))return Promise.reject(et(i));const s="reauthenticate";try{const r=await Xt(n,Ca(i,s,e,n),t);y(r.idToken,i,"internal-error");const o=Ns(r.idToken);y(o,i,"internal-error");const{sub:a}=o;return y(n.uid===a,i,"user-mismatch"),It._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Se(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jd(n,e,t=!1){if(Me(n.app))return Promise.reject(et(n));const i="signIn",s=await Ca(n,i,e),r=await It._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function Xd(n,e,t,i){return Q(n).onIdTokenChanged(e,t,i)}function Zd(n,e,t){return Q(n).beforeAuthStateChanged(e,t)}function eh(n,e,t,i){return Q(n).onAuthStateChanged(e,t,i)}const Bn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Bn,"1"),this.storage.removeItem(Bn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th=1e3,nh=10;class ka extends Sa{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ba(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);xd()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,nh):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},th)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ka.type="LOCAL";const ih=ka;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa extends Sa{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Aa.type="SESSION";const Ra=Aa;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new di(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await sh(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}di.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=Ds("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(u){const h=u;if(h.data.eventId===c)switch(h.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(d),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(){return window}function oh(n){me().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Na(){return typeof me().WorkerGlobalScope<"u"&&typeof me().importScripts=="function"}async function ah(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function lh(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function ch(){return Na()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa="firebaseLocalStorageDb",uh=1,Wn="firebaseLocalStorage",Oa="fbase_key";class pn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function hi(n,e){return n.transaction([Wn],e?"readwrite":"readonly").objectStore(Wn)}function dh(){const n=indexedDB.deleteDatabase(Pa);return new pn(n).toPromise()}function ss(){const n=indexedDB.open(Pa,uh);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Wn,{keyPath:Oa})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Wn)?e(i):(i.close(),await dh(),e(await ss()))})})}async function jr(n,e,t){const i=hi(n,!0).put({[Oa]:e,value:t});return new pn(i).toPromise()}async function hh(n,e){const t=hi(n,!1).get(e),i=await new pn(t).toPromise();return i===void 0?null:i.value}function Gr(n,e){const t=hi(n,!0).delete(e);return new pn(t).toPromise()}const fh=800,ph=3;class xa{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ss(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>ph)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Na()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=di._getInstance(ch()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ah(),!this.activeServiceWorker)return;this.sender=new rh(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||lh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ss();return await jr(e,Bn,"1"),await Gr(e,Bn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>jr(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>hh(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Gr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=hi(s,!1).getAll();return new pn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),fh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}xa.type="LOCAL";const _h=xa;new hn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mh(n,e){return e?we(e):(y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms extends Ea{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return gt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return gt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return gt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function gh(n){return Jd(n.auth,new Ms(n),n.bypassAuthState)}function vh(n){const{auth:e,user:t}=n;return y(t,e,"internal-error"),Qd(t,new Ms(n),n.bypassAuthState)}async function yh(n){const{auth:e,user:t}=n;return y(t,e,"internal-error"),Yd(t,new Ms(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return gh;case"linkViaPopup":case"linkViaRedirect":return yh;case"reauthViaPopup":case"reauthViaRedirect":return vh;default:Se(this.auth,"internal-error")}}resolve(e){ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bh=new hn(2e3,1e4);class ft extends Da{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,ft.currentPopupAction&&ft.currentPopupAction.cancel(),ft.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return y(e,this.auth,"internal-error"),e}async onExecution(){ke(this.filter.length===1,"Popup operations only handle one event");const e=Ds();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(_e(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_e(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ft.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_e(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,bh.get())};e()}}ft.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih="pendingRedirect",Nn=new Map;class wh extends Da{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Nn.get(this.auth._key());if(!e){try{const i=await Eh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Nn.set(this.auth._key(),e)}return this.bypassAuthState||Nn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Eh(n,e){const t=Sh(e),i=Ch(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function Th(n,e){Nn.set(n._key(),e)}function Ch(n){return we(n._redirectPersistence)}function Sh(n){return Rn(Ih,n.config.apiKey,n.name)}async function kh(n,e,t=!1){if(Me(n.app))return Promise.reject(et(n));const i=Os(n),s=mh(i,e),o=await new wh(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah=10*60*1e3;class Rh{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Nh(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Ma(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(_e(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ah&&this.cachedEventUids.clear(),this.cachedEventUids.has(qr(e))}saveEventToCache(e){this.cachedEventUids.add(qr(e)),this.lastProcessedEventTime=Date.now()}}function qr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ma({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Nh(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ma(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ph(n,e={}){return Ot(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xh=/^https?/;async function Dh(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Ph(n);for(const t of e)try{if(Mh(t))return}catch{}Se(n,"unauthorized-domain")}function Mh(n){const e=ns(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!xh.test(t))return!1;if(Oh.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh=new hn(3e4,6e4);function zr(){const n=me().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function $h(n){return new Promise((e,t)=>{var i,s,r;function o(){zr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{zr(),t(_e(n,"network-request-failed"))},timeout:Lh.get()})}if(!((s=(i=me().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=me().gapi)===null||r===void 0)&&r.load)o();else{const a=Wd("iframefcb");return me()[a]=()=>{gapi.load?o():t(_e(n,"network-request-failed"))},Vd(`${Bd()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw Pn=null,e})}let Pn=null;function Fh(n){return Pn=Pn||$h(n),Pn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh=new hn(5e3,15e3),Vh="__/auth/iframe",Bh="emulator/auth/iframe",Wh={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Hh=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jh(n){const e=n.config;y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?As(e,Bh):`https://${n.config.authDomain}/${Vh}`,i={apiKey:e.apiKey,appName:n.name,v:Pt},s=Hh.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Nt(i).slice(1)}`}async function Gh(n){const e=await Fh(n),t=me().gapi;return y(t,n,"internal-error"),e.open({where:document.body,url:jh(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Wh,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=_e(n,"network-request-failed"),a=me().setTimeout(()=>{r(o)},Uh.get());function l(){me().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},zh=500,Kh=600,Yh="_blank",Qh="http://localhost";class Kr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Jh(n,e,t,i=zh,s=Kh){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},qh),{width:i.toString(),height:s.toString(),top:r,left:o}),c=Z().toLowerCase();t&&(a=_a(c)?Yh:t),fa(c)&&(e=e||Qh,l.scrollbars="yes");const d=Object.entries(l).reduce((h,[p,g])=>`${h}${p}=${g},`,"");if(Od(c)&&a!=="_self")return Xh(e||"",a),new Kr(null);const u=window.open(e||"",a,d);y(u,n,"popup-blocked");try{u.focus()}catch{}return new Kr(u)}function Xh(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh="__/auth/handler",ef="emulator/auth/handler",tf=encodeURIComponent("fac");async function Yr(n,e,t,i,s,r){y(n.config.authDomain,n,"auth-domain-config-required"),y(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Pt,eventId:s};if(e instanceof Ta){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Qi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries({}))o[d]=u}if(e instanceof fn){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await n._getAppCheckToken(),c=l?`#${tf}=${encodeURIComponent(l)}`:"";return`${nf(n)}?${Nt(a).slice(1)}${c}`}function nf({config:n}){return n.emulator?As(n,ef):`https://${n.authDomain}/${Zh}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fi="webStorageSupport";class sf{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ra,this._completeRedirectFn=kh,this._overrideRedirectResult=Th}async _openPopup(e,t,i,s){var r;ke((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Yr(e,t,i,ns(),s);return Jh(e,o,Ds())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Yr(e,t,i,ns(),s);return oh(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(ke(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Gh(e),i=new Rh(e);return t.register("authEvent",s=>(y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Fi,{type:Fi},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Fi];o!==void 0&&t(!!o),Se(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Dh(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ba()||pa()||Ps()}}const rf=sf;var Qr="@firebase/auth",Jr="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function lf(n){bt(new nt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;y(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ia(n)},c=new Fd(i,s,r,l);return jd(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),bt(new nt("auth-internal",e=>{const t=Os(e.getProvider("auth").getImmediate());return(i=>new of(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ue(Qr,Jr,af(n)),Ue(Qr,Jr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cf=5*60,uf=Yo("authIdTokenMaxAge")||cf;let Xr=null;const df=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>uf)return;const s=t==null?void 0:t.token;Xr!==s&&(Xr=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function hf(n=ta()){const e=Cs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Hd(n,{popupRedirectResolver:rf,persistence:[_h,ih,Ra]}),i=Yo("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=df(r.toString());Zd(t,o,()=>o(t.currentUser)),Xd(t,a=>o(a))}}const s=zo("auth");return s&&Gd(t,`http://${s}`),t}function ff(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Ud({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=_e("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",ff().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});lf("Browser");var Zr={};const eo="@firebase/database",to="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let La="";function pf(n){La=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),U(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Qt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return fe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new _f(e)}}catch{}return new mf},Ze=$a("localStorage"),gf=$a("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt=new Es("@firebase/database"),Fa=function(){let n=1;return function(){return n++}}(),Ua=function(n){const e=ru(n),t=new tu;t.update(e);const i=t.digest();return bs.encodeByteArray(i)},_n=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=_n.apply(null,i):typeof i=="object"?e+=U(i):e+=i,e+=" "}return e};let Gt=null,no=!0;const vf=function(n,e){_(!0,"Can't turn on custom loggers persistently."),vt.logLevel=S.VERBOSE,Gt=vt.log.bind(vt)},G=function(...n){if(no===!0&&(no=!1,Gt===null&&gf.get("logging_enabled")===!0&&vf()),Gt){const e=_n.apply(null,n);Gt(e)}},mn=function(n){return function(...e){G(n,...e)}},rs=function(...n){const e="FIREBASE INTERNAL ERROR: "+_n(...n);vt.error(e)},Ae=function(...n){const e=`FIREBASE FATAL ERROR: ${_n(...n)}`;throw vt.error(e),new Error(e)},X=function(...n){const e="FIREBASE WARNING: "+_n(...n);vt.warn(e)},yf=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&X("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ls=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},bf=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},st="[MIN_NAME]",je="[MAX_NAME]",at=function(n,e){if(n===e)return 0;if(n===st||e===je)return-1;if(e===st||n===je)return 1;{const t=io(n),i=io(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},If=function(n,e){return n===e?0:n<e?-1:1},Ft=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+U(e))},$s=function(n){if(typeof n!="object"||n===null)return U(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=U(e[i]),t+=":",t+=$s(n[e[i]]);return t+="}",t},Va=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function z(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Ba=function(n){_(!Ls(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},wf=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Ef=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Tf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Cf=new RegExp("^-?(0*)\\d{1,10}$"),Sf=-2147483648,kf=2147483647,io=function(n){if(Cf.test(n)){const e=Number(n);if(e>=Sf&&e<=kf)return e}return null},xt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw X("Exception was thrown by user callback.",t),e},Math.floor(0))}},Af=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},qt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){X(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(G("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',X(e)}}class On{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}On.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs="5",Wa="v",Ha="s",ja="r",Ga="f",qa=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,za="ls",Ka="p",os="ac",Ya="websocket",Qa="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ze.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ze.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Pf(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Xa(n,e,t){_(typeof e=="string","typeof type must == string"),_(typeof t=="object","typeof params must == object");let i;if(e===Ya)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Qa)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Pf(n)&&(t.ns=n.namespace);const s=[];return z(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(){this.counters_={}}incrementCounter(e,t=1){fe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Lc(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui={},Vi={};function Us(n){const e=n.toString();return Ui[e]||(Ui[e]=new Of),Ui[e]}function xf(n,e){const t=n.toString();return Vi[t]||(Vi[t]=e()),Vi[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&xt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so="start",Mf="close",Lf="pLPCommand",$f="pRTLPCB",Za="id",el="pw",tl="ser",Ff="cb",Uf="seg",Vf="ts",Bf="d",Wf="dframe",nl=1870,il=30,Hf=nl-il,jf=25e3,Gf=3e4;class pt{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=mn(e),this.stats_=Us(t),this.urlFn=l=>(this.appCheckToken&&(l[os]=this.appCheckToken),Xa(t,Qa,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Df(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Gf)),bf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Vs((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===so)this.id=a,this.password=l;else if(o===Mf)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[so]="t",i[tl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Ff]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Wa]=Fs,this.transportSessionId&&(i[Ha]=this.transportSessionId),this.lastSessionId&&(i[za]=this.lastSessionId),this.applicationId&&(i[Ka]=this.applicationId),this.appCheckToken&&(i[os]=this.appCheckToken),typeof location<"u"&&location.hostname&&qa.test(location.hostname)&&(i[ja]=Ga);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){pt.forceAllow_=!0}static forceDisallow(){pt.forceDisallow_=!0}static isAvailable(){return pt.forceAllow_?!0:!pt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!wf()&&!Ef()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=U(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Go(t),s=Va(i,Hf);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Wf]="t",i[Za]=e,i[el]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=U(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Vs{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Fa(),window[Lf+this.uniqueCallbackIdentifier]=e,window[$f+this.uniqueCallbackIdentifier]=t,this.myIFrame=Vs.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){G("frame writing exception"),a.stack&&G(a.stack),G(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||G("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Za]=this.myID,e[el]=this.myPW,e[tl]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+il+i.length<=nl;){const o=this.pendingSegs.shift();i=i+"&"+Uf+s+"="+o.seg+"&"+Vf+s+"="+o.ts+"&"+Bf+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(jf)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{G("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf=16384,zf=45e3;let Hn=null;typeof MozWebSocket<"u"?Hn=MozWebSocket:typeof WebSocket<"u"&&(Hn=WebSocket);class ue{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=mn(this.connId),this.stats_=Us(t),this.connURL=ue.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Wa]=Fs,typeof location<"u"&&location.hostname&&qa.test(location.hostname)&&(o[ja]=Ga),t&&(o[Ha]=t),i&&(o[za]=i),s&&(o[os]=s),r&&(o[Ka]=r),Xa(e,Ya,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ze.set("previous_websocket_failure",!0);try{let i;zc(),this.mySock=new Hn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ue.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Hn!==null&&!ue.forceDisallow_}static previouslyFailed(){return Ze.isInMemoryStorage||Ze.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ze.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Qt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=U(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Va(t,qf);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(zf))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ue.responsesRequiredToBeHealthy=2;ue.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[pt,ue]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=ue&&ue.isAvailable();let i=t&&!ue.previouslyFailed();if(e.webSocketOnly&&(t||X("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ue];else{const s=this.transports_=[];for(const r of Zt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Zt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Zt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf=6e4,Yf=5e3,Qf=10*1024,Jf=100*1024,Bi="t",ro="d",Xf="s",oo="r",Zf="e",ao="o",lo="a",co="n",uo="p",ep="h";class tp{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=mn("c:"+this.id+":"),this.transportManager_=new Zt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=qt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Jf?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Qf?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Bi in e){const t=e[Bi];t===lo?this.upgradeIfSecondaryHealthy_():t===oo?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ao&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Ft("t",e),i=Ft("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:uo,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:lo,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:co,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Ft("t",e),i=Ft("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Ft(Bi,e);if(ro in e){const i=e[ro];if(t===ep){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===co){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Xf?this.onConnectionShutdown_(i):t===oo?this.onReset_(i):t===Zf?rs("Server Error: "+i):t===ao?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):rs("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Fs!==i&&X("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),qt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Kf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):qt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Yf))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:uo,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ze.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){_(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn extends rl{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!ws()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new jn}getInitialEvent(e){return _(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho=32,fo=768;class k{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function C(){return new k("")}function I(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Ge(n){return n.pieces_.length-n.pieceNum_}function N(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new k(n.pieces_,e)}function Bs(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function np(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function en(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function ol(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new k(e,0)}function D(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof k)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new k(t,0)}function T(n){return n.pieceNum_>=n.pieces_.length}function J(n,e){const t=I(n),i=I(e);if(t===null)return e;if(t===i)return J(N(n),N(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function ip(n,e){const t=en(n,0),i=en(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=at(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Ws(n,e){if(Ge(n)!==Ge(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function re(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Ge(n)>Ge(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class sp{constructor(e,t){this.errorPrefix_=t,this.parts_=en(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=ui(this.parts_[i]);al(this)}}function rp(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=ui(e),al(n)}function op(n){const e=n.parts_.pop();n.byteLength_-=ui(e),n.parts_.length>0&&(n.byteLength_-=1)}function al(n){if(n.byteLength_>fo)throw new Error(n.errorPrefix_+"has a key path longer than "+fo+" bytes ("+n.byteLength_+").");if(n.parts_.length>ho)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ho+") or object contains a cycle "+Je(n))}function Je(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs extends rl{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Hs}getInitialEvent(e){return _(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=1e3,ap=60*5*1e3,po=30*1e3,lp=1.3,cp=3e4,up="server_kill",_o=3;class Te extends sl{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Te.nextPersistentConnectionId_++,this.log_=mn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ut,this.maxReconnectDelay_=ap,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Hs.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&jn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(U(r)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new Rt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Te.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&fe(e,"w")){const i=tt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();X(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||eu(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=po)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Zc(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+U(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):rs("Unrecognized action received from server: "+U(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ut,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ut,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>cp&&(this.reconnectDelay_=Ut),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*lp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Te.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){_(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?G("getToken() completed but was canceled"):(G("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new tp(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{X(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(up)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&X(u),l())}}}interrupt(e){G("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){G("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Qi(this.interruptReasons_)&&(this.reconnectDelay_=Ut,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>$s(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new k(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){G("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=_o&&(this.reconnectDelay_=po,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){G("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=_o&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+La.replace(/\./g,"-")]=1,ws()?e["framework.cordova"]=1:Qo()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=jn.getInstance().currentlyOnline();return Qi(this.interruptReasons_)&&e}}Te.nextPersistentConnectionId_=0;Te.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new w(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new w(st,e),s=new w(st,t);return this.compare(i,s)!==0}minPost(){return w.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cn;class ll extends fi{static get __EMPTY_NODE(){return Cn}static set __EMPTY_NODE(e){Cn=e}compare(e,t){return at(e.name,t.name)}isDefinedOn(e){throw At("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return w.MIN}maxPost(){return new w(je,Cn)}makePost(e,t){return _(typeof e=="string","KeyIndex indexValue must always be a string."),new w(e,Cn)}toString(){return".key"}}const Ve=new ll;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class j{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??j.RED,this.left=s??ee.EMPTY_NODE,this.right=r??ee.EMPTY_NODE}copy(e,t,i,s,r){return new j(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ee.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return ee.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,j.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,j.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}j.RED=!0;j.BLACK=!1;class dp{copy(e,t,i,s,r){return this}insert(e,t,i){return new j(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ee{constructor(e,t=ee.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new ee(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,j.BLACK,null,null))}remove(e){return new ee(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,j.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Sn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Sn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Sn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Sn(this.root_,null,this.comparator_,!0,e)}}ee.EMPTY_NODE=new dp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hp(n,e){return at(n.name,e.name)}function js(n,e){return at(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let as;function fp(n){as=n}const cl=function(n){return typeof n=="number"?"number:"+Ba(n):"string:"+n},ul=function(n){if(n.isLeafNode()){const e=n.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&fe(e,".sv"),"Priority must be a string or number.")}else _(n===as||n.isEmpty(),"priority of unexpected type.");_(n===as||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mo;class H{constructor(e,t=H.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ul(this.priorityNode_)}static set __childrenNodeConstructor(e){mo=e}static get __childrenNodeConstructor(){return mo}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new H(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:H.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return T(e)?this:I(e)===".priority"?this.priorityNode_:H.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:H.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=I(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(_(i!==".priority"||Ge(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,H.__childrenNodeConstructor.EMPTY_NODE.updateChild(N(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+cl(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Ba(this.value_):e+=this.value_,this.lazyHash_=Ua(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===H.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof H.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=H.VALUE_TYPE_ORDER.indexOf(t),r=H.VALUE_TYPE_ORDER.indexOf(i);return _(s>=0,"Unknown leaf type: "+t),_(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}H.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dl,hl;function pp(n){dl=n}function _p(n){hl=n}class mp extends fi{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?at(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return w.MIN}maxPost(){return new w(je,new H("[PRIORITY-POST]",hl))}makePost(e,t){const i=dl(e);return new w(t,new H("[PRIORITY-POST]",i))}toString(){return".priority"}}const O=new mp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp=Math.log(2);class vp{constructor(e){const t=r=>parseInt(Math.log(r)/gp,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Gn=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new j(h,u.node,j.BLACK,null,null);{const p=parseInt(d/2,10)+l,g=s(l,p),E=s(p+1,c);return u=n[p],h=t?t(u):u,new j(h,u.node,j.BLACK,g,E)}},r=function(l){let c=null,d=null,u=n.length;const h=function(g,E){const A=u-g,ce=u;u-=g;const ve=s(A+1,ce),ye=n[A],B=t?t(ye):ye;p(new j(B,ye.node,E,null,ve))},p=function(g){c?(c.left=g,c=g):(d=g,c=g)};for(let g=0;g<l.count;++g){const E=l.nextBitIsOne(),A=Math.pow(2,l.count-(g+1));E?h(A,j.BLACK):(h(A,j.BLACK),h(A,j.RED))}return d},o=new vp(n.length),a=r(o);return new ee(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wi;const ht={};class Ee{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return _(ht&&O,"ChildrenNode.ts has not been loaded"),Wi=Wi||new Ee({".priority":ht},{".priority":O}),Wi}get(e){const t=tt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof ee?t:null}hasIndex(e){return fe(this.indexSet_,e.toString())}addIndex(e,t){_(e!==Ve,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(w.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Gn(i,e.getCompare()):a=ht;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const d=Object.assign({},this.indexes_);return d[l]=a,new Ee(d,c)}addToIndexes(e,t){const i=Mn(this.indexes_,(s,r)=>{const o=tt(this.indexSet_,r);if(_(o,"Missing index implementation for "+r),s===ht)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(w.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Gn(a,o.getCompare())}else return ht;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new w(e.name,a))),l.insert(e,e.node)}});return new Ee(i,this.indexSet_)}removeFromIndexes(e,t){const i=Mn(this.indexes_,s=>{if(s===ht)return s;{const r=t.get(e.name);return r?s.remove(new w(e.name,r)):s}});return new Ee(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vt;class v{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&ul(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Vt||(Vt=new v(new ee(js),null,Ee.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Vt}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Vt:t}}getChild(e){const t=I(e);return t===null?this:this.getImmediateChild(t).getChild(N(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(_(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new w(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Vt:this.priorityNode_;return new v(s,o,r)}}updateChild(e,t){const i=I(e);if(i===null)return t;{_(I(e)!==".priority"||Ge(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(N(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(O,(o,a)=>{t[o]=a.val(e),i++,r&&v.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+cl(this.getPriority().val())+":"),this.forEachChild(O,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Ua(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new w(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new w(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new w(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===gn?-1:0}withIndex(e){if(e===Ve||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Ve||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(O),s=t.getIterator(O);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ve?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class yp extends v{constructor(){super(new ee(js),v.EMPTY_NODE,Ee.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const gn=new yp;Object.defineProperties(w,{MIN:{value:new w(st,v.EMPTY_NODE)},MAX:{value:new w(je,gn)}});ll.__EMPTY_NODE=v.EMPTY_NODE;H.__childrenNodeConstructor=v;fp(gn);_p(gn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp=!0;function L(n,e=null){if(n===null)return v.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new H(t,L(e))}if(!(n instanceof Array)&&bp){const t=[];let i=!1;if(z(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=L(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new w(o,l)))}}),t.length===0)return v.EMPTY_NODE;const r=Gn(t,hp,o=>o.name,js);if(i){const o=Gn(t,O.getCompare());return new v(r,L(e),new Ee({".priority":o},{".priority":O}))}else return new v(r,L(e),Ee.Default)}else{let t=v.EMPTY_NODE;return z(n,(i,s)=>{if(fe(n,i)&&i.substring(0,1)!=="."){const r=L(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(L(e))}}pp(L);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl extends fi{constructor(e){super(),this.indexPath_=e,_(!T(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?at(e.name,t.name):r}makePost(e,t){const i=L(e),s=v.EMPTY_NODE.updateChild(this.indexPath_,i);return new w(t,s)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,gn);return new w(je,e)}toString(){return en(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip extends fi{compare(e,t){const i=e.node.compareTo(t.node);return i===0?at(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return w.MIN}maxPost(){return w.MAX}makePost(e,t){const i=L(e);return new w(t,i)}toString(){return".value"}}const pl=new Ip;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _l(n){return{type:"value",snapshotNode:n}}function wt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function tn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function nn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function wp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(tn(t,a)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(wt(t,i)):o.trackChildChange(nn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(O,(s,r)=>{t.hasChild(s)||i.trackChildChange(tn(s,r))}),t.isLeafNode()||t.forEachChild(O,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(nn(s,r,o))}else i.trackChildChange(wt(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e){this.indexedFilter_=new Gs(e.getIndex()),this.index_=e.getIndex(),this.startPost_=sn.getStartPost_(e),this.endPost_=sn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new w(t,i))||(i=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=v.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(v.EMPTY_NODE);const r=this;return t.forEachChild(O,(o,a)=>{r.matches(new w(o,a))||(s=s.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new sn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new w(t,i))||(i=v.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=v.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(v.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,p)=>u(p,h)}else o=this.index_.getCompare();const a=e;_(a.numChildren()===this.limit_,"");const l=new w(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(d&&!i.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(nn(t,i,u)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(tn(t,u));const E=a.updateImmediateChild(t,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(wt(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(tn(c.name,c.node)),r.trackChildChange(wt(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=O}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:st}hasEnd(){return this.endSet_}getIndexEndValue(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:je}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===O}copy(){const e=new qs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Tp(n){return n.loadsAllData()?new Gs(n.getIndex()):n.hasLimit()?new Ep(n):new sn(n)}function Cp(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function Sp(n,e){const t=n.copy();return t.index_=e,t}function go(n){const e={};if(n.isDefault())return e;let t;if(n.index_===O?t="$priority":n.index_===pl?t="$value":n.index_===Ve?t="$key":(_(n.index_ instanceof fl,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=U(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=U(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+U(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=U(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+U(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function vo(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==O&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn extends sl{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=mn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(_(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=qn.getListenId_(e,i),a={};this.listens_[o]=a;const l=go(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),tt(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=qn.getListenId_(e,t);delete this.listens_[i]}get(e){const t=go(e._queryParams),i=e._path.toString(),s=new Rt;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Nt(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Qt(a.responseText)}catch{X("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&X("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zn(){return{value:null,children:new Map}}function ml(n,e,t){if(T(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=I(e);n.children.has(i)||n.children.set(i,zn());const s=n.children.get(i);e=N(e),ml(s,e,t)}}function ls(n,e,t){n.value!==null?t(e,n.value):Ap(n,(i,s)=>{const r=new k(e.toString()+"/"+i);ls(s,r,t)})}function Ap(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&z(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo=10*1e3,Np=30*1e3,Pp=5*60*1e3;class Op{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Rp(e);const i=yo+(Np-yo)*Math.random();qt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;z(e,(s,r)=>{r>0&&fe(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),qt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Pp))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var de;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(de||(de={}));function zs(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ks(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ys(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=de.ACK_USER_WRITE,this.source=zs()}operationForChild(e){if(T(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new k(e));return new Kn(C(),t,this.revert)}}else return _(I(this.path)===e,"operationForChild called for unrelated child."),new Kn(N(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t){this.source=e,this.path=t,this.type=de.LISTEN_COMPLETE}operationForChild(e){return T(this.path)?new rn(this.source,C()):new rn(this.source,N(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=de.OVERWRITE}operationForChild(e){return T(this.path)?new rt(this.source,C(),this.snap.getImmediateChild(e)):new rt(this.source,N(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=de.MERGE}operationForChild(e){if(T(this.path)){const t=this.children.subtree(new k(e));return t.isEmpty()?null:t.value?new rt(this.source,C(),t.value):new Et(this.source,C(),t)}else return _(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Et(this.source,N(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(T(e))return this.isFullyInitialized()&&!this.filtered_;const t=I(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Dp(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(wp(o.childName,o.snapshotNode))}),Bt(n,s,"child_removed",e,i,t),Bt(n,s,"child_added",e,i,t),Bt(n,s,"child_moved",r,i,t),Bt(n,s,"child_changed",e,i,t),Bt(n,s,"value",e,i,t),s}function Bt(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Lp(n,a,l)),o.forEach(a=>{const l=Mp(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Mp(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Lp(n,e,t){if(e.childName==null||t.childName==null)throw At("Should only compare child_ events.");const i=new w(e.childName,e.snapshotNode),s=new w(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi(n,e){return{eventCache:n,serverCache:e}}function zt(n,e,t,i){return pi(new qe(e,t,i),n.serverCache)}function gl(n,e,t,i){return pi(n.eventCache,new qe(e,t,i))}function Yn(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function ot(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hi;const $p=()=>(Hi||(Hi=new ee(If)),Hi);class R{constructor(e,t=$p()){this.value=e,this.children=t}static fromObject(e){let t=new R(null);return z(e,(i,s)=>{t=t.set(new k(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:C(),value:this.value};if(T(e))return null;{const i=I(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(N(e),t);return r!=null?{path:D(new k(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(T(e))return this;{const t=I(e),i=this.children.get(t);return i!==null?i.subtree(N(e)):new R(null)}}set(e,t){if(T(e))return new R(t,this.children);{const i=I(e),r=(this.children.get(i)||new R(null)).set(N(e),t),o=this.children.insert(i,r);return new R(this.value,o)}}remove(e){if(T(e))return this.children.isEmpty()?new R(null):new R(null,this.children);{const t=I(e),i=this.children.get(t);if(i){const s=i.remove(N(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new R(null):new R(this.value,r)}else return this}}get(e){if(T(e))return this.value;{const t=I(e),i=this.children.get(t);return i?i.get(N(e)):null}}setTree(e,t){if(T(e))return t;{const i=I(e),r=(this.children.get(i)||new R(null)).setTree(N(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new R(this.value,o)}}fold(e){return this.fold_(C(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(D(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,C(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(T(e))return null;{const r=I(e),o=this.children.get(r);return o?o.findOnPath_(N(e),D(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,C(),t)}foreachOnPath_(e,t,i){if(T(e))return this;{this.value&&i(t,this.value);const s=I(e),r=this.children.get(s);return r?r.foreachOnPath_(N(e),D(t,s),i):new R(null)}}foreach(e){this.foreach_(C(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(D(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.writeTree_=e}static empty(){return new he(new R(null))}}function Kt(n,e,t){if(T(e))return new he(new R(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=J(s,e);return r=r.updateChild(o,t),new he(n.writeTree_.set(s,r))}else{const s=new R(t),r=n.writeTree_.setTree(e,s);return new he(r)}}}function cs(n,e,t){let i=n;return z(t,(s,r)=>{i=Kt(i,D(e,s),r)}),i}function bo(n,e){if(T(e))return he.empty();{const t=n.writeTree_.setTree(e,new R(null));return new he(t)}}function us(n,e){return lt(n,e)!=null}function lt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(J(t.path,e)):null}function Io(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(O,(i,s)=>{e.push(new w(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new w(i,s.value))}),e}function Be(n,e){if(T(e))return n;{const t=lt(n,e);return t!=null?new he(new R(t)):new he(n.writeTree_.subtree(e))}}function ds(n){return n.writeTree_.isEmpty()}function Tt(n,e){return vl(C(),n.writeTree_,e)}function vl(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(_(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=vl(D(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(D(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(n,e){return wl(e,n)}function Fp(n,e,t,i,s){_(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Kt(n.visibleWrites,e,t)),n.lastWriteId=i}function Up(n,e,t,i){_(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=cs(n.visibleWrites,e,t),n.lastWriteId=i}function Vp(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Bp(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);_(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Wp(a,i.path)?s=!1:re(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Hp(n),!0;if(i.snap)n.visibleWrites=bo(n.visibleWrites,i.path);else{const a=i.children;z(a,l=>{n.visibleWrites=bo(n.visibleWrites,D(i.path,l))})}return!0}else return!1}function Wp(n,e){if(n.snap)return re(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&re(D(n.path,t),e))return!0;return!1}function Hp(n){n.visibleWrites=yl(n.allWrites,jp,C()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function jp(n){return n.visible}function yl(n,e,t){let i=he.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)re(t,o)?(a=J(t,o),i=Kt(i,a,r.snap)):re(o,t)&&(a=J(o,t),i=Kt(i,C(),r.snap.getChild(a)));else if(r.children){if(re(t,o))a=J(t,o),i=cs(i,a,r.children);else if(re(o,t))if(a=J(o,t),T(a))i=cs(i,C(),r.children);else{const l=tt(r.children,I(a));if(l){const c=l.getChild(N(a));i=Kt(i,C(),c)}}}else throw At("WriteRecord should have .snap or .children")}}return i}function bl(n,e,t,i,s){if(!i&&!s){const r=lt(n.visibleWrites,e);if(r!=null)return r;{const o=Be(n.visibleWrites,e);if(ds(o))return t;if(t==null&&!us(o,C()))return null;{const a=t||v.EMPTY_NODE;return Tt(o,a)}}}else{const r=Be(n.visibleWrites,e);if(!s&&ds(r))return t;if(!s&&t==null&&!us(r,C()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(re(c.path,e)||re(e,c.path))},a=yl(n.allWrites,o,e),l=t||v.EMPTY_NODE;return Tt(a,l)}}}function Gp(n,e,t){let i=v.EMPTY_NODE;const s=lt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(O,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Be(n.visibleWrites,e);return t.forEachChild(O,(o,a)=>{const l=Tt(Be(r,new k(o)),a);i=i.updateImmediateChild(o,l)}),Io(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Be(n.visibleWrites,e);return Io(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function qp(n,e,t,i,s){_(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=D(e,t);if(us(n.visibleWrites,r))return null;{const o=Be(n.visibleWrites,r);return ds(o)?s.getChild(t):Tt(o,s.getChild(t))}}function zp(n,e,t,i){const s=D(e,t),r=lt(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Be(n.visibleWrites,s);return Tt(o,i.getNode().getImmediateChild(t))}else return null}function Kp(n,e){return lt(n.visibleWrites,e)}function Yp(n,e,t,i,s,r,o){let a;const l=Be(n.visibleWrites,e),c=lt(l,C());if(c!=null)a=c;else if(t!=null)a=Tt(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=h.getNext();for(;p&&d.length<s;)u(p,i)!==0&&d.push(p),p=h.getNext();return d}else return[]}function Qp(){return{visibleWrites:he.empty(),allWrites:[],lastWriteId:-1}}function Qn(n,e,t,i){return bl(n.writeTree,n.treePath,e,t,i)}function Qs(n,e){return Gp(n.writeTree,n.treePath,e)}function wo(n,e,t,i){return qp(n.writeTree,n.treePath,e,t,i)}function Jn(n,e){return Kp(n.writeTree,D(n.treePath,e))}function Jp(n,e,t,i,s,r){return Yp(n.writeTree,n.treePath,e,t,i,s,r)}function Js(n,e,t){return zp(n.writeTree,n.treePath,e,t)}function Il(n,e){return wl(D(n.treePath,e),n.writeTree)}function wl(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;_(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),_(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,nn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,tn(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,wt(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,nn(i,e.snapshotNode,s.oldSnap));else throw At("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const El=new Zp;class Xs{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new qe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Js(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ot(this.viewCache_),r=Jp(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e_(n){return{filter:n}}function t_(n,e){_(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function n_(n,e,t,i,s){const r=new Xp;let o,a;if(t.type===de.OVERWRITE){const c=t;c.source.fromUser?o=hs(n,e,c.path,c.snap,i,s,r):(_(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!T(c.path),o=Xn(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===de.MERGE){const c=t;c.source.fromUser?o=s_(n,e,c.path,c.children,i,s,r):(_(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=fs(n,e,c.path,c.children,i,s,a,r))}else if(t.type===de.ACK_USER_WRITE){const c=t;c.revert?o=a_(n,e,c.path,i,s,r):o=r_(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===de.LISTEN_COMPLETE)o=o_(n,e,t.path,i,r);else throw At("Unknown operation type: "+t.type);const l=r.getChanges();return i_(e,o,l),{viewCache:o,changes:l}}function i_(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Yn(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(_l(Yn(e)))}}function Tl(n,e,t,i,s,r){const o=e.eventCache;if(Jn(i,t)!=null)return e;{let a,l;if(T(t))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=ot(e),d=c instanceof v?c:v.EMPTY_NODE,u=Qs(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Qn(i,ot(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=I(t);if(c===".priority"){_(Ge(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=wo(i,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=N(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=wo(i,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=Js(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return zt(e,a,o.isFullyInitialized()||T(t),n.filter.filtersNodes())}}function Xn(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(T(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),p,null)}else{const p=I(t);if(!l.isCompleteForPath(t)&&Ge(t)>1)return e;const g=N(t),A=l.getNode().getImmediateChild(p).updateChild(g,i);p===".priority"?c=d.updatePriority(l.getNode(),A):c=d.updateChild(l.getNode(),p,A,g,El,null)}const u=gl(e,c,l.isFullyInitialized()||T(t),d.filtersNodes()),h=new Xs(s,u,r);return Tl(n,u,t,s,h,a)}function hs(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new Xs(s,e,r);if(T(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=zt(e,c,!0,n.filter.filtersNodes());else{const u=I(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=zt(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=N(t),p=a.getNode().getImmediateChild(u);let g;if(T(h))g=i;else{const E=d.getCompleteChild(u);E!=null?Bs(h)===".priority"&&E.getChild(ol(h)).isEmpty()?g=E:g=E.updateChild(h,i):g=v.EMPTY_NODE}if(p.equals(g))l=e;else{const E=n.filter.updateChild(a.getNode(),u,g,h,d,o);l=zt(e,E,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Eo(n,e){return n.eventCache.isCompleteForChild(e)}function s_(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=D(t,l);Eo(e,I(d))&&(a=hs(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=D(t,l);Eo(e,I(d))||(a=hs(n,a,d,c,s,r,o))}),a}function To(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function fs(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;T(t)?c=i:c=new R(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),g=To(n,p,h);l=Xn(n,l,new k(u),g,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const p=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!p){const g=e.serverCache.getNode().getImmediateChild(u),E=To(n,g,h);l=Xn(n,l,new k(u),E,s,r,o,a)}}),l}function r_(n,e,t,i,s,r,o){if(Jn(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(T(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Xn(n,e,t,l.getNode().getChild(t),s,r,a,o);if(T(t)){let c=new R(null);return l.getNode().forEachChild(Ve,(d,u)=>{c=c.set(new k(d),u)}),fs(n,e,t,c,s,r,a,o)}else return e}else{let c=new R(null);return i.foreach((d,u)=>{const h=D(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),fs(n,e,t,c,s,r,a,o)}}function o_(n,e,t,i,s){const r=e.serverCache,o=gl(e,r.getNode(),r.isFullyInitialized()||T(t),r.isFiltered());return Tl(n,o,t,i,El,s)}function a_(n,e,t,i,s,r){let o;if(Jn(i,t)!=null)return e;{const a=new Xs(i,e,s),l=e.eventCache.getNode();let c;if(T(t)||I(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Qn(i,ot(e));else{const u=e.serverCache.getNode();_(u instanceof v,"serverChildren would be complete if leaf node"),d=Qs(i,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=I(t);let u=Js(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,N(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,v.EMPTY_NODE,N(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Qn(i,ot(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Jn(i,C())!=null,zt(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Gs(i.getIndex()),r=Tp(i);this.processor_=e_(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(v.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(v.EMPTY_NODE,a.getNode(),null),d=new qe(l,o.isFullyInitialized(),s.filtersNodes()),u=new qe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=pi(u,d),this.eventGenerator_=new xp(this.query_)}get query(){return this.query_}}function c_(n){return n.viewCache_.serverCache.getNode()}function u_(n){return Yn(n.viewCache_)}function d_(n,e){const t=ot(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!T(e)&&!t.getImmediateChild(I(e)).isEmpty())?t.getChild(e):null}function Co(n){return n.eventRegistrations_.length===0}function h_(n,e){n.eventRegistrations_.push(e)}function So(n,e,t){const i=[];if(t){_(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function ko(n,e,t,i){e.type===de.MERGE&&e.source.queryId!==null&&(_(ot(n.viewCache_),"We should always have a full cache before handling merges"),_(Yn(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=n_(n.processor_,s,e,t,i);return t_(n.processor_,r.viewCache),_(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Cl(n,r.changes,r.viewCache.eventCache.getNode(),null)}function f_(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(O,(r,o)=>{i.push(wt(r,o))}),t.isFullyInitialized()&&i.push(_l(t.getNode())),Cl(n,i,t.getNode(),e)}function Cl(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Dp(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zn;class Sl{constructor(){this.views=new Map}}function p_(n){_(!Zn,"__referenceConstructor has already been defined"),Zn=n}function __(){return _(Zn,"Reference.ts has not been loaded"),Zn}function m_(n){return n.views.size===0}function Zs(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return _(r!=null,"SyncTree gave us an op for an invalid query."),ko(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(ko(o,e,t,i));return r}}function kl(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Qn(t,s?i:null),l=!1;a?l=!0:i instanceof v?(a=Qs(t,i),l=!1):(a=v.EMPTY_NODE,l=!1);const c=pi(new qe(a,l,!1),new qe(i,s,!1));return new l_(e,c)}return o}function g_(n,e,t,i,s,r){const o=kl(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),h_(o,t),f_(o,t)}function v_(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=ze(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(So(c,t,i)),Co(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(So(l,t,i)),Co(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ze(n)&&r.push(new(__())(e._repo,e._path)),{removed:r,events:o}}function Al(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function We(n,e){let t=null;for(const i of n.views.values())t=t||d_(i,e);return t}function Rl(n,e){if(e._queryParams.loadsAllData())return mi(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Nl(n,e){return Rl(n,e)!=null}function ze(n){return mi(n)!=null}function mi(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ei;function y_(n){_(!ei,"__referenceConstructor has already been defined"),ei=n}function b_(){return _(ei,"Reference.ts has not been loaded"),ei}let I_=1;class Ao{constructor(e){this.listenProvider_=e,this.syncPointTree_=new R(null),this.pendingWriteTree_=Qp(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function er(n,e,t,i,s){return Fp(n.pendingWriteTree_,e,t,i,s),s?Dt(n,new rt(zs(),e,t)):[]}function w_(n,e,t,i){Up(n.pendingWriteTree_,e,t,i);const s=R.fromObject(t);return Dt(n,new Et(zs(),e,s))}function Le(n,e,t=!1){const i=Vp(n.pendingWriteTree_,e);if(Bp(n.pendingWriteTree_,e)){let r=new R(null);return i.snap!=null?r=r.set(C(),!0):z(i.children,o=>{r=r.set(new k(o),!0)}),Dt(n,new Kn(i.path,r,t))}else return[]}function vn(n,e,t){return Dt(n,new rt(Ks(),e,t))}function E_(n,e,t){const i=R.fromObject(t);return Dt(n,new Et(Ks(),e,i))}function T_(n,e){return Dt(n,new rn(Ks(),e))}function C_(n,e,t){const i=tr(n,t);if(i){const s=nr(i),r=s.path,o=s.queryId,a=J(r,e),l=new rn(Ys(o),a);return ir(n,r,l)}else return[]}function ti(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Nl(o,e))){const l=v_(o,e,t,i);m_(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,p)=>ze(p));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=A_(h);for(let g=0;g<p.length;++g){const E=p[g],A=E.query,ce=Dl(n,E);n.listenProvider_.startListening(Yt(A),on(n,A),ce.hashFn,ce.onComplete)}}}!u&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(Yt(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(vi(h));n.listenProvider_.stopListening(Yt(h),p)}))}R_(n,c)}return a}function Pl(n,e,t,i){const s=tr(n,i);if(s!=null){const r=nr(s),o=r.path,a=r.queryId,l=J(o,e),c=new rt(Ys(a),l,t);return ir(n,o,c)}else return[]}function S_(n,e,t,i){const s=tr(n,i);if(s){const r=nr(s),o=r.path,a=r.queryId,l=J(o,e),c=R.fromObject(t),d=new Et(Ys(a),l,c);return ir(n,o,d)}else return[]}function ps(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,p)=>{const g=J(h,s);r=r||We(p,g),o=o||ze(p)});let a=n.syncPointTree_.get(s);a?(o=o||ze(a),r=r||We(a,C())):(a=new Sl,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=v.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,g)=>{const E=We(g,C());E&&(r=r.updateImmediateChild(p,E))}));const c=Nl(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=vi(e);_(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=N_();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const d=_i(n.pendingWriteTree_,s);let u=g_(a,e,t,d,r,l);if(!c&&!o&&!i){const h=Rl(a,e);u=u.concat(P_(n,e,h))}return u}function gi(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=J(o,e),c=We(a,l);if(c)return c});return bl(s,e,r,t,!0)}function k_(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=J(c,t);i=i||We(d,u)});let s=n.syncPointTree_.get(t);s?i=i||We(s,C()):(s=new Sl,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new qe(i,!0,!1):null,a=_i(n.pendingWriteTree_,e._path),l=kl(s,e,a,r?o.getNode():v.EMPTY_NODE,r);return u_(l)}function Dt(n,e){return Ol(e,n.syncPointTree_,null,_i(n.pendingWriteTree_,C()))}function Ol(n,e,t,i){if(T(n.path))return xl(n,e,t,i);{const s=e.get(C());t==null&&s!=null&&(t=We(s,C()));let r=[];const o=I(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=Il(i,o);r=r.concat(Ol(a,l,c,d))}return s&&(r=r.concat(Zs(s,n,i,t))),r}}function xl(n,e,t,i){const s=e.get(C());t==null&&s!=null&&(t=We(s,C()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Il(i,o),d=n.operationForChild(o);d&&(r=r.concat(xl(d,a,l,c)))}),s&&(r=r.concat(Zs(s,n,i,t))),r}function Dl(n,e){const t=e.query,i=on(n,t);return{hashFn:()=>(c_(e)||v.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?C_(n,t._path,i):T_(n,t._path);{const r=Tf(s,t);return ti(n,t,null,r)}}}}function on(n,e){const t=vi(e);return n.queryToTagMap.get(t)}function vi(n){return n._path.toString()+"$"+n._queryIdentifier}function tr(n,e){return n.tagToQueryMap.get(e)}function nr(n){const e=n.indexOf("$");return _(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new k(n.substr(0,e))}}function ir(n,e,t){const i=n.syncPointTree_.get(e);_(i,"Missing sync point for query tag that we're tracking");const s=_i(n.pendingWriteTree_,e);return Zs(i,t,s,null)}function A_(n){return n.fold((e,t,i)=>{if(t&&ze(t))return[mi(t)];{let s=[];return t&&(s=Al(t)),z(i,(r,o)=>{s=s.concat(o)}),s}})}function Yt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(b_())(n._repo,n._path):n}function R_(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=vi(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function N_(){return I_++}function P_(n,e,t){const i=e._path,s=on(n,e),r=Dl(n,t),o=n.listenProvider_.startListening(Yt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)_(!ze(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!T(c)&&d&&ze(d))return[mi(d).query];{let h=[];return d&&(h=h.concat(Al(d).map(p=>p.query))),z(u,(p,g)=>{h=h.concat(g)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(Yt(d),on(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new sr(t)}node(){return this.node_}}class rr{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=D(this.path_,e);return new rr(this.syncTree_,t)}node(){return gi(this.syncTree_,this.path_)}}const O_=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ro=function(n,e,t){if(!n||typeof n!="object")return n;if(_(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return x_(n[".sv"],e,t);if(typeof n[".sv"]=="object")return D_(n[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},x_=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:_(!1,"Unexpected server value: "+n)}},D_=function(n,e,t){n.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&_(!1,"Unexpected increment value: "+i);const s=e.node();if(_(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Ml=function(n,e,t,i){return ar(e,new rr(t,n),i)},or=function(n,e,t){return ar(n,new sr(e),t)};function ar(n,e,t){const i=n.getPriority().val(),s=Ro(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ro(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new H(a,L(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new H(s))),o.forEachChild(O,(a,l)=>{const c=ar(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function yi(n,e){let t=e instanceof k?e:new k(e),i=n,s=I(t);for(;s!==null;){const r=tt(i.node.children,s)||{children:{},childCount:0};i=new lr(s,i,r),t=N(t),s=I(t)}return i}function ct(n){return n.node.value}function cr(n,e){n.node.value=e,_s(n)}function Ll(n){return n.node.childCount>0}function M_(n){return ct(n)===void 0&&!Ll(n)}function bi(n,e){z(n.node.children,(t,i)=>{e(new lr(t,n,i))})}function $l(n,e,t,i){t&&e(n),bi(n,s=>{$l(s,e,!0)})}function L_(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function yn(n){return new k(n.parent===null?n.name:yn(n.parent)+"/"+n.name)}function _s(n){n.parent!==null&&$_(n.parent,n.name,n)}function $_(n,e,t){const i=M_(t),s=fe(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,_s(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,_s(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_=/[\[\].#$\/\u0000-\u001F\u007F]/,U_=/[\[\].#$\u0000-\u001F\u007F]/,ji=10*1024*1024,ur=function(n){return typeof n=="string"&&n.length!==0&&!F_.test(n)},Fl=function(n){return typeof n=="string"&&n.length!==0&&!U_.test(n)},V_=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Fl(n)},ni=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Ls(n)||n&&typeof n=="object"&&fe(n,".sv")},Ul=function(n,e,t,i){i&&e===void 0||bn(ci(n,"value"),e,t)},bn=function(n,e,t){const i=t instanceof k?new sp(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Je(i));if(typeof e=="function")throw new Error(n+"contains a function "+Je(i)+" with contents = "+e.toString());if(Ls(e))throw new Error(n+"contains "+e.toString()+" "+Je(i));if(typeof e=="string"&&e.length>ji/3&&ui(e)>ji)throw new Error(n+"contains a string greater than "+ji+" utf8 bytes "+Je(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(z(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ur(o)))throw new Error(n+" contains an invalid key ("+o+") "+Je(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);rp(i,o),bn(n,a,i),op(i)}),s&&r)throw new Error(n+' contains ".value" child '+Je(i)+" in addition to actual children.")}},B_=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=en(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ur(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(ip);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&re(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},W_=function(n,e,t,i){const s=ci(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];z(e,(o,a)=>{const l=new k(o);if(bn(s,a,D(t,l)),Bs(l)===".priority"&&!ni(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),B_(s,r)},Vl=function(n,e,t,i){if(!Fl(t))throw new Error(ci(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},H_=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Vl(n,e,t)},dr=function(n,e){if(I(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},j_=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ur(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!V_(t))throw new Error(ci(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ii(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Ws(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Bl(n,e,t){Ii(n,t),Wl(n,i=>Ws(i,e))}function ie(n,e,t){Ii(n,t),Wl(n,i=>re(i,e)||re(e,i))}function Wl(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(q_(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function q_(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Gt&&G("event: "+t.toString()),xt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z_="repo_interrupt",K_=25;class Y_{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new G_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=zn(),this.transactionQueueTree_=new lr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Q_(n,e,t){if(n.stats_=Us(n.repoInfo_),n.forceRestClient_||Af())n.server_=new qn(n.repoInfo_,(i,s,r,o)=>{No(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Po(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{U(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Te(n.repoInfo_,e,(i,s,r,o)=>{No(n,i,s,r,o)},i=>{Po(n,i)},i=>{J_(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=xf(n.repoInfo_,()=>new Op(n.stats_,n.server_)),n.infoData_=new kp,n.infoSyncTree_=new Ao({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=vn(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),hr(n,"connected",!1),n.serverSyncTree_=new Ao({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);ie(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function Hl(n){const t=n.infoData_.getNode(new k(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function In(n){return O_({timestamp:Hl(n)})}function No(n,e,t,i,s){n.dataUpdateCount++;const r=new k(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Mn(t,c=>L(c));o=S_(n.serverSyncTree_,r,l,s)}else{const l=L(t);o=Pl(n.serverSyncTree_,r,l,s)}else if(i){const l=Mn(t,c=>L(c));o=E_(n.serverSyncTree_,r,l)}else{const l=L(t);o=vn(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Ct(n,r)),ie(n.eventQueue_,a,o)}function Po(n,e){hr(n,"connected",e),e===!1&&tm(n)}function J_(n,e){z(e,(t,i)=>{hr(n,t,i)})}function hr(n,e,t){const i=new k("/.info/"+e),s=L(t);n.infoData_.updateSnapshot(i,s);const r=vn(n.infoSyncTree_,i,s);ie(n.eventQueue_,i,r)}function wi(n){return n.nextWriteId_++}function X_(n,e,t){const i=k_(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=L(s).withIndex(e._queryParams.getIndex());ps(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=vn(n.serverSyncTree_,e._path,r);else{const a=on(n.serverSyncTree_,e);o=Pl(n.serverSyncTree_,e._path,r,a)}return ie(n.eventQueue_,e._path,o),ti(n.serverSyncTree_,e,t,null,!0),r},s=>(Mt(n,"get for query "+U(e)+" failed: "+s),Promise.reject(new Error(s))))}function Z_(n,e,t,i,s){Mt(n,"set",{path:e.toString(),value:t,priority:i});const r=In(n),o=L(t,i),a=gi(n.serverSyncTree_,e),l=or(o,a,r),c=wi(n),d=er(n.serverSyncTree_,e,l,c,!0);Ii(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,p)=>{const g=h==="ok";g||X("set at "+e+" failed: "+h);const E=Le(n.serverSyncTree_,c,!g);ie(n.eventQueue_,e,E),ms(n,s,h,p)});const u=pr(n,e);Ct(n,u),ie(n.eventQueue_,u,[])}function em(n,e,t,i){Mt(n,"update",{path:e.toString(),value:t});let s=!0;const r=In(n),o={};if(z(t,(a,l)=>{s=!1,o[a]=Ml(D(e,a),L(l),n.serverSyncTree_,r)}),s)G("update() called with empty data.  Don't do anything."),ms(n,i,"ok",void 0);else{const a=wi(n),l=w_(n.serverSyncTree_,e,o,a);Ii(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||X("update at "+e+" failed: "+c);const h=Le(n.serverSyncTree_,a,!u),p=h.length>0?Ct(n,e):e;ie(n.eventQueue_,p,h),ms(n,i,c,d)}),z(t,c=>{const d=pr(n,D(e,c));Ct(n,d)}),ie(n.eventQueue_,e,[])}}function tm(n){Mt(n,"onDisconnectEvents");const e=In(n),t=zn();ls(n.onDisconnect_,C(),(s,r)=>{const o=Ml(s,r,n.serverSyncTree_,e);ml(t,s,o)});let i=[];ls(t,C(),(s,r)=>{i=i.concat(vn(n.serverSyncTree_,s,r));const o=pr(n,s);Ct(n,o)}),n.onDisconnect_=zn(),ie(n.eventQueue_,C(),i)}function nm(n,e,t){let i;I(e._path)===".info"?i=ps(n.infoSyncTree_,e,t):i=ps(n.serverSyncTree_,e,t),Bl(n.eventQueue_,e._path,i)}function im(n,e,t){let i;I(e._path)===".info"?i=ti(n.infoSyncTree_,e,t):i=ti(n.serverSyncTree_,e,t),Bl(n.eventQueue_,e._path,i)}function sm(n){n.persistentConnection_&&n.persistentConnection_.interrupt(z_)}function Mt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),G(t,...e)}function ms(n,e,t,i){e&&xt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function rm(n,e,t,i,s,r){Mt(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:Fa(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=fr(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{bn("transaction failed: Data returned ",l,o.path),o.status=0;const c=yi(n.transactionQueueTree_,e),d=ct(c)||[];d.push(o),cr(c,d);let u;typeof l=="object"&&l!==null&&fe(l,".priority")?(u=tt(l,".priority"),_(ni(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(gi(n.serverSyncTree_,e)||v.EMPTY_NODE).getPriority().val();const h=In(n),p=L(l,u),g=or(p,a,h);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=g,o.currentWriteId=wi(n);const E=er(n.serverSyncTree_,e,g,o.currentWriteId,o.applyLocally);ie(n.eventQueue_,e,E),Ei(n,n.transactionQueueTree_)}}function fr(n,e,t){return gi(n.serverSyncTree_,e,t)||v.EMPTY_NODE}function Ei(n,e=n.transactionQueueTree_){if(e||Ti(n,e),ct(e)){const t=Gl(n,e);_(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&om(n,yn(e),t)}else Ll(e)&&bi(e,t=>{Ei(n,t)})}function om(n,e,t){const i=t.map(c=>c.currentWriteId),s=fr(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];_(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=J(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Mt(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(Le(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();Ti(n,yi(n.transactionQueueTree_,e)),Ei(n,n.transactionQueueTree_),ie(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)xt(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{X("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Ct(n,e)}},o)}function Ct(n,e){const t=jl(n,e),i=yn(t),s=Gl(n,t);return am(n,s,i),i}function am(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=J(t,l.path);let d=!1,u;if(_(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(Le(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=K_)d=!0,u="maxretry",s=s.concat(Le(n.serverSyncTree_,l.currentWriteId,!0));else{const h=fr(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){bn("transaction failed: Data returned ",p,l.path);let g=L(p);typeof p=="object"&&p!=null&&fe(p,".priority")||(g=g.updatePriority(h.getPriority()));const A=l.currentWriteId,ce=In(n),ve=or(g,h,ce);l.currentOutputSnapshotRaw=g,l.currentOutputSnapshotResolved=ve,l.currentWriteId=wi(n),o.splice(o.indexOf(A),1),s=s.concat(er(n.serverSyncTree_,l.path,ve,l.currentWriteId,l.applyLocally)),s=s.concat(Le(n.serverSyncTree_,A,!0))}else d=!0,u="nodata",s=s.concat(Le(n.serverSyncTree_,l.currentWriteId,!0))}ie(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Ti(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)xt(i[a]);Ei(n,n.transactionQueueTree_)}function jl(n,e){let t,i=n.transactionQueueTree_;for(t=I(e);t!==null&&ct(i)===void 0;)i=yi(i,t),e=N(e),t=I(e);return i}function Gl(n,e){const t=[];return ql(n,e,t),t.sort((i,s)=>i.order-s.order),t}function ql(n,e,t){const i=ct(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);bi(e,s=>{ql(n,s,t)})}function Ti(n,e){const t=ct(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,cr(e,t.length>0?t:void 0)}bi(e,i=>{Ti(n,i)})}function pr(n,e){const t=yn(jl(n,e)),i=yi(n.transactionQueueTree_,e);return L_(i,s=>{Gi(n,s)}),Gi(n,i),$l(i,s=>{Gi(n,s)}),t}function Gi(n,e){const t=ct(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(_(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(_(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Le(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?cr(e,void 0):t.length=r+1,ie(n.eventQueue_,yn(e),s);for(let o=0;o<i.length;o++)xt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lm(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function cm(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):X(`Invalid query segment '${t}' in query '${n}'`)}return e}const Oo=function(n,e){const t=um(n),i=t.namespace;t.domain==="firebase.com"&&Ae(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Ae("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||yf();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ja(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new k(t.pathString)}},um=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(s=lm(n.substring(d,u)));const h=cm(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const g=e.indexOf(".");i=e.substring(0,g).toLowerCase(),t=e.substring(g+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",dm=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=xo.charAt(t%64),t=Math.floor(t/64);_(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=xo.charAt(e[s]);return _(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+U(this.snapshot.exportVal())}}class fm{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return T(this._path)?null:Bs(this._path)}get ref(){return new ge(this._repo,this._path)}get _queryIdentifier(){const e=vo(this._queryParams),t=$s(e);return t==="{}"?"default":t}get _queryObject(){return vo(this._queryParams)}isEqual(e){if(e=Q(e),!(e instanceof wn))return!1;const t=this._repo===e._repo,i=Ws(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+np(this._path)}}function pm(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function _m(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===Ve){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==st)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(n.hasEnd()){if(n.getIndexEndName()!==je)throw new Error(i);if(typeof t!="string")throw new Error(s)}}else if(n.getIndex()===O){if(e!=null&&!ni(e)||t!=null&&!ni(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(_(n.getIndex()instanceof fl||n.getIndex()===pl,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class ge extends wn{constructor(e,t){super(e,t,new qs,!1)}get parent(){const e=ol(this._path);return e===null?null:new ge(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class St{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new k(e),i=an(this.ref,e);return new St(this._node.getChild(t),i,O)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new St(s,an(this.ref,i),O)))}hasChild(e){const t=new k(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Lt(n,e){return n=Q(n),n._checkNotDeleted("ref"),e!==void 0?an(n._root,e):n._root}function an(n,e){return n=Q(n),I(n._path)===null?H_("child","path",e):Vl("child","path",e),new ge(n._repo,D(n._path,e))}function Kl(n,e){n=Q(n),dr("push",n._path),Ul("push",e,n._path,!0);const t=Hl(n._repo),i=dm(t),s=an(n,i),r=an(n,i);let o;return e!=null?o=mm(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function mm(n,e){n=Q(n),dr("set",n._path),Ul("set",e,n._path,!1);const t=new Rt;return Z_(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function K(n,e){W_("update",e,n._path);const t=new Rt;return em(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function kn(n){n=Q(n);const e=new zl(()=>{}),t=new Ci(e);return X_(n._repo,n,t).then(i=>new St(i,new ge(n._repo,n._path),n._queryParams.getIndex()))}class Ci{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new hm("value",this,new St(e.snapshotNode,new ge(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new fm(this,e,t):null}matches(e){return e instanceof Ci?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function gm(n,e,t,i,s){const r=new zl(t,void 0),o=new Ci(r);return nm(n._repo,n,o),()=>im(n._repo,n,o)}function vm(n,e,t,i){return gm(n,"value",e)}class Yl{}class ym extends Yl{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new wn(e._repo,e._path,Cp(e._queryParams,this._limit),e._orderByCalled)}}function Do(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new ym(n)}class bm extends Yl{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){pm(e,"orderByKey");const t=Sp(e._queryParams,Ve);return _m(t),new wn(e._repo,e._path,t,!0)}}function Mo(){return new bm}function Lo(n,...e){let t=Q(n);for(const i of e)t=i._apply(t);return t}p_(ge);y_(ge);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Im="FIREBASE_DATABASE_EMULATOR_HOST",gs={};let wm=!1;function Em(n,e,t,i){n.repoInfo_=new Ja(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function Tm(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Ae("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),G("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Oo(r,s),a=o.repoInfo,l;typeof process<"u"&&Zr&&(l=Zr[Im]),l?(r=`http://${l}?ns=${a.namespace}`,o=Oo(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Nf(n.name,n.options,e);j_("Invalid Firebase Database URL",o),T(o.path)||Ae("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Sm(a,n,c,new Rf(n.name,t));return new km(d,n)}function Cm(n,e){const t=gs[e];(!t||t[n.key]!==n)&&Ae(`Database ${e}(${n.repoInfo_}) has already been deleted.`),sm(n),delete t[n.key]}function Sm(n,e,t,i){let s=gs[e.name];s||(s={},gs[e.name]=s);let r=s[n.toURLString()];return r&&Ae("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Y_(n,wm,t,i),s[n.toURLString()]=r,r}class km{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Q_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ge(this._repo,C())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Cm(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ae("Cannot call "+e+" on a deleted database.")}}function Am(n=ta(),e){const t=Cs(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Wc("database");i&&Rm(t,...i)}return t}function Rm(n,e,t,i={}){n=Q(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&Ae("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&Ae('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new On(On.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:Hc(i.mockUserToken,n.app.options.projectId);r=new On(o)}Em(s,e,t,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nm(n){pf(Pt),bt(new nt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Tm(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Ue(eo,to,n),Ue(eo,to,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function oe(n,e,t){var i;if(n=Q(n),dr("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=(i=void 0)!==null&&i!==void 0?i:!0,r=new Rt,o=(l,c,d)=>{let u=null;l?r.reject(l):(u=new St(d,new ge(n._repo,n._path),O),r.resolve(new Pm(c,u)))},a=vm(n,()=>{});return rm(n._repo,n._path,e,o,a,s),r.promise}Te.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Te.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Nm();const vs={apiKey:"AIzaSyARFa-vzKVmIdxP5xDRXVzasL2ui94eZ-w",authDomain:"market-6e66a.firebaseapp.com",databaseURL:"https://market-6e66a-default-rtdb.firebaseio.com",projectId:"market-6e66a",storageBucket:"market-6e66a.firebasestorage.app",messagingSenderId:"402312269082",appId:"1:402312269082:web:cf304afc54057ea162b0a3"},Om=!!vs.apiKey&&!!vs.databaseURL;let Wt=null,$o=null,Fo=null;function Ye(){return Wt||(Wt=ea(vs),$o=hf(Wt),Fo=Am(Wt)),{app:Wt,auth:$o,db:Fo}}function xm(){const{auth:n}=Ye();return new Promise(e=>{let t=!1;const i=eh(n,s=>{t||(t=!0,i(),e(s||null))},()=>e(null));setTimeout(()=>{t||(t=!0,e(n.currentUser||null))},4e3)})}const Dm="../STONK-Home/index.html",qi=2600;function Mm(n){return String(n||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"")}function Lm(){return/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)||location.protocol==="file:"}function $m(n){const e=Mm(n);return Dm+(e?`?room=${encodeURIComponent(e)}`:"")}function Fm({title:n="STONK Home에서 입장해 주세요",message:e="",roomCode:t="",auto:i=!0}={}){var l;const s=$m(t),r=document.getElementById("stonk-home-gate");r&&r.remove();const o=document.createElement("div");o.id="stonk-home-gate",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),Object.assign(o.style,{position:"fixed",inset:"0",zIndex:"99999",display:"grid",placeItems:"center",padding:"24px",background:"radial-gradient(120% 90% at 50% -10%, rgba(139,108,255,0.22), transparent 60%), rgba(5,6,10,0.94)",backdropFilter:"blur(8px)",color:"#f4f7ff",fontFamily:"Pretendard, Inter, 'Noto Sans KR', system-ui, sans-serif"});const a=i&&!Lm();if(o.innerHTML=`
    <div style="width:min(460px,100%);text-align:center;padding:32px 26px;border:1px solid rgba(255,255,255,0.14);border-radius:18px;background:rgba(14,16,24,0.92);box-shadow:0 24px 70px rgba(0,0,0,0.5),0 0 60px rgba(139,108,255,0.16)">
      <div style="font-size:13px;font-weight:900;letter-spacing:2px;color:#8b6cff;margin-bottom:8px">STONK UNIVERSE</div>
      <h2 style="margin:0 0 10px;font-size:1.5rem">${n}</h2>
      <p style="margin:0 0 18px;color:#aab2c8;font-size:0.95rem;line-height:1.5">${e||"로그인 · 방 선택 · 닉네임 설정은 STONK Home에서 진행합니다."}</p>
      <a data-home-go href="${s}" style="display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 26px;border-radius:14px;font-weight:900;text-decoration:none;color:#0a0a12;background:linear-gradient(135deg,#a99bff,#8b6cff);box-shadow:0 10px 30px rgba(139,108,255,0.4)">STONK Home으로 이동</a>
      ${t?`<div style="margin-top:14px;font-size:0.82rem;color:#8a93a8">방 코드 <b style="color:#41e0ff;letter-spacing:2px">${t}</b> 유지</div>`:""}
      ${a?`<div style="margin-top:12px;font-size:0.8rem;color:#8a93a8"><span data-gate-count>${Math.ceil(qi/1e3)}</span>초 후 자동 이동…</div>`:'<div style="margin-top:12px;font-size:0.78rem;color:#5f6678">개발 모드: 자동 이동 없음</div>'}
    </div>
  `,document.body.appendChild(o),(l=o.querySelector("[data-home-go]"))==null||l.addEventListener("click",c=>{c.preventDefault(),location.href=s}),a){let c=Math.ceil(qi/1e3);const d=o.querySelector("[data-gate-count]"),u=setInterval(()=>{c-=1,d&&(d.textContent=String(Math.max(0,c))),c<=0&&clearInterval(u)},1e3);setTimeout(()=>{location.href=s},qi)}return o}const ut="MAIN",_r=.002,mr=.01,Ql=60*60*1e3,ln=60,Jl={d1:{id:"d1",label:"1일 정기예금",ms:24*3600*1e3,rate:.005,desc:"24시간 · 이자 0.5%"},d3:{id:"d3",label:"3일 정기예금",ms:72*3600*1e3,rate:.018,desc:"72시간 · 이자 1.8%"}},Xl={S:5e7,A:3e7,B:15e6,C:7e6,D:3e6,F:0},Zl={arcade:{id:"arcade",title:"Arcade 손실 완화 보험",premium:3e6,ms:24*3600*1e3,desc:"24시간 · 아케이드 큰 손실 시 일부 완화(예정)"},gacha:{id:"gacha",title:"Gacha 폭망 보호권",premium:5e6,ms:24*3600*1e3,desc:"24시간 · 가챠 과소비 경고 강화"},loan:{id:"loan",title:"대출 유예권",premium:2e6,ms:24*3600*1e3,desc:"24시간 · 대출 위험도를 한 단계 완화 표시(신용등급과는 별개)"}},ec={stable:{id:"stable",title:"안정형 펀드",ms:6*3600*1e3,min:-.01,max:.02,risk:"낮음"},growth:{id:"growth",title:"성장형 펀드",ms:12*3600*1e3,min:-.05,max:.08,risk:"중간"},ipo:{id:"ipo",title:"IPO 청약 상품",ms:24*3600*1e3,min:-.2,max:.35,risk:"높음"},lever:{id:"lever",title:"레버리지 펀드",ms:24*3600*1e3,min:-.4,max:.6,risk:"매우 높음"}},cn=["NORMAL","SILVER","GOLD","PLATINUM","BLACK"],tc={NORMAL:0,SILVER:30,GOLD:55,PLATINUM:78,BLACK:92},nc=.003,ic="GOLD",sc={NORMAL:0,SILVER:.03,GOLD:.05,PLATINUM:.08,BLACK:.1},rc={NORMAL:0,SILVER:0,GOLD:.003,PLATINUM:.0035,BLACK:.004};function oc(n){return sc[n]||0}function ac(n){return rc[n]||0}function un(n){return Math.max(0,cn.indexOf(n||"NORMAL"))}const lc={pbond:{id:"pbond",title:"PLATINUM 안정 채권",ms:24*3600*1e3,min:-.02,max:.04,risk:"낮음",requiredVipTier:"PLATINUM"},bsecret:{id:"bsecret",title:"BLACK 시크릿 펀드",ms:48*3600*1e3,min:-.15,max:.2,risk:"매우 높음",requiredVipTier:"BLACK"}};function x(n){const e=Number(n);return Number.isFinite(e)?e:0}function f(n){return Math.trunc(x(n))}function se(n){return n=Math.round(x(n)),Math.max(0,Math.min(100,n))}function dt(n){return n=se(n),n>=90?"S":n>=75?"A":n>=55?"B":n>=35?"C":n>=15?"D":"F"}function cc(n){return Xl[n]??0}function q(n){return f(n).toLocaleString("ko-KR")+"원"}const Um=n=>Lt(Ye().db,`rooms/${ut}/players/${n}`),ae=n=>Lt(Ye().db,`rooms/${ut}/players/${n}/cash`),Y=n=>Lt(Ye().db,`rooms/${ut}/bank/${n}`),uc=n=>Lt(Ye().db,`rooms/${ut}/bank/${n}/tx`),gr=n=>Lt(Ye().db,`rooms/${ut}/bank/${n}/messages`);function dc(n){return{balance:0,fixed:{},loanPrincipal:0,loanInterest:0,creditScore:ln,creditGrade:dt(ln),insurances:{},investments:{},vipScore:0,vipTier:"NORMAL",vipVaultBalance:0,lastInterestSettledAt:n,lastVipSettledAt:n,createdAt:n,updatedAt:n}}function Vm(n,e){const t=dc(e),i=n&&typeof n=="object"?n:{};return{nickname:i.nickname||"",balance:Math.max(0,f(i.balance)),fixed:i.fixed&&typeof i.fixed=="object"?i.fixed:{},loanPrincipal:Math.max(0,f(i.loanPrincipal)),loanInterest:Math.max(0,f(i.loanInterest)),creditScore:se(i.creditScore!=null?i.creditScore:ln),creditGrade:i.creditGrade||dt(i.creditScore!=null?i.creditScore:ln),insurances:i.insurances&&typeof i.insurances=="object"?i.insurances:{},investments:i.investments&&typeof i.investments=="object"?i.investments:{},vipScore:se(i.vipScore),vipTier:i.vipTier||"NORMAL",vipVaultBalance:Math.max(0,f(i.vipVaultBalance)),lastInterestSettledAt:f(i.lastInterestSettledAt)||t.lastInterestSettledAt,lastVipSettledAt:f(i.lastVipSettledAt)||t.lastVipSettledAt,createdAt:f(i.createdAt)||e,updatedAt:e}}function te(n){return{nickname:n.nickname||"",balance:Math.max(0,f(n.balance)),fixed:n.fixed||{},loanPrincipal:Math.max(0,f(n.loanPrincipal)),loanInterest:Math.max(0,f(n.loanInterest)),creditScore:se(n.creditScore),creditGrade:dt(n.creditScore),insurances:n.insurances||{},investments:n.investments||{},vipScore:se(n.vipScore),vipTier:n.vipTier||"NORMAL",vipVaultBalance:Math.max(0,f(n.vipVaultBalance)),lastInterestSettledAt:f(n.lastInterestSettledAt),lastVipSettledAt:f(n.lastVipSettledAt)||f(n.lastInterestSettledAt),createdAt:f(n.createdAt),updatedAt:Date.now()}}function vr(n,e){const t=f(n.lastInterestSettledAt)||e,i=Math.max(0,e-t),s=i/864e5,r=s>0?Math.floor(x(n.balance)*_r*s):0,o=s>0?Math.floor(x(n.loanPrincipal)*mr*s):0,a=f(n.lastVipSettledAt)||t,l=Math.max(0,e-a)/864e5,c=ac(n.vipTier)||nc,d=l>0?Math.floor(x(n.vipVaultBalance)*c*l):0,u={...n};return(r>0||o>0)&&(u.balance=Math.max(0,f(n.balance)+r),u.loanInterest=Math.max(0,f(n.loanInterest)+o),u.lastInterestSettledAt=e),d>0&&(u.vipVaultBalance=Math.max(0,f(n.vipVaultBalance)+d),u.lastVipSettledAt=e),{bank:u,freeInt:r,loanInt:o,vipInt:d,elapsed:i}}function $t(n){return Object.values(n.fixed||{}).reduce((e,t)=>e+f(t&&t.amount),0)}function yr(n){const e=Date.now();return Object.values(n.investments||{}).reduce((t,i)=>!i||i.status==="settled"?t:t+(e>=x(i.maturesAt)?f(ki(i).amount):f(i.principal)),0)}function Si(n,e){return f(n)+f(e.balance)+$t(e)+f(e.vipVaultBalance)+yr(e)-f(e.loanPrincipal)-f(e.loanInterest)}function Bm(n,e,t){let i=se(n);const s=Si(e,t),r=f(t.loanPrincipal)+f(t.loanInterest);return f(t.loanPrincipal)===0&&(i+=1),s<0&&(i-=5),r>f(e)+f(t.balance)+$t(t)&&(i-=3),se(i)}function $(n,e,t,i,s,r){return{type:n,title:e,amount:f(t),beforeCash:f(i),afterCash:f(s),memo:r||"",createdAt:Date.now()}}async function V(n,e){await Kl(uc(n),e)}function br(n){return{type:n.type||"system",title:n.title||"",body:n.body||"",amount:f(n.amount),relatedId:n.relatedId||"",read:!1,actionLabel:n.actionLabel||"",actionUrl:n.actionUrl||"",createdAt:Date.now()}}async function En(n,e){await Kl(gr(n),br(e))}async function Wm(n,e){await K(Lt(Ye().db,`rooms/${ut}/bank/${n}/messages/${e}`),{read:!0})}async function Hm(n,e){const t={};(e||[]).forEach(i=>{i&&!i.read&&i.id&&(t[`${i.id}/read`]=!0)}),Object.keys(t).length&&await K(gr(n),t)}function hc(n){return(n||[]).filter(e=>e&&!e.read).length}async function Ir(n){Ye();const e=Date.now(),[t,i,s,r]=await Promise.all([kn(Um(n)),kn(Y(n)),kn(Lo(uc(n),Mo(),Do(20))),kn(Lo(gr(n),Mo(),Do(50)))]),o=t.val()||{},a=f(o.cash),l=o.nickname||i.val()&&i.val().nickname||"플레이어";let c=Vm(i.val(),e);const d=!i.exists(),u=c.vipTier;c.nickname||(c.nickname=l);const h=vr(c,e);let p=!1;const g=h.freeInt>0||h.loanInt>0||h.vipInt>0;d?(c=He(c,a),await K(Y(n),te(c))):h.elapsed>=Ql&&g?(c=h.bank,c.creditScore=Bm(c.creditScore,a,c),c=He(c,a),await K(Y(n),te(c)),h.freeInt>0&&await V(n,$("interest","자유예금 이자",h.freeInt,a,a,"")),h.loanInt>0&&await V(n,$("loanInterest","대출 이자",-h.loanInt,a,a,"")),h.vipInt>0&&await V(n,$("vipInterest","VIP 금고 이자",h.vipInt,a,a,"")),p=!0):(c=h.bank,c=He(c,a)),c.creditGrade=dt(c.creditScore);const E=s.exists()?Object.entries(s.val()).map(([B,pe])=>({id:B,...pe})).sort((B,pe)=>x(pe.createdAt)-x(B.createdAt)):[];let A=r.exists()?Object.entries(r.val()).map(([B,pe])=>({id:B,...pe})).sort((B,pe)=>x(pe.createdAt)-x(B.createdAt)):[];A=await jm(n,c,u,A,e);const ce=Object.values(c.fixed||{}).filter(B=>e>=x(B.maturesAt)).length,ve=Object.values(c.investments||{}).filter(B=>B&&B.status!=="settled"&&e>=x(B.maturesAt)).length,ye={freeInt:h.freeInt,loanInt:h.loanInt,vipInt:h.vipInt,maturedFixed:ce,maturedInvest:ve,applied:p};return{uid:n,cash:a,nickname:l,bank:c,tx:E,msgs:A,unread:hc(A),feed:ye,settledNow:p}}async function jm(n,e,t,i,s){const r=new Set((i||[]).map(c=>c.relatedId).filter(Boolean)),o=[],a=async c=>{if(c.relatedId&&r.has(c.relatedId))return;c.relatedId&&r.add(c.relatedId);const d=br(c);await En(n,c),o.push({id:"local-"+Math.random().toString(36).slice(2),...d})},l={};for(const c of Object.values(e.insurances||{}))c&&c.status==="active"&&x(c.expiresAt)<=s&&(c.status="expired",l[`insurances/${c.id}/status`]="expired",await a({type:"insurance",title:"보험 만료",body:`${c.title}이(가) 만료되었습니다.`,relatedId:"insexp-"+c.id}));Object.keys(l).length&&await K(Y(n),l);for(const c of Object.values(e.fixed||{}))c&&s>=x(c.maturesAt)&&await a({type:"fixed",title:"정기예금 만기 도착",body:`${c.title||c.label} 수령이 가능합니다.`,relatedId:"fixmat-"+c.id,actionLabel:"예금 탭에서 수령",actionUrl:""});for(const c of Object.values(e.investments||{}))if(c&&c.status!=="settled"&&s>=x(c.maturesAt)){const d=ki(c);await a({type:"investment",title:"투자상품 만기 도착",body:`${c.title} 만기 · 예상 ${(d.rate*100).toFixed(1)}%. 수령이 가능합니다.`,relatedId:"invmat-"+c.id})}return un(e.vipTier)>un(t)&&(await a({type:"vip",title:"VIP 등급 상승",body:`${yt(e.vipTier)} 등급으로 승급했습니다.${e.vipTier==="GOLD"?" VIP 금고가 해금되었습니다.":""}`,relatedId:"viptier-"+e.vipTier}),await V(n,$("vip_tier_up","VIP 등급 상승",0,0,0,`${yt(t)} → ${yt(e.vipTier)}`))),o.length?[...o,...i||[]].sort((c,d)=>x(d.createdAt)-x(c.createdAt)):i}async function le(n,e,t){const i=Date.now(),s=vr(e,i);return(s.freeInt>0||s.loanInt>0)&&(s.freeInt>0&&await V(n,$("interest","자유예금 이자",s.freeInt,t,t,"")),s.loanInt>0&&await V(n,$("loanInterest","대출 이자",-s.loanInt,t,t,""))),s.bank}function ii(n,e,t){return n.creditScore=se(n.creditScore+e),n.creditGrade=dt(n.creditScore),n}async function fc(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");let i=await le(n,{...t.bank},t.cash),s=0;const r=f(t.cash),o=await oe(ae(n),c=>{const d=c==null?r:f(c);if(s=Math.min(e,d),!(s<=0))return d-s});if(!o.committed||s<=0)throw new Error("보유 현금이 없습니다.");const a=f((o.snapshot&&o.snapshot.val())??t.cash)+s,l=a-s;return i.balance=Math.max(0,f(i.balance)+s),await K(Y(n),te(i)),await V(n,$("deposit","자유예금 입금",s,a,l,"")),s<e?`입금 완료 (가용 현금 ${q(s)})`:"입금 완료"}async function pc(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");if(e>f(t.bank.balance))throw new Error("예금 잔액이 부족합니다.");let i=await le(n,{...t.bank},t.cash);e>f(i.balance)&&(e=f(i.balance)),i.balance=Math.max(0,f(i.balance)-e),await K(Y(n),te(i));const s=f(t.cash);return await oe(ae(n),r=>f(r)+e),await V(n,$("withdraw","자유예금 출금",e,s,s+e,"")),"출금 완료"}async function _c(n,e,t,i){const s=Jl[e];if(!s)throw new Error("상품을 선택하세요.");if(t=f(t),t<=0)throw new Error("금액을 확인하세요.");if(t>f(i.cash))throw new Error("보유 현금이 부족합니다.");let r=await le(n,{...i.bank},i.cash);const o=f(i.cash);if(!(await oe(ae(n),u=>{const h=u==null?o:f(u);if(!(h<t))return h-t})).committed)throw new Error("보유 현금이 부족합니다.");const l=Date.now(),c="f"+l.toString(36);r.fixed=r.fixed||{},r.fixed[c]={id:c,product:e,label:s.label,amount:t,rate:s.rate,startedAt:l,maturesAt:l+s.ms},await K(Y(n),te(r));const d=f(i.cash);return await V(n,$("fixedOpen",`${s.label} 가입`,t,d,d-t,"")),`${s.label} 가입 완료`}async function mc(n,e,t){let i=await le(n,{...t.bank},t.cash);const s=i.fixed&&i.fixed[e];if(!s)throw new Error("정기예금을 찾을 수 없습니다.");const r=f(s.amount);delete i.fixed[e],await K(Y(n),te(i));const o=f(t.cash);return await oe(ae(n),a=>f(a)+r),await V(n,$("fixedCancel",`${s.label} 중도해지 (이자 미지급)`,r,o,o+r,"만기 전 해지")),"중도해지 — 원금만 반환되었습니다."}async function gc(n,e,t){let i=await le(n,{...t.bank},t.cash);const s=i.fixed&&i.fixed[e];if(!s)throw new Error("정기예금을 찾을 수 없습니다.");if(Date.now()<f(s.maturesAt))throw new Error("아직 만기가 되지 않았습니다.");const r=f(s.amount),o=Math.floor(r*x(s.rate)),a=r+o;delete i.fixed[e],i=ii(i,1,t.cash),await K(Y(n),te(i));const l=f(t.cash);return await oe(ae(n),c=>f(c)+a),await V(n,$("fixedClaim",`${s.label} 만기수령 (원금+이자)`,a,l,l+a,`이자 ${q(o)}`)),await En(n,{type:"fixed",title:"정기예금 수령 완료",body:`${s.label} ${q(a)}을(를) 수령했습니다. (이자 ${q(o)})`,amount:a,relatedId:"fixclaim-"+e}),`만기 수령 완료 (+${q(o)} 이자)`}async function vc(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");let i=await le(n,{...t.bank},t.cash);const s=dt(i.creditScore),r=cc(s),o=f(i.loanPrincipal);if(r<=0)throw new Error("현재 신용등급(F)으로는 대출이 불가합니다.");if(o+e>r)throw new Error(`대출 한도 초과 (한도 ${q(r)}, 현재 잔액 ${q(o)})`);i.loanPrincipal=o+e;const a=Ai(i).find(c=>c.type==="loan");i=ii(i,a?-1:-3,t.cash),a&&(i.insurances[a.id].status="used",i.insurances[a.id].usedAt=Date.now()),await K(Y(n),te(i));const l=f(t.cash);return await oe(ae(n),c=>f(c)+e),await V(n,$("loan","대출 실행",e,l,l+e,`잔액 ${q(i.loanPrincipal)}${a?" · 유예권 적용":""}`)),a&&(await V(n,$("insurance_used","대출 유예권 적용",0,l,l,"신용점수 하락 완화(-3 → -1)")),await En(n,{type:"insurance",title:"대출 유예권 사용됨",body:"대출 실행 시 신용점수 하락이 완화되었습니다.",relatedId:"insused-"+a.id})),`대출 완료 (+${q(e)})${a?" · 유예권으로 신용 하락 완화":""}`}async function ys(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");if(e>f(t.cash))throw new Error("보유 현금이 부족합니다.");let i=await le(n,{...t.bank},t.cash);const s=f(i.loanPrincipal)+f(i.loanInterest);if(s<=0)throw new Error("상환할 대출이 없습니다.");const r=Math.min(e,s),o=f(t.cash);if(!(await oe(ae(n),p=>{const g=p==null?o:f(p);if(!(g<r))return g-r})).committed)throw new Error("보유 현금이 부족합니다.");let l=r;const c=Math.min(l,f(i.loanInterest));i.loanInterest=Math.max(0,f(i.loanInterest)-c),l-=c;const d=Math.min(l,f(i.loanPrincipal));i.loanPrincipal=Math.max(0,f(i.loanPrincipal)-d);const u=i.loanPrincipal<=0;u?(i.loanInterest=0,i=ii(i,5,t.cash)):i=ii(i,1,t.cash),await K(Y(n),te(i));const h=f(t.cash);return await V(n,$("repay",u?"대출 전액 상환":"대출 상환",-r,h,h-r,`이자 ${q(c)} · 원금 ${q(d)}`)),u?"전액 상환 완료 🎉":`상환 완료 (이자 ${q(c)} · 원금 ${q(d)})`}function yc(n){n=se(n);let e="NORMAL";for(const t of cn)n>=tc[t]&&(e=t);return e}function yt(n){return{NORMAL:"일반",SILVER:"실버",GOLD:"골드",PLATINUM:"플래티넘",BLACK:"블랙"}[n]||"일반"}function He(n,e){const t={...n},i=f(n.balance)+$t(n)+f(n.vipVaultBalance),s=Si(e,n);let r=0;return r+=Math.min(40,Math.floor(i/25e5)),r+=Math.min(25,Math.floor(Math.max(0,s)/4e6)),r+=Object.keys(n.fixed||{}).length?8:0,r+=Object.keys(n.investments||{}).length?8:0,r+=Object.keys(n.insurances||{}).length?5:0,r+=f(n.loanPrincipal)===0?6:0,r+=Math.min(8,se(n.creditScore)>=75?8:0),t.vipScore=se(r),t.vipTier=yc(t.vipScore),t}function Gm(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Uo(n){let e=(Gm(String(n))||1)>>>0;return e^=e<<13,e>>>=0,e^=e>>17,e^=e<<5,e>>>=0,e%1e5/1e5}function wr(n){return ec[n]||lc[n]||null}function ki(n){const e=wr(n.productType)||{min:x(n.expectedMinRate),max:x(n.expectedMaxRate)},t=Uo(n.seed),i=Uo(n.seed+"x"),s=(t+i)/2,r=.45,o=e.min+(e.max-e.min)*(s*(1-r)+r*.5+(s-.5)*r),a=Math.max(e.min,Math.min(e.max,o)),l=f(n.principal),c=Math.max(0,Math.round(l*(1+a)));return{rate:a,amount:c,profit:c-l}}function bc(n){return n>=.25?["대박","win"]:n>=.05?["성공","ok"]:n>-.02?["보합","flat"]:n>-.2?["손실","lose"]:["폭락","crash"]}function qm(n,e){if(Si(n,e)<0)return{key:"severe",label:"심각",tone:"danger"};const i=f(e.loanPrincipal)+f(e.loanInterest);if(i<=0)return{key:"safe",label:"안전",tone:"ok"};const s=f(n)+f(e.balance)+$t(e)+f(e.vipVaultBalance)+yr(e),r=s>0?i/s:1;let o=r<.3?{key:"ok",label:"관리 가능",tone:"ok"}:r<.7?{key:"warn",label:"주의",tone:"warn"}:{key:"high",label:"위험",tone:"danger"};return Ai(e).some(a=>a.type==="loan")&&(o.key==="high"?o={key:"warn",label:"주의",tone:"warn"}:o.key==="warn"&&(o={key:"ok",label:"관리 가능",tone:"ok"}),o.eased=!0),o.ratio=r,o}function zm(n,e){const t=f(e.balance)+$t(e)+f(e.vipVaultBalance);if(t<=0)return{label:"미이용",tone:"muted"};const i=[];return Object.keys(e.fixed||{}).length&&i.push("장기 예치 중"),t>f(n)&&i.push("보수적 운용"),i.unshift("안정 자산 보유"),{label:i.join(" · "),tone:"ok"}}function Ic(n,e){return n&&n.status!=="expired"&&x(n.expiresAt)>(e||Date.now())}function Ai(n,e){return e=e||Date.now(),Object.values(n.insurances||{}).filter(t=>Ic(t,e))}async function Km(n,e,t){const i=Zl[e];if(!i)throw new Error("보험 상품을 선택하세요.");let s=await le(n,{...t.bank},t.cash);const r=Date.now();if(Ai(s,r).some(g=>g.type===e))throw new Error("이미 가입 중인 보험입니다.");const o=t.bank.vipTier||"NORMAL",a=oc(o),l=Math.max(1,Math.floor(i.premium*(1-a)));if(l>f(t.cash))throw new Error("보유 현금이 부족합니다.");const c=f(t.cash);if(!(await oe(ae(n),g=>{const E=g==null?c:f(g);if(!(E<l))return E-l})).committed)throw new Error("보유 현금이 부족합니다.");const u="ins"+r.toString(36);s.insurances=s.insurances||{},s.insurances[u]={id:u,type:e,title:i.title,premium:l,basePremium:i.premium,status:"active",startedAt:r,expiresAt:r+i.ms,usedAt:0,createdAt:r},s=He(s,t.cash),await K(Y(n),te(s));const h=f(t.cash),p=a>0?`VIP ${yt(o)} 할인 ${Math.round(a*100)}% 적용`:"";return await V(n,$("insurance_buy",`${i.title} 가입`,-l,h,h-l,p)),await En(n,{type:"insurance",title:"보험 가입 완료",body:`${i.title}에 가입했습니다.${p?" ("+p+")":""}`,amount:-l,relatedId:"insbuy-"+u}),`${i.title} 가입 완료${a>0?` · ${Math.round(a*100)}% 할인`:""}`}async function Ym(n,e,t,i){const s=wr(e);if(!s)throw new Error("투자상품을 선택하세요.");if(s.requiredVipTier&&un(i.bank.vipTier)<un(s.requiredVipTier))throw new Error(`${yt(s.requiredVipTier)} 등급부터 가입 가능한 상품입니다.`);if(t=f(t),t<=0)throw new Error("금액을 확인하세요.");if(t>f(i.cash))throw new Error("보유 현금이 부족합니다.");let r=await le(n,{...i.bank},i.cash);const o=f(i.cash);if(!(await oe(ae(n),h=>{const p=h==null?o:f(h);if(!(p<t))return p-t})).committed)throw new Error("보유 현금이 부족합니다.");const l=Date.now(),c="inv"+l.toString(36),d=n+":"+c+":"+l;r.investments=r.investments||{},r.investments[c]={id:c,productType:e,title:s.title,principal:t,expectedMinRate:s.min,expectedMaxRate:s.max,status:"active",seed:d,startedAt:l,maturesAt:l+s.ms,resultRate:null,resultAmount:null,settledAt:0,createdAt:l},r=He(r,i.cash),await K(Y(n),te(r));const u=f(i.cash);return await V(n,$("investment_buy",`${s.title} 가입`,-t,u,u-t,`위험도 ${s.risk}`)),`${s.title} 가입 완료`}async function Qm(n,e,t){let i=await le(n,{...t.bank},t.cash);const s=i.investments&&i.investments[e];if(!s)throw new Error("투자상품을 찾을 수 없습니다.");if(Date.now()<x(s.maturesAt))throw new Error("아직 만기가 되지 않았습니다.");if(s.status==="settled")throw new Error("이미 정산된 상품입니다.");const r=ki(s);delete i.investments[e],i=He(i,t.cash),await K(Y(n),te(i));const o=f(t.cash);await oe(ae(n),l=>f(l)+r.amount);const[a]=bc(r.rate);return await V(n,$("investment_settle",`${s.title} 정산 · ${a}`,r.amount,o,o+r.amount,`${(r.rate*100).toFixed(1)}%`)),await En(n,{type:"investment",title:"투자 정산 완료",body:`${s.title} 정산: ${q(r.amount)} 수령 (${(r.rate*100).toFixed(1)}%, ${a})`,amount:r.amount,relatedId:"invsettle-"+e}),`${a}! ${r.profit>=0?"+":"−"}${q(Math.abs(r.profit))} (${(r.rate*100).toFixed(1)}%)`}function wc(n){return cn.indexOf(n.vipTier||"NORMAL")>=cn.indexOf(ic)}async function Jm(n,e,t){if(!wc(t.bank))throw new Error("VIP 금고는 GOLD 등급부터 이용 가능합니다.");if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");let i=await le(n,{...t.bank},t.cash),s=0;const r=f(t.cash);if(!(await oe(ae(n),l=>{const c=l==null?r:f(l);if(s=Math.min(e,c),!(s<=0))return c-s})).committed||s<=0)throw new Error("보유 현금이 없습니다.");i.vipVaultBalance=Math.max(0,f(i.vipVaultBalance)+s),i=He(i,t.cash),await K(Y(n),te(i));const a=f(t.cash);return await V(n,$("vip_deposit","VIP 금고 입금",s,a,a-s,"")),s<e?`VIP 금고 입금 (가용 ${q(s)})`:"VIP 금고 입금 완료"}async function Xm(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");if(e>f(t.bank.vipVaultBalance))throw new Error("VIP 금고 잔액이 부족합니다.");let i=await le(n,{...t.bank},t.cash);e>f(i.vipVaultBalance)&&(e=f(i.vipVaultBalance)),i.vipVaultBalance=Math.max(0,f(i.vipVaultBalance)-e),i=He(i,t.cash),await K(Y(n),te(i));const s=f(t.cash);return await oe(ae(n),r=>f(r)+e),await V(n,$("vip_withdraw","VIP 금고 출금",e,s,s+e,"")),"VIP 금고 출금 완료"}const Zm=Object.freeze(Object.defineProperty({__proto__:null,FIXED_PRODUCTS:Jl,FREE_RATE_DAY:_r,INIT_CREDIT:ln,INSURANCE_PRODUCTS:Zl,INVESTMENT_PRODUCTS:ec,LOAN_LIMIT_BY_GRADE:Xl,LOAN_RATE_DAY:mr,MIN_AUTOSETTLE_MS:Ql,ROOM:ut,VIP_DISCOUNT:sc,VIP_INVESTMENT_PRODUCTS:lc,VIP_TIERS:cn,VIP_TIER_MIN:tc,VIP_VAULT_MIN_TIER:ic,VIP_VAULT_RATE_BY_TIER:rc,VIP_VAULT_RATE_DAY:nc,activeInsurances:Ai,buyInsurance:Km,buyInvestment:Ym,cancelFixed:mc,claimFixed:gc,claimInvestment:Qm,clampScore:se,defaultBank:dc,depositFree:fc,depositStability:zm,depositVip:Jm,fixedTotal:$t,gradeFromScore:dt,insuranceActive:Ic,int:f,investLabel:bc,investOutcome:ki,investProduct:wr,investmentsValue:yr,loadState:Ir,loanLimit:cc,loanRisk:qm,markAllMessagesRead:Hm,markMessageRead:Wm,msgItem:br,netWorth:Si,num:x,openFixed:_c,repayLoan:ys,settleInterest:vr,takeLoan:vc,txItem:$,unreadCount:hc,vipDiscount:oc,vipRank:un,vipTierFromScore:yc,vipTierLabel:yt,vipVaultRate:ac,vipVaultUnlocked:wc,withdrawFree:pc,withdrawVip:Xm,won:q},Symbol.toStringTag,{value:"Module"})),{won:b,int:M,num:F,fixedTotal:Ec,netWorth:Tc,gradeFromScore:Ri,loanLimit:Er,FIXED_PRODUCTS:eg,INSURANCE_PRODUCTS:Cc,INVESTMENT_PRODUCTS:tg,VIP_INVESTMENT_PRODUCTS:ng,investmentsValue:ig,investOutcome:Sc,investLabel:sg,loanRisk:rg,depositStability:og,activeInsurances:ag,insuranceActive:zi,buyInsurance:lg,buyInvestment:cg,claimInvestment:ug,vipTierLabel:kt,vipVaultUnlocked:kc,depositVip:dg,withdrawVip:hg,VIP_VAULT_RATE_DAY:fg,vipDiscount:pg,vipVaultRate:_g,vipRank:si,markMessageRead:mg,markAllMessagesRead:gg,unreadCount:vg}=Zm,yg="yaV8N60yIiUggaWNpNF2VhkCwxb2",bg="tomem@naver.com",W=document.getElementById("app");let m=null,Ac=!1,ri="dashboard",Ht="all",Ki=!1,Vo=!1;Ig();async function Ig(){if(!Om){Bo("Firebase 설정이 비어 있습니다.");return}Eg();let n=null;try{n=await xm()}catch{}if(!n){Fm({message:"STONK Home에서 로그인 후 이용해 주세요. 같은 계정의 자산이 그대로 연결됩니다."}),Tg();return}try{Ac=n.uid===yg||String(n.email||"").toLowerCase()===bg,m=await Ir(n.uid),Xe(),Ag()}catch(e){console.error("[bank] 로드 실패:",e),Bo("은행 데이터를 불러오지 못했습니다: "+(e&&e.message))}}async function wg(){if(m){try{m=await Ir(m.uid)}catch(n){console.warn(n)}Xe()}}function P(n){return String(n??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function oi(n,e="ok"){const t=document.createElement("div");t.className="bk-toast "+e,t.textContent=n,document.body.appendChild(t),setTimeout(()=>{t.classList.add("hide"),setTimeout(()=>t.remove(),280)},2200)}async function ne(n){if(!Ki){Ki=!0;try{const e=await n();e&&oi(e,"ok"),await wg()}catch(e){oi(e&&e.message||"오류가 발생했습니다.","err")}finally{Ki=!1}}}function Ne(n){const e=document.getElementById(n);return e?Math.floor(Number(e.value)||0):0}function Eg(){W.innerHTML='<div class="bk-center"><div class="bk-spin"></div><p>STONK Bank 연결 중…</p></div>'}function Bo(n){W.innerHTML=`<div class="bk-center"><h2>⚠️ 오류</h2><p>${P(n)}</p><a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로</a></div>`}function Tg(){W.innerHTML=`<div class="bk-center">
    <div class="bk-logo"><span class="bk-mark">$</span><b>STONK</b> Bank</div>
    <h2>로그인이 필요합니다</h2>
    <p class="muted">STONK Home에서 로그인 후 이용해 주세요.<br>같은 계정의 보유 현금이 그대로 연결됩니다.</p>
    <a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로 이동</a>
  </div>`}function Rc(n){return`<span class="bk-grade g-${n}">${n}</span>`}function Xe(){if(!m)return;const n=m.bank,e=M(n.balance)+Ec(n),t=Tc(m.cash,n),i=Ri(n.creditScore);W.className=n.vipTier==="BLACK"?"is-black":"",W.innerHTML=`
    <header class="bk-header">
      <a class="bk-brand" href="#" data-home title="STONK Bank 메인"><span class="bk-mark">$</span><b>STONK</b> Bank</a>
      <div class="bk-nav">
        <a href="../STONK-Home/index.html">홈</a>
        <a href="../STONK-Battle/index.html">주식시장</a>
        <a href="../STONK-Board/index.html">주식소식</a>
        <a href="../STONK-Wiki/index.html">주식정보</a>
        <a href="../STONK-Arcade/index.html">아케이드</a>
        <a href="../STONK-Gacha/index.html">가챠</a>
        ${Ac?'<a href="../STONK-Admin/market-admin.html">관리자</a>':""}
      </div>
      <div class="bk-user">
        <button class="bk-bell" type="button" data-tab="messages" title="알림/우편함" aria-label="알림">🔔${m.unread>0?`<span class="bk-bell-dot">${m.unread>99?"99+":m.unread}</span>`:""}</button>
        <span class="bk-nick">${P(m.nickname)}</span>${ai(n.vipTier)}${Rc(i)}
      </div>
    </header>

    <section class="bk-summary">
      <div class="bk-sum-card net"><span>순자산</span><b class="${t<0?"minus":""}">${b(t)}</b></div>
      <div class="bk-sum-card cash"><span>보유 현금</span><b>${b(m.cash)}</b></div>
      <div class="bk-sum-card dep"><span>총 예금</span><b>${b(e)}</b></div>
      <div class="bk-sum-card loan"><span>대출 잔액</span><b class="${M(n.loanPrincipal)>0?"warn":""}">${b(n.loanPrincipal)}</b></div>
    </section>

    <nav class="bk-tabs">
      ${["dashboard:대시보드","deposit:예금","loan:대출","insurance:보험","invest:투자","vip:VIP","messages:알림","history:거래내역"].map(s=>{const[r,o]=s.split(":");return`<button class="bk-tab ${ri===r?"active":""}" data-tab="${r}">${o}</button>`}).join("")}
    </nav>

    <main class="bk-main">${Cg(ri)}</main>
    <footer class="bk-footer">모든 금액은 STONK 가상 게임머니입니다. 실제 화폐·투자와 무관합니다.</footer>
  `,Hg()}function Cg(n){return n==="deposit"?Og():n==="loan"?xg():n==="insurance"?Fg():n==="invest"?Ug():n==="vip"?Bg():n==="messages"?kg():n==="history"?Mg():Ng()}const Sg={insurance:"🛡️",investment:"📈",fixed:"🏦",vip:"👑",loan:"⚠️",admin:"🛠️",system:"🔔"};function Nc(n){const e=Sg[n.type]||"🔔";return`<li class="bk-msg ${n.read?"":"unread"}" ${n.id&&!String(n.id).startsWith("local-")?`data-msgread="${P(n.id)}"`:""}>
    <span class="bk-msg-ico">${e}</span>
    <div class="bk-msg-mid"><b>${P(n.title)}</b><small>${P(n.body)}</small><i class="bk-msg-time">${Tr(n.createdAt)}</i></div>
    ${n.actionUrl?`<a class="bk-btn ghost small" href="${P(n.actionUrl)}">${P(n.actionLabel||"이동")}</a>`:""}
    ${n.read?"":'<span class="bk-msg-new">N</span>'}</li>`}function kg(){const n=(m.msgs||[]).slice(0,30);return`<div class="bk-card">
    <h3>알림 / 우편함 <small class="muted">안읽음 ${m.unread||0} · 최근 ${n.length}건</small>
      ${m.unread>0?'<button class="bk-btn ghost small" data-allread style="float:right">전체 읽음</button>':""}</h3>
    ${n.length?`<ul class="bk-msgs">${n.map(Nc).join("")}</ul>`:'<p class="bk-empty">받은 알림이 없습니다.</p>'}
    <p class="bk-note">보험 적용·투자/정기 만기·VIP 승급 등 금융 이벤트가 여기에 기록됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p>
  </div>`}function Ag(){if(Vo||!m||!m.feed)return;Vo=!0;const n=m.feed,e=[];n.applied&&n.freeInt>0&&e.push(`자유예금 이자 +${b(n.freeInt)} 정산`),n.applied&&n.vipInt>0&&e.push(`VIP 금고 이자 +${b(n.vipInt)} 정산`),n.applied&&n.loanInt>0&&e.push(`대출 이자 +${b(n.loanInt)} 반영`),n.maturedFixed>0&&e.push(`정기예금 만기 ${n.maturedFixed}건`),n.maturedInvest>0&&e.push(`투자 정산 가능 ${n.maturedInvest}건`),e.length&&oi(e.join(" · "),n.loanInt>0&&!n.freeInt?"warn":"ok")}function Rg(){const n=m.feed;if(!n)return"";const e=[];return n.applied&&n.freeInt>0&&e.push(`<span class="ok">자유예금 이자 +${b(n.freeInt)}</span>`),n.applied&&n.vipInt>0&&e.push(`<span class="ok">VIP 금고 이자 +${b(n.vipInt)}</span>`),n.applied&&n.loanInt>0&&e.push(`<span class="warn">대출 이자 +${b(n.loanInt)}</span>`),n.maturedFixed>0&&e.push(`<span>정기예금 만기 ${n.maturedFixed}건</span>`),n.maturedInvest>0&&e.push(`<span>투자 정산 가능 ${n.maturedInvest}건</span>`),e.length?`<div class="bk-feed">🔔 ${e.join(" · ")}</div>`:""}function Ng(){const n=m.bank,e=Ri(n.creditScore),t=se(n.creditScore),i=Tc(m.cash,n),s=rg(m.cash,n),r=og(m.cash,n),o=m.feed||{},a=o.applied?M(o.freeInt)+M(o.vipInt):0,l=Object.values(n.investments||{}),c=l.filter(p=>Date.now()>=F(p.maturesAt)).length,d=l.reduce((p,g)=>p+(Date.now()>=F(g.maturesAt)?Sc(g).profit:0),0),u=ag(n),h=(m.tx||[]).slice(0,3);return`
    ${Rg()}
    <div class="bk-grid">
      <div class="bk-card net-hero">
        <h3>순자산</h3>
        <div class="bk-net-big ${i<0?"minus":""}">${b(i)}</div>
        <div class="bk-chips">
          <span class="bk-chip"><i>현금</i>${b(m.cash)}</span>
          <span class="bk-chip"><i>예금</i>${b(M(n.balance)+Ec(n))}</span>
          <span class="bk-chip"><i>VIP금고</i>${b(n.vipVaultBalance)}</span>
          <span class="bk-chip"><i>투자</i>${b(ig(n))}</span>
          <span class="bk-chip ${M(n.loanPrincipal)>0?"warn":""}"><i>대출</i>${b(M(n.loanPrincipal)+M(n.loanInterest))}</span>
        </div>
      </div>

      <div class="bk-card credit">
        <h3>신용등급 <span class="bk-tag ${t>=75?"safe":"risk"}">${e}</span></h3>
        <div class="bk-credit"><div class="bk-grade-big g-${e}">${e}</div><div class="bk-score"><div class="bk-score-bar"><span style="width:${t}%"></span></div><small>${t} / 100 · 한도 ${b(Er(e))}</small></div></div>
        <div class="bk-row"><span>VIP 등급</span><b>${ai(n.vipTier)} <small class="muted">${n.vipScore}점</small></b></div>
      </div>

      <div class="bk-card">
        <h3>리스크 진단</h3>
        <div class="bk-row"><span>대출 위험도</span><b>${Pg(s.label,s.tone)}${s.eased?' <small class="muted">유예권 적용</small>':""}</b></div>
        <div class="bk-row"><span>예금 안정도</span><b class="${r.tone==="ok"?"ok":"muted"}">${r.label}</b></div>
        <div class="bk-row"><span>오늘 정산 이자</span><b class="${a>0?"ok":"muted"}">${a>0?"+"+b(a):"정산 없음"}</b></div>
        ${s.key==="high"||s.key==="severe"?'<p class="bk-note danger">자산 대비 대출 비중이 높습니다. 상환을 권장합니다.</p>':""}
      </div>

      <div class="bk-card">
        <h3>보험 <span class="bk-tag safe">${u.length}건 유효</span></h3>
        ${u.length?u.map(p=>`<div class="bk-row"><span>${P(p.title)}</span><b class="ok">유효</b></div>`).join(""):'<p class="bk-empty">가입한 보험이 없습니다.</p>'}
        <button class="bk-btn ghost small" data-tab="insurance">보험 보기</button>
      </div>

      <div class="bk-card">
        <h3>투자상품</h3>
        <div class="bk-row"><span>보유 상품</span><b>${l.length}건</b></div>
        <div class="bk-row"><span>정산 가능</span><b class="${c>0?"ok":"muted"}">${c}건</b></div>
        <div class="bk-row"><span>정산 가능 평가손익</span><b class="${d>0?"ok":d<0?"warn":"muted"}">${d>=0?"+":"−"}${b(Math.abs(d))}</b></div>
        <button class="bk-btn ghost small" data-tab="invest">투자 보기</button>
      </div>

      <div class="bk-card">
        <h3>VIP</h3>
        <div class="bk-row"><span>등급 / 점수</span><b>${ai(n.vipTier)} ${n.vipScore}점</b></div>
        <div class="bk-row"><span>VIP 금고</span><b>${b(n.vipVaultBalance)} <small class="muted">${kc(n)?"":"· 잠금"}</small></b></div>
        <button class="bk-btn ghost small" data-tab="vip">VIP 보기</button>
      </div>

      <div class="bk-card">
        <h3>알림 <span class="bk-tag ${m.unread>0?"risk":"safe"}">안읽음 ${m.unread||0}</span><button class="bk-btn ghost small" data-tab="messages" style="float:right">전체 보기</button></h3>
        ${(m.msgs||[]).length?`<ul class="bk-msgs mini">${(m.msgs||[]).slice(0,3).map(Nc).join("")}</ul>`:'<p class="bk-empty">받은 알림이 없습니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>최근 거래 <button class="bk-btn ghost small" data-tab="history" style="float:right">전체 보기</button></h3>
        ${h.length?`<ul class="bk-tx mini">${h.map(Pc).join("")}</ul>`:'<p class="bk-empty">거래내역이 없습니다.</p>'}
      </div>
    </div>`}function Pg(n,e){return`<span class="bk-status ${e}">${P(n)}</span>`}function ai(n){return`<span class="bk-vip v-${n||"NORMAL"}">${P(kt(n))}</span>`}function Og(){const n=m.bank,e=Object.values(n.fixed||{}).sort((i,s)=>F(i.maturesAt)-F(s.maturesAt)),t=Date.now();return`
    <div class="bk-grid">
      <div class="bk-card">
        <h3>자유예금 <span class="bk-tag safe">자유 입출금</span></h3>
        <div class="bk-row"><span>예금 잔액</span><b>${b(n.balance)}</b></div>
        <div class="bk-amount">
          <input id="freeAmt" type="number" inputmode="numeric" placeholder="금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick">
          <button class="bk-btn ghost" data-fill="freeAmt:maxin">최대 입금</button>
          <button class="bk-btn ghost" data-fill="freeAmt:maxout">최대 출금</button>
        </div>
        <div class="bk-btnrow">
          <button class="bk-btn primary" data-act="deposit">입금하기</button>
          <button class="bk-btn" data-act="withdraw">출금하기</button>
        </div>
        <p class="bk-note">보유 현금 ${b(m.cash)} · 이자 하루 ${(_r*100).toFixed(1)}%</p>
      </div>

      <div class="bk-card">
        <h3>정기예금 <span class="bk-tag safe">묶을수록 이자↑</span></h3>
        ${Object.values(eg).map(i=>`
          <label class="bk-product"><input type="radio" name="fixedProd" value="${i.id}" ${i.id==="d1"?"checked":""}/><span><b>${i.label}</b><small>${i.desc}</small></span></label>`).join("")}
        <div class="bk-amount">
          <input id="fixedAmt" type="number" inputmode="numeric" placeholder="가입 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <button class="bk-btn primary" data-act="openFixed">정기예금 가입</button>
        <p class="bk-note">만기 전 해지 시 <b>원금만</b> 반환됩니다(이자 미지급).</p>
      </div>
    </div>

    <div class="bk-card">
      <h3>보유 정기예금</h3>
      ${e.length?`<div class="bk-fixedlist">${e.map(i=>{const s=t>=F(i.maturesAt),r=Math.max(0,F(i.maturesAt)-t),o=Math.floor(M(i.amount)*F(i.rate));return`<div class="bk-fixed ${s?"matured":""}">
          <div><b>${P(i.label)}</b><small>${b(i.amount)} · 이자 ${b(o)} ${s?"· <span class='ok'>만기 완료</span>":"· 남은 시간 "+li(r)}</small></div>
          <div class="bk-fixed-act">
            ${s?`<button class="bk-btn primary small" data-claim="${P(i.id)}">수령하기</button>`:`<button class="bk-btn small" data-cancel="${P(i.id)}">중도해지</button>`}
          </div>
        </div>`}).join("")}</div>`:'<p class="bk-empty">가입한 정기예금이 없습니다.</p>'}
    </div>`}function xg(){const n=m.bank,e=Ri(n.creditScore),t=Er(e),i=Math.max(0,t-M(n.loanPrincipal));return`
    <div class="bk-grid">
      <div class="bk-card loanbox">
        <h3>대출 받기 <span class="bk-tag risk">위험</span></h3>
        <div class="bk-row"><span>내 등급 / 한도</span><b>${Rc(e)} ${b(t)}</b></div>
        <div class="bk-row"><span>추가 대출 가능</span><b>${b(i)}</b></div>
        <div class="bk-amount">
          <input id="loanAmt" type="number" inputmode="numeric" placeholder="대출 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="loanAmt:maxloan">최대</button></div>
        <button class="bk-btn danger" data-act="loan" ${t<=0?"disabled":""}>대출 받기</button>
        <p class="bk-note danger">이자 하루 ${(mr*100).toFixed(1)}% — 갚지 않으면 빠르게 불어나고 신용등급이 떨어집니다.</p>
      </div>

      <div class="bk-card">
        <h3>상환하기</h3>
        <div class="bk-row"><span>대출 원금</span><b class="${M(n.loanPrincipal)>0?"warn":""}">${b(n.loanPrincipal)}</b></div>
        <div class="bk-row"><span>누적 이자</span><b class="${M(n.loanInterest)>0?"warn":""}">${b(n.loanInterest)}</b></div>
        <div class="bk-row total"><span>상환할 금액</span><b>${b(M(n.loanPrincipal)+M(n.loanInterest))}</b></div>
        <div class="bk-amount">
          <input id="repayAmt" type="number" inputmode="numeric" placeholder="상환 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-btnrow">
          <button class="bk-btn primary" data-act="repay">상환하기</button>
          <button class="bk-btn" data-act="repayAll">전액 상환</button>
        </div>
        <p class="bk-note">상환은 <b>이자부터</b> 갚고 남은 금액으로 원금을 갚습니다. 보유 현금 ${b(m.cash)}</p>
      </div>
    </div>`}const Dg={deposit:["입금","in"],withdraw:["출금","out"],fixedOpen:["정기가입","out"],fixedCancel:["중도해지","in"],fixedClaim:["만기수령","in"],loan:["대출","in"],repay:["상환","out"],interest:["예금이자","in"],loanInterest:["대출이자","out"],vipInterest:["VIP이자","in"],insurance_buy:["보험가입","out"],insurance_expired:["보험만료","out"],insurance_used:["보험사용","in"],investment_buy:["투자가입","out"],investment_settle:["투자정산","in"],investment_cancel:["투자해지","in"],vip_deposit:["VIP입금","in"],vip_withdraw:["VIP출금","out"],vip_tier_up:["VIP승급","in"]},Wo={all:null,deposit:["deposit","withdraw"],fixed:["fixedOpen","fixedCancel","fixedClaim"],loan:["loan","repay"],interest:["interest","loanInterest","vipInterest"],insurance:["insurance_buy","insurance_expired","insurance_used"],invest:["investment_buy","investment_settle","investment_cancel"],vip:["vip_deposit","vip_withdraw","vip_tier_up"]},Yi={all:"전체",deposit:"예금",fixed:"정기예금",loan:"대출",interest:"이자",insurance:"보험",invest:"투자",vip:"VIP"};function Pc(n){const e=Dg[n.type]||[n.type,"in"],t=M(n.amount),i=t>=0?"plus":"minus";return`<li><span class="bk-tx-badge t-${e[1]}">${e[0]}</span>
    <div class="bk-tx-mid"><b>${P(n.title||e[0])}</b><small>${Tr(n.createdAt)}${n.memo?" · "+P(n.memo):""}</small></div>
    <b class="bk-tx-amt ${i}">${t>=0?"+":"−"}${b(Math.abs(t))}</b></li>`}function Mg(){const n=m.tx||[],e=Wo[Ht],t=(e?n.filter(i=>e.includes(i.type)):n).slice(0,50);return`<div class="bk-card">
    <h3>거래내역 <small class="muted">${Yi[Ht]} · ${t.length}건</small></h3>
    <div class="bk-filters">
      ${Object.keys(Wo).map(i=>`<button class="bk-chipbtn ${Ht===i?"active":""}" data-filter="${i}">${Yi[i]}</button>`).join("")}
    </div>
    ${t.length?`<ul class="bk-tx">${t.map(Pc).join("")}</ul>`:`<p class="bk-empty">${Yi[Ht]} 거래내역이 없습니다.</p>`}
  </div>`}const Lg={arcade:"Arcade에서 100만원 이상 손실 시 1회에 한해 손실액의 10%를 환급합니다. (자동 적용)",gacha:"10회 뽑기에서 Epic 이상이 없거나 Common이 8개 이상일 때 Dust 300을 지급합니다. (자동 적용)",loan:"대출 실행 또는 대출 위험도 하락 시 신용점수 하락을 1회 완화합니다. (자동 적용)"};function $g(n,e){return n.status==="used"?'<span class="bk-status ok">사용됨</span>':n.status==="expired"||F(n.expiresAt)<=e?'<span class="bk-status muted">만료</span>':'<span class="bk-status warn">활성</span>'}function Fg(){const n=m.bank,e=Date.now(),t=n.vipTier||"NORMAL",i=pg(t),s=Object.values(n.insurances||{}),r=s.filter(o=>o.status==="used").sort((o,a)=>F(a.usedAt)-F(o.usedAt)).slice(0,3);return`
    <div class="bk-grid">
      ${Object.values(Cc).map(o=>{const a=s.find(c=>c.type===o.id&&zi(c,e)),l=Math.max(1,Math.floor(o.premium*(1-i)));return`<div class="bk-card">
          <h3>${P(o.title)} ${a?'<span class="bk-tag safe">가입중</span>':'<span class="bk-tag risk">게임머니 보호</span>'}</h3>
          <p class="bk-note">${P(Lg[o.id]||o.desc)}</p>
          <div class="bk-row"><span>가입비</span><b>${i>0?`<s class="muted">${b(o.premium)}</s> ${b(l)}`:b(o.premium)}</b></div>
          ${i>0?`<div class="bk-row"><span>VIP 할인</span><b class="ok">${kt(t)} ${Math.round(i*100)}%</b></div>`:""}
          ${a?`<div class="bk-row"><span>만료까지</span><b class="ok">${li(Math.max(0,F(a.expiresAt)-e))}</b></div>
               <button class="bk-btn" disabled>가입 중</button>`:`<button class="bk-btn primary" data-buyins="${o.id}">${b(l)} 가입하기</button>`}
        </div>`}).join("")}
    </div>
    ${r.length?`<div class="bk-card">
      <h3>최근 보험 적용 기록</h3>
      <div class="bk-fixedlist">${r.map(o=>`<div class="bk-fixed matured"><div><b>${P(o.title)}</b><small>${o.usedAt?Tr(o.usedAt)+" 적용됨":"적용됨"}</small></div><span class="bk-status ok">사용됨</span></div>`).join("")}</div>
    </div>`:""}
    <div class="bk-card">
      <h3>내 보험 내역</h3>
      ${s.length?`<div class="bk-fixedlist">${s.sort((o,a)=>F(a.startedAt)-F(o.startedAt)).map(o=>`
        <div class="bk-fixed ${zi(o,e)?"matured":""}">
          <div><b>${P(o.title)}</b><small>${b(o.premium)} · ${zi(o,e)?"만료 "+li(Math.max(0,F(o.expiresAt)-e)):o.status==="used"?"보상 적용 완료":"만료됨"}</small></div>
          ${$g(o,e)}
        </div>`).join("")}</div>`:'<p class="bk-empty">가입 이력이 없습니다.</p>'}
      <p class="bk-note">보험은 손실을 완화/보호하는 <b>게임머니 보호 기능</b>입니다. 무한 증식 수단이 아닙니다.</p>
    </div>`}function Ug(){const n=m.bank,e=Date.now(),t=Object.values(n.investments||{}).sort((i,s)=>F(i.maturesAt)-F(s.maturesAt));return`
    <div class="bk-grid">
      <div class="bk-card">
        <h3>투자상품 가입 <span class="bk-tag risk">원금 손실 가능</span></h3>
        ${[...Object.values(tg),...Object.values(ng)].map(i=>{const s=i.requiredVipTier&&si(n.vipTier)<si(i.requiredVipTier);return`<label class="bk-product ${s?"locked":""}"><input type="radio" name="invProd" value="${i.id}" ${i.id==="stable"?"checked":""} ${s?"disabled":""}/>
            <span><b>${P(i.title)} <small class="bk-risk r-${P(i.risk)}">${P(i.risk)}</small>${i.requiredVipTier?` <small class="bk-tag ${s?"risk":"safe"}">${kt(i.requiredVipTier)} 전용</small>`:""}</b>
            <small>${Wg(i.ms)} · 예상 ${(i.min*100).toFixed(0)}% ~ +${(i.max*100).toFixed(0)}%${s?` · ${kt(i.requiredVipTier)} 등급 필요`:""}</small></span></label>`}).join("")}
        <div class="bk-amount">
          <input id="invAmt" type="number" inputmode="numeric" placeholder="투자 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="invAmt:maxin">최대</button></div>
        <button class="bk-btn primary" data-act="buyInvest">투자하기</button>
        <p class="bk-note">만기 전 해지는 불가합니다. 결과는 가입 시점에 확정되어 새로고침해도 바뀌지 않습니다. 보유 현금 ${b(m.cash)}</p>
      </div>
      <div class="bk-card">
        <h3>안내</h3>
        <p class="bk-note">Battle의 실시간 매매와 달리, 투자상품은 <b>만기 후 자동 정산</b>되는 금융상품입니다. 레버리지 펀드는 손실 폭이 큽니다.</p>
        <p class="bk-note">모든 결과는 STONK 가상 게임머니 기준입니다.</p>
      </div>
    </div>
    <div class="bk-card">
      <h3>보유 투자상품</h3>
      ${t.length?`<div class="bk-fixedlist">${t.map(i=>{const s=e>=F(i.maturesAt),r=s?Sc(i):null,[o,a]=r?sg(r.rate):["",""];return`<div class="bk-fixed ${s?"matured":""}">
          <div><b>${P(i.title)}</b><small>${b(i.principal)} · ${s?`<span class="inv-${a}">${o} ${r.rate>=0?"+":"−"}${b(Math.abs(r.profit))}</span>`:"남은 시간 "+li(Math.max(0,F(i.maturesAt)-e))}</small></div>
          <div class="bk-fixed-act">${s?`<button class="bk-btn primary small" data-claiminv="${P(i.id)}">수령하기</button>`:'<span class="bk-tag">운용중</span>'}</div>
        </div>`}).join("")}</div>`:'<p class="bk-empty">보유한 투자상품이 없습니다.</p>'}
    </div>`}const Vg={NORMAL:["기본 Bank 기능 사용"],SILVER:["보험 가입비 3% 할인","거래내역 SILVER 표시"],GOLD:["VIP 금고 사용 가능","보험 가입비 5% 할인","VIP 금고 이자 하루 0.30%"],PLATINUM:["VIP 금고 이자 하루 0.35%","보험 가입비 8% 할인","PLATINUM 안정 채권 해금"],BLACK:["VIP 금고 이자 하루 0.40%","보험 가입비 10% 할인","BLACK 시크릿 펀드 해금","대시보드 BLACK 전용 효과"]};function Bg(){const n=m.bank,e=kc(n),t=n.vipTier||"NORMAL",i=_g(t)||fg;return`
    <div class="bk-grid">
      <div class="bk-card credit ${t==="BLACK"?"black-card":""}">
        <h3>VIP 등급 ${t==="BLACK"?'<span class="bk-tag" style="background:#14151c;color:#f0d488">BLACK 혜택 활성화</span>':""}</h3>
        <div class="bk-credit"><div class="bk-grade-big v-${t}">${kt(t).slice(0,1)}</div>
          <div class="bk-score"><div class="bk-score-bar"><span style="width:${n.vipScore}%"></span></div><small>${kt(t)} · ${n.vipScore} / 100</small></div></div>
        <p class="bk-note">예금·정기·투자·보험 이용과 무대출·높은 순자산으로 VIP 점수가 오릅니다. GOLD 등급부터 VIP 금고가 열립니다.</p>
      </div>
      <div class="bk-card">
        <h3>등급별 혜택</h3>
        ${["SILVER","GOLD","PLATINUM","BLACK"].map(s=>`
          <div class="bk-row"><span>${ai(s)}</span><b class="${si(t)>=si(s)?"ok":"muted"}" style="font-weight:600;font-size:12px;text-align:right">${Vg[s].join(" · ")}</b></div>`).join("")}
      </div>
      <div class="bk-card">
        <h3>VIP 금고 ${e?'<span class="bk-tag safe">이용 가능</span>':'<span class="bk-tag risk">GOLD부터 잠금</span>'}</h3>
        <div class="bk-row"><span>금고 잔액</span><b>${b(n.vipVaultBalance)}</b></div>
        <div class="bk-row"><span>내 이자율</span><b class="ok">하루 ${(i*100).toFixed(2)}%</b></div>
        ${e?`
        <div class="bk-amount">
          <input id="vipAmt" type="number" inputmode="numeric" placeholder="금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick">
          <button class="bk-btn ghost" data-fill="vipAmt:maxin">최대 입금</button>
          <button class="bk-btn ghost" data-fill="vipAmt:maxvip">최대 출금</button>
        </div>
        <div class="bk-btnrow">
          <button class="bk-btn primary" data-act="vipDeposit">입금하기</button>
          <button class="bk-btn" data-act="vipWithdraw">출금하기</button>
        </div>
        <p class="bk-note">VIP 금고 이자는 등급이 높을수록 올라갑니다(과도한 수익 방지를 위해 낮게 유지). 보유 현금 ${b(m.cash)}</p>`:'<p class="bk-note">현재 등급에서는 VIP 금고가 잠겨 있습니다. 예금·투자 등을 이용해 <b>GOLD</b> 등급에 도달하면 열립니다.</p>'}
      </div>
    </div>`}function Wg(n){return Math.round(n/36e5)+"시간"}function li(n){const e=Math.floor(n/36e5),t=Math.floor(n%36e5/6e4);return e>0?`${e}시간 ${t}분`:`${t}분`}function Tr(n){const e=new Date(F(n)||Date.now()),t=i=>(i<10?"0":"")+i;return`${e.getMonth()+1}/${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function Hg(){const n=W.querySelector("[data-home]");n&&n.addEventListener("click",t=>{t.preventDefault(),ri="dashboard",window.scrollTo(0,0),Xe()}),W.querySelectorAll("[data-tab]").forEach(t=>t.addEventListener("click",()=>{ri=t.dataset.tab,Xe()})),W.querySelectorAll("[data-fill]").forEach(t=>t.addEventListener("click",()=>jg(t.dataset.fill))),W.querySelectorAll("[data-act]").forEach(t=>t.addEventListener("click",()=>Gg(t.dataset.act))),W.querySelectorAll("[data-claim]").forEach(t=>t.addEventListener("click",()=>ne(()=>gc(m.uid,t.dataset.claim,m)))),W.querySelectorAll("[data-cancel]").forEach(t=>t.addEventListener("click",()=>{confirm("정기예금을 중도해지하면 이자 없이 원금만 돌려받습니다. 해지할까요?")&&ne(()=>mc(m.uid,t.dataset.cancel,m))})),W.querySelectorAll("[data-claiminv]").forEach(t=>t.addEventListener("click",()=>ne(()=>ug(m.uid,t.dataset.claiminv,m)))),W.querySelectorAll("[data-buyins]").forEach(t=>t.addEventListener("click",()=>{const i=Cc[t.dataset.buyins];i&&confirm(`${i.title} 가입비 ${b(i.premium)}을(를) 결제할까요? (게임머니)`)&&ne(()=>lg(m.uid,t.dataset.buyins,m))})),W.querySelectorAll("[data-filter]").forEach(t=>t.addEventListener("click",()=>{Ht=t.dataset.filter,Xe()})),W.querySelectorAll("[data-msgread]").forEach(t=>t.addEventListener("click",()=>{const i=(m.msgs||[]).find(s=>s.id===t.dataset.msgread);i&&!i.read&&(i.read=!0,m.unread=vg(m.msgs),mg(m.uid,i.id).catch(()=>{}),Xe())}));const e=W.querySelector("[data-allread]");e&&e.addEventListener("click",()=>{gg(m.uid,m.msgs).catch(()=>{}),(m.msgs||[]).forEach(t=>{t.read=!0}),m.unread=0,Xe()})}function jg(n){const[e,t]=n.split(":"),i=document.getElementById(e);if(!i)return;const s=m.bank;let r=0;t==="maxin"?r=M(m.cash):t==="maxout"?r=M(s.balance):t==="maxvip"?r=M(s.vipVaultBalance):t==="maxloan"&&(r=Math.max(0,Er(Ri(s.creditScore))-M(s.loanPrincipal))),i.value=r>0?r:""}function Gg(n){const e=m.bank;if(n==="deposit")return ne(()=>fc(m.uid,Ne("freeAmt"),m));if(n==="withdraw")return ne(()=>pc(m.uid,Ne("freeAmt"),m));if(n==="openFixed"){const t=(W.querySelector('input[name="fixedProd"]:checked')||{}).value||"d1";return ne(()=>_c(m.uid,t,Ne("fixedAmt"),m))}if(n==="loan")return ne(()=>vc(m.uid,Ne("loanAmt"),m));if(n==="repay")return ne(()=>ys(m.uid,Ne("repayAmt"),m));if(n==="buyInvest"){const t=(W.querySelector('input[name="invProd"]:checked')||{}).value||"stable";return ne(()=>cg(m.uid,t,Ne("invAmt"),m))}if(n==="vipDeposit")return ne(()=>dg(m.uid,Ne("vipAmt"),m));if(n==="vipWithdraw")return ne(()=>hg(m.uid,Ne("vipAmt"),m));if(n==="repayAll"){const t=M(e.loanPrincipal)+M(e.loanInterest);if(t<=0){oi("상환할 대출이 없습니다.","err");return}return ne(()=>ys(m.uid,t,m))}}
