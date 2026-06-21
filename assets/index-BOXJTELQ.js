(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var Wr={};/**
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
 */const aa={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const g=function(n,e){if(!n)throw Lt(e)},Lt=function(n){return new Error("Firebase Database ("+aa.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const la=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ad=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Fs={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),i.push(t[d],t[u],t[h],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(la(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ad(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new ld;const h=r<<2|a>>4;if(i.push(h),c!==64){const p=a<<4&240|c>>2;if(i.push(p),u!==64){const _=c<<6&192|u;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ld extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ca=function(n){const e=la(n);return Fs.encodeByteArray(e,!0)},zn=function(n){return ca(n).replace(/\./g,"")},Yn=function(n){try{return Fs.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function cd(n){return da(void 0,n)}function da(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!dd(t)||(n[t]=da(n[t],e[t]));return n}function dd(n){return n!=="__proto__"}/**
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
 */function ud(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const hd=()=>ud().__FIREBASE_DEFAULTS__,fd=()=>{if(typeof process>"u"||typeof Wr>"u")return;const n=Wr.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},pd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Yn(n[1]);return e&&JSON.parse(e)},Us=()=>{try{return hd()||fd()||pd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ua=n=>{var e,t;return(t=(e=Us())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},md=n=>{const e=ua(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},ha=()=>{var n;return(n=Us())===null||n===void 0?void 0:n.config},fa=n=>{var e;return(e=Us())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class $t{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function _d(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[zn(JSON.stringify(t)),zn(JSON.stringify(o)),""].join(".")}/**
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
 */function se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vs(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(se())}function gd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function vd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function pa(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function bd(){const n=se();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function yd(){return aa.NODE_ADMIN===!0}function wd(){try{return typeof indexedDB=="object"}catch{return!1}}function Id(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const Ed="FirebaseError";class et extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Ed,Object.setPrototypeOf(this,et.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cn.prototype.create)}}class Cn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Cd(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new et(s,a,i)}}function Cd(n,e){return n.replace(Td,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Td=/\{\$([^}]+)}/g;/**
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
 */function ln(n){return JSON.parse(n)}function G(n){return JSON.stringify(n)}/**
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
 */const ma=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=ln(Yn(r[0])||""),t=ln(Yn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Sd=function(n){const e=ma(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},kd=function(n){const e=ma(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function ve(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function at(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function hs(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Qn(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Jn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Hr(r)&&Hr(o)){if(!Jn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Hr(n){return n!==null&&typeof n=="object"}/**
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
 */function Ft(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
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
 */class Ad{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Rd(n,e){const t=new Nd(n,e);return t.subscribe.bind(t)}class Nd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Pd(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=qi),s.error===void 0&&(s.error=qi),s.complete===void 0&&(s.complete=qi);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Pd(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function qi(){}function Ei(n,e){return`${n} failed: ${e} argument `}/**
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
 */const Od=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,g(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ci=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function ee(n){return n&&n._delegate?n._delegate:n}class lt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const nt="[DEFAULT]";/**
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
 */class xd{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new $t;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dd(e))try{this.getOrInitializeService({instanceIdentifier:nt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=nt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=nt){return this.instances.has(e)}getOptions(e=nt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Md(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=nt){return this.component?this.component.multipleInstances?e:nt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Md(n){return n===nt?void 0:n}function Dd(n){return n.instantiationMode==="EAGER"}/**
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
 */class Ld{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new xd(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var N;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(N||(N={}));const $d={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},Fd=N.INFO,Ud={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},Vd=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Ud[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bs{constructor(e){this.name=e,this._logLevel=Fd,this._logHandler=Vd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?$d[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const Bd=(n,e)=>e.some(t=>n instanceof t);let jr,Gr;function Wd(){return jr||(jr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hd(){return Gr||(Gr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _a=new WeakMap,fs=new WeakMap,ga=new WeakMap,zi=new WeakMap,Ws=new WeakMap;function jd(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(je(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&_a.set(t,n)}).catch(()=>{}),Ws.set(e,n),e}function Gd(n){if(fs.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});fs.set(n,e)}let ps={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return fs.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ga.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return je(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Kd(n){ps=n(ps)}function qd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Yi(this),e,...t);return ga.set(i,e.sort?e.sort():[e]),je(i)}:Hd().includes(n)?function(...e){return n.apply(Yi(this),e),je(_a.get(this))}:function(...e){return je(n.apply(Yi(this),e))}}function zd(n){return typeof n=="function"?qd(n):(n instanceof IDBTransaction&&Gd(n),Bd(n,Wd())?new Proxy(n,ps):n)}function je(n){if(n instanceof IDBRequest)return jd(n);if(zi.has(n))return zi.get(n);const e=zd(n);return e!==n&&(zi.set(n,e),Ws.set(e,n)),e}const Yi=n=>Ws.get(n);function Yd(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=je(o);return i&&o.addEventListener("upgradeneeded",l=>{i(je(o.result),l.oldVersion,l.newVersion,je(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Qd=["get","getKey","getAll","getAllKeys","count"],Jd=["put","add","delete","clear"],Qi=new Map;function Kr(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qi.get(e))return Qi.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Jd.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Qd.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Qi.set(e,r),r}Kd(n=>({...n,get:(e,t,i)=>Kr(e,t)||n.get(e,t,i),has:(e,t)=>!!Kr(e,t)||n.has(e,t)}));/**
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
 */class Xd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Zd(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Zd(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ms="@firebase/app",qr="0.10.13";/**
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
 */const Re=new Bs("@firebase/app"),eu="@firebase/app-compat",tu="@firebase/analytics-compat",nu="@firebase/analytics",iu="@firebase/app-check-compat",su="@firebase/app-check",ru="@firebase/auth",ou="@firebase/auth-compat",au="@firebase/database",lu="@firebase/data-connect",cu="@firebase/database-compat",du="@firebase/functions",uu="@firebase/functions-compat",hu="@firebase/installations",fu="@firebase/installations-compat",pu="@firebase/messaging",mu="@firebase/messaging-compat",_u="@firebase/performance",gu="@firebase/performance-compat",vu="@firebase/remote-config",bu="@firebase/remote-config-compat",yu="@firebase/storage",wu="@firebase/storage-compat",Iu="@firebase/firestore",Eu="@firebase/vertexai-preview",Cu="@firebase/firestore-compat",Tu="firebase",Su="10.14.1";/**
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
 */const _s="[DEFAULT]",ku={[ms]:"fire-core",[eu]:"fire-core-compat",[nu]:"fire-analytics",[tu]:"fire-analytics-compat",[su]:"fire-app-check",[iu]:"fire-app-check-compat",[ru]:"fire-auth",[ou]:"fire-auth-compat",[au]:"fire-rtdb",[lu]:"fire-data-connect",[cu]:"fire-rtdb-compat",[du]:"fire-fn",[uu]:"fire-fn-compat",[hu]:"fire-iid",[fu]:"fire-iid-compat",[pu]:"fire-fcm",[mu]:"fire-fcm-compat",[_u]:"fire-perf",[gu]:"fire-perf-compat",[vu]:"fire-rc",[bu]:"fire-rc-compat",[yu]:"fire-gcs",[wu]:"fire-gcs-compat",[Iu]:"fire-fst",[Cu]:"fire-fst-compat",[Eu]:"fire-vertex","fire-js":"fire-js",[Tu]:"fire-js-all"};/**
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
 */const Xn=new Map,Au=new Map,gs=new Map;function zr(n,e){try{n.container.addComponent(e)}catch(t){Re.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Rt(n){const e=n.name;if(gs.has(e))return Re.debug(`There were multiple attempts to register component ${e}.`),!1;gs.set(e,n);for(const t of Xn.values())zr(t,n);for(const t of Au.values())zr(t,n);return!0}function Hs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function We(n){return n.settings!==void 0}/**
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
 */const Ru={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ge=new Cn("app","Firebase",Ru);/**
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
 */class Nu{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new lt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ge.create("app-deleted",{appName:this._name})}}/**
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
 */const Ut=Su;function va(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:_s,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Ge.create("bad-app-name",{appName:String(s)});if(t||(t=ha()),!t)throw Ge.create("no-options");const r=Xn.get(s);if(r){if(Jn(t,r.options)&&Jn(i,r.config))return r;throw Ge.create("duplicate-app",{appName:s})}const o=new Ld(s);for(const l of gs.values())o.addComponent(l);const a=new Nu(t,i,o);return Xn.set(s,a),a}function ba(n=_s){const e=Xn.get(n);if(!e&&n===_s&&ha())return va();if(!e)throw Ge.create("no-app",{appName:n});return e}function Ke(n,e,t){var i;let s=(i=ku[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Re.warn(a.join(" "));return}Rt(new lt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Pu="firebase-heartbeat-database",Ou=1,cn="firebase-heartbeat-store";let Ji=null;function ya(){return Ji||(Ji=Yd(Pu,Ou,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(cn)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ge.create("idb-open",{originalErrorMessage:n.message})})),Ji}async function xu(n){try{const t=(await ya()).transaction(cn),i=await t.objectStore(cn).get(wa(n));return await t.done,i}catch(e){if(e instanceof et)Re.warn(e.message);else{const t=Ge.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Re.warn(t.message)}}}async function Yr(n,e){try{const i=(await ya()).transaction(cn,"readwrite");await i.objectStore(cn).put(e,wa(n)),await i.done}catch(t){if(t instanceof et)Re.warn(t.message);else{const i=Ge.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Re.warn(i.message)}}}function wa(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Mu=1024,Du=30*24*60*60*1e3;class Lu{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Fu(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Qr();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Du}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Re.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Qr(),{heartbeatsToSend:i,unsentEntries:s}=$u(this._heartbeatsCache.heartbeats),r=zn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Re.warn(t),""}}}function Qr(){return new Date().toISOString().substring(0,10)}function $u(n,e=Mu){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Jr(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Jr(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Fu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wd()?Id().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await xu(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Yr(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Yr(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Jr(n){return zn(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Uu(n){Rt(new lt("platform-logger",e=>new Xd(e),"PRIVATE")),Rt(new lt("heartbeat",e=>new Lu(e),"PRIVATE")),Ke(ms,qr,n),Ke(ms,qr,"esm2017"),Ke("fire-js","")}Uu("");var Vu="firebase",Bu="10.14.1";/**
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
 */Ke(Vu,Bu,"app");function js(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function Ia(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Wu=Ia,Ea=new Cn("auth","Firebase",Ia());/**
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
 */const Zn=new Bs("@firebase/auth");function Hu(n,...e){Zn.logLevel<=N.WARN&&Zn.warn(`Auth (${Ut}): ${n}`,...e)}function Wn(n,...e){Zn.logLevel<=N.ERROR&&Zn.error(`Auth (${Ut}): ${n}`,...e)}/**
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
 */function Ne(n,...e){throw Gs(n,...e)}function be(n,...e){return Gs(n,...e)}function Ca(n,e,t){const i=Object.assign(Object.assign({},Wu()),{[e]:t});return new Cn("auth","Firebase",i).create(e,{appName:n.name})}function ot(n){return Ca(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Gs(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Ea.create(n,...e)}function w(n,e,...t){if(!n)throw Gs(e,...t)}function Ee(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Wn(e),new Error(e)}function Pe(n,e){n||Ee(e)}/**
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
 */function vs(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function ju(){return Xr()==="http:"||Xr()==="https:"}function Xr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Gu(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ju()||vd()||"connection"in navigator)?navigator.onLine:!0}function Ku(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Tn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Pe(t>e,"Short delay should be less than long delay!"),this.isMobile=Vs()||pa()}get(){return Gu()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ks(n,e){Pe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Ta{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ee("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ee("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ee("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const qu={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const zu=new Tn(3e4,6e4);function qs(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Vt(n,e,t,i,s={}){return Sa(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Ft(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},r);return gd()||(c.referrerPolicy="no-referrer"),Ta.fetch()(ka(n,n.config.apiHost,t,a),c)})}async function Sa(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},qu),e);try{const s=new Qu(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw $n(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw $n(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw $n(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw $n(n,"user-disabled",o);const d=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Ca(n,d,c);Ne(n,d)}}catch(s){if(s instanceof et)throw s;Ne(n,"network-request-failed",{message:String(s)})}}async function Yu(n,e,t,i,s={}){const r=await Vt(n,e,t,i,s);return"mfaPendingCredential"in r&&Ne(n,"multi-factor-auth-required",{_serverResponse:r}),r}function ka(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?Ks(n.config,s):`${n.config.apiScheme}://${s}`}class Qu{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(be(this.auth,"network-request-failed")),zu.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function $n(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=be(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */async function Ju(n,e){return Vt(n,"POST","/v1/accounts:delete",e)}async function Aa(n,e){return Vt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function tn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Xu(n,e=!1){const t=ee(n),i=await t.getIdToken(e),s=zs(i);w(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:tn(Xi(s.auth_time)),issuedAtTime:tn(Xi(s.iat)),expirationTime:tn(Xi(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Xi(n){return Number(n)*1e3}function zs(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Wn("JWT malformed, contained fewer than 3 sections"),null;try{const s=Yn(t);return s?JSON.parse(s):(Wn("Failed to decode base64 JWT payload"),null)}catch(s){return Wn("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Zr(n){const e=zs(n);return w(e,"internal-error"),w(typeof e.exp<"u","internal-error"),w(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function dn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof et&&Zu(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Zu({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class eh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class bs{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=tn(this.lastLoginAt),this.creationTime=tn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ei(n){var e;const t=n.auth,i=await n.getIdToken(),s=await dn(n,Aa(t,{idToken:i}));w(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Ra(r.providerUserInfo):[],a=nh(n.providerData,o),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new bs(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,u)}async function th(n){const e=ee(n);await ei(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function nh(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Ra(n){return n.map(e=>{var{providerId:t}=e,i=js(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function ih(n,e){const t=await Sa(n,{},async()=>{const i=Ft({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=ka(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Ta.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function sh(n,e){return Vt(n,"POST","/v2/accounts:revokeToken",qs(n,e))}/**
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
 */class Ct{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){w(e.idToken,"internal-error"),w(typeof e.idToken<"u","internal-error"),w(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Zr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){w(e.length!==0,"internal-error");const t=Zr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(w(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await ih(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Ct;return i&&(w(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(w(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(w(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ct,this.toJSON())}_performRefresh(){return Ee("not implemented")}}/**
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
 */function $e(n,e){w(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ce{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=js(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new eh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new bs(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await dn(this,this.stsTokenManager.getToken(this.auth,e));return w(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Xu(this,e)}reload(){return th(this)}_assign(e){this!==e&&(w(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ce(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){w(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await ei(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(We(this.auth.app))return Promise.reject(ot(this.auth));const e=await this.getIdToken();return await dn(this,Ju(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,a,l,c,d;const u=(i=t.displayName)!==null&&i!==void 0?i:void 0,h=(s=t.email)!==null&&s!==void 0?s:void 0,p=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,_=(o=t.photoURL)!==null&&o!==void 0?o:void 0,y=(a=t.tenantId)!==null&&a!==void 0?a:void 0,S=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,z=(c=t.createdAt)!==null&&c!==void 0?c:void 0,J=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:oe,emailVerified:yt,isAnonymous:Ln,providerData:Kt,stsTokenManager:F}=t;w(oe&&F,e,"internal-error");const fe=Ct.fromJSON(this.name,F);w(typeof oe=="string",e,"internal-error"),$e(u,e.name),$e(h,e.name),w(typeof yt=="boolean",e,"internal-error"),w(typeof Ln=="boolean",e,"internal-error"),$e(p,e.name),$e(_,e.name),$e(y,e.name),$e(S,e.name),$e(z,e.name),$e(J,e.name);const Le=new Ce({uid:oe,auth:e,email:h,emailVerified:yt,displayName:u,isAnonymous:Ln,photoURL:_,phoneNumber:p,tenantId:y,stsTokenManager:fe,createdAt:z,lastLoginAt:J});return Kt&&Array.isArray(Kt)&&(Le.providerData=Kt.map(ae=>Object.assign({},ae))),S&&(Le._redirectEventId=S),Le}static async _fromIdTokenResponse(e,t,i=!1){const s=new Ct;s.updateFromServerResponse(t);const r=new Ce({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await ei(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];w(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Ra(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new Ct;a.updateFromIdToken(i);const l=new Ce({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new bs(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
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
 */const eo=new Map;function Te(n){Pe(n instanceof Function,"Expected a class definition");let e=eo.get(n);return e?(Pe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,eo.set(n,e),e)}/**
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
 */class Na{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Na.type="NONE";const to=Na;/**
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
 */function Hn(n,e,t){return`firebase:${n}:${e}:${t}`}class Tt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Hn(this.userKey,s.apiKey,r),this.fullPersistenceKey=Hn("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ce._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Tt(Te(to),e,i);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||Te(to);const o=Hn(i,e.config.apiKey,e.name);let a=null;for(const c of t)try{const d=await c._get(o);if(d){const u=Ce._fromJSON(e,d);c!==r&&(a=u),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new Tt(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new Tt(r,e,i))}}/**
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
 */function no(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ma(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Pa(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(La(e))return"Blackberry";if($a(e))return"Webos";if(Oa(e))return"Safari";if((e.includes("chrome/")||xa(e))&&!e.includes("edge/"))return"Chrome";if(Da(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Pa(n=se()){return/firefox\//i.test(n)}function Oa(n=se()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function xa(n=se()){return/crios\//i.test(n)}function Ma(n=se()){return/iemobile/i.test(n)}function Da(n=se()){return/android/i.test(n)}function La(n=se()){return/blackberry/i.test(n)}function $a(n=se()){return/webos/i.test(n)}function Ys(n=se()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function rh(n=se()){var e;return Ys(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function oh(){return bd()&&document.documentMode===10}function Fa(n=se()){return Ys(n)||Da(n)||$a(n)||La(n)||/windows phone/i.test(n)||Ma(n)}/**
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
 */function Ua(n,e=[]){let t;switch(n){case"Browser":t=no(se());break;case"Worker":t=`${no(se())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ut}/${i}`}/**
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
 */class ah{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function lh(n,e={}){return Vt(n,"GET","/v2/passwordPolicy",qs(n,e))}/**
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
 */const ch=6;class dh{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:ch,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class uh{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new io(this),this.idTokenSubscription=new io(this),this.beforeStateQueue=new ah(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ea,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Te(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await Tt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Aa(this,{idToken:e}),i=await Ce._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(We(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return w(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ei(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ku()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(We(this.app))return Promise.reject(ot(this));const t=e?ee(e):null;return t&&w(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&w(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return We(this.app)?Promise.reject(ot(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return We(this.app)?Promise.reject(ot(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Te(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await lh(this),t=new dh(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Cn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await sh(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Te(e)||this._popupRedirectResolver;w(t,this,"argument-error"),this.redirectPersistenceManager=await Tt.create(this,[Te(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(w(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return w(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ua(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Hu(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Qs(n){return ee(n)}class io{constructor(e){this.auth=e,this.observer=null,this.addObserver=Rd(t=>this.observer=t)}get next(){return w(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Js={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function hh(n){Js=n}function fh(n){return Js.loadJS(n)}function ph(){return Js.gapiScript}function mh(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function _h(n,e){const t=Hs(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Jn(r,e??{}))return s;Ne(s,"already-initialized")}return t.initialize({options:e})}function gh(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Te);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function vh(n,e,t){const i=Qs(n);w(i._canInitEmulator,i,"emulator-config-failed"),w(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Va(e),{host:o,port:a}=bh(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),yh()}function Va(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function bh(n){const e=Va(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:so(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:so(o)}}}function so(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function yh(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Ba{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ee("not implemented")}_getIdTokenResponse(e){return Ee("not implemented")}_linkToIdToken(e,t){return Ee("not implemented")}_getReauthenticationResolver(e){return Ee("not implemented")}}/**
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
 */async function St(n,e){return Yu(n,"POST","/v1/accounts:signInWithIdp",qs(n,e))}/**
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
 */const wh="http://localhost";class ct extends Ba{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ct(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ne("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=js(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new ct(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return St(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,St(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,St(e,t)}buildRequest(){const e={requestUri:wh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ft(t)}return e}}/**
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
 */class Wa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Sn extends Wa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Fe extends Sn{constructor(){super("facebook.com")}static credential(e){return ct._fromParams({providerId:Fe.PROVIDER_ID,signInMethod:Fe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Fe.credentialFromTaggedObject(e)}static credentialFromError(e){return Fe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Fe.credential(e.oauthAccessToken)}catch{return null}}}Fe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Fe.PROVIDER_ID="facebook.com";/**
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
 */class Ue extends Sn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ct._fromParams({providerId:Ue.PROVIDER_ID,signInMethod:Ue.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ue.credentialFromTaggedObject(e)}static credentialFromError(e){return Ue.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Ue.credential(t,i)}catch{return null}}}Ue.GOOGLE_SIGN_IN_METHOD="google.com";Ue.PROVIDER_ID="google.com";/**
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
 */class Ve extends Sn{constructor(){super("github.com")}static credential(e){return ct._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ve.credential(e.oauthAccessToken)}catch{return null}}}Ve.GITHUB_SIGN_IN_METHOD="github.com";Ve.PROVIDER_ID="github.com";/**
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
 */class Be extends Sn{constructor(){super("twitter.com")}static credential(e,t){return ct._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Be.credential(t,i)}catch{return null}}}Be.TWITTER_SIGN_IN_METHOD="twitter.com";Be.PROVIDER_ID="twitter.com";/**
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
 */class Nt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Ce._fromIdTokenResponse(e,i,s),o=ro(i);return new Nt({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=ro(i);return new Nt({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function ro(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ti extends et{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,ti.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new ti(e,t,i,s)}}function Ha(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?ti._fromErrorAndOperation(n,r,e,i):r})}async function Ih(n,e,t=!1){const i=await dn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Nt._forOperation(n,"link",i)}/**
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
 */async function Eh(n,e,t=!1){const{auth:i}=n;if(We(i.app))return Promise.reject(ot(i));const s="reauthenticate";try{const r=await dn(n,Ha(i,s,e,n),t);w(r.idToken,i,"internal-error");const o=zs(r.idToken);w(o,i,"internal-error");const{sub:a}=o;return w(n.uid===a,i,"user-mismatch"),Nt._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Ne(i,"user-mismatch"),r}}/**
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
 */async function Ch(n,e,t=!1){if(We(n.app))return Promise.reject(ot(n));const i="signIn",s=await Ha(n,i,e),r=await Nt._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function Th(n,e,t,i){return ee(n).onIdTokenChanged(e,t,i)}function Sh(n,e,t){return ee(n).beforeAuthStateChanged(e,t)}function kh(n,e,t,i){return ee(n).onAuthStateChanged(e,t,i)}const ni="__sak";/**
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
 */class ja{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ni,"1"),this.storage.removeItem(ni),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Ah=1e3,Rh=10;class Ga extends ja{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fa(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);oh()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Rh):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Ah)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ga.type="LOCAL";const Nh=Ga;/**
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
 */class Ka extends ja{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ka.type="SESSION";const qa=Ka;/**
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
 */function Ph(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ti{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new Ti(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await Ph(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ti.receivers=[];/**
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
 */function Xs(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Oh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=Xs("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(u){const h=u;if(h.data.eventId===c)switch(h.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(d),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function ye(){return window}function xh(n){ye().location.href=n}/**
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
 */function za(){return typeof ye().WorkerGlobalScope<"u"&&typeof ye().importScripts=="function"}async function Mh(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Dh(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Lh(){return za()?self:null}/**
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
 */const Ya="firebaseLocalStorageDb",$h=1,ii="firebaseLocalStorage",Qa="fbase_key";class kn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Si(n,e){return n.transaction([ii],e?"readwrite":"readonly").objectStore(ii)}function Fh(){const n=indexedDB.deleteDatabase(Ya);return new kn(n).toPromise()}function ys(){const n=indexedDB.open(Ya,$h);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(ii,{keyPath:Qa})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(ii)?e(i):(i.close(),await Fh(),e(await ys()))})})}async function oo(n,e,t){const i=Si(n,!0).put({[Qa]:e,value:t});return new kn(i).toPromise()}async function Uh(n,e){const t=Si(n,!1).get(e),i=await new kn(t).toPromise();return i===void 0?null:i.value}function ao(n,e){const t=Si(n,!0).delete(e);return new kn(t).toPromise()}const Vh=800,Bh=3;class Ja{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ys(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Bh)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return za()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ti._getInstance(Lh()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Mh(),!this.activeServiceWorker)return;this.sender=new Oh(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Dh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ys();return await oo(e,ni,"1"),await ao(e,ni),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>oo(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>Uh(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ao(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Si(s,!1).getAll();return new kn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Vh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ja.type="LOCAL";const Wh=Ja;new Tn(3e4,6e4);/**
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
 */function Hh(n,e){return e?Te(e):(w(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Zs extends Ba{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return St(e,this._buildIdpRequest())}_linkToIdToken(e,t){return St(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return St(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function jh(n){return Ch(n.auth,new Zs(n),n.bypassAuthState)}function Gh(n){const{auth:e,user:t}=n;return w(t,e,"internal-error"),Eh(t,new Zs(n),n.bypassAuthState)}async function Kh(n){const{auth:e,user:t}=n;return w(t,e,"internal-error"),Ih(t,new Zs(n),n.bypassAuthState)}/**
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
 */class Xa{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return jh;case"linkViaPopup":case"linkViaRedirect":return Kh;case"reauthViaPopup":case"reauthViaRedirect":return Gh;default:Ne(this.auth,"internal-error")}}resolve(e){Pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const qh=new Tn(2e3,1e4);class It extends Xa{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,It.currentPopupAction&&It.currentPopupAction.cancel(),It.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return w(e,this.auth,"internal-error"),e}async onExecution(){Pe(this.filter.length===1,"Popup operations only handle one event");const e=Xs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(be(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(be(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,It.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(be(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,qh.get())};e()}}It.currentPopupAction=null;/**
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
 */const zh="pendingRedirect",jn=new Map;class Yh extends Xa{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=jn.get(this.auth._key());if(!e){try{const i=await Qh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}jn.set(this.auth._key(),e)}return this.bypassAuthState||jn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Qh(n,e){const t=Zh(e),i=Xh(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function Jh(n,e){jn.set(n._key(),e)}function Xh(n){return Te(n._redirectPersistence)}function Zh(n){return Hn(zh,n.config.apiKey,n.name)}async function ef(n,e,t=!1){if(We(n.app))return Promise.reject(ot(n));const i=Qs(n),s=Hh(i,e),o=await new Yh(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const tf=10*60*1e3;class nf{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!sf(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Za(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(be(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=tf&&this.cachedEventUids.clear(),this.cachedEventUids.has(lo(e))}saveEventToCache(e){this.cachedEventUids.add(lo(e)),this.lastProcessedEventTime=Date.now()}}function lo(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Za({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function sf(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Za(n);default:return!1}}/**
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
 */async function rf(n,e={}){return Vt(n,"GET","/v1/projects",e)}/**
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
 */const of=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,af=/^https?/;async function lf(n){if(n.config.emulator)return;const{authorizedDomains:e}=await rf(n);for(const t of e)try{if(cf(t))return}catch{}Ne(n,"unauthorized-domain")}function cf(n){const e=vs(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!af.test(t))return!1;if(of.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const df=new Tn(3e4,6e4);function co(){const n=ye().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function uf(n){return new Promise((e,t)=>{var i,s,r;function o(){co(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{co(),t(be(n,"network-request-failed"))},timeout:df.get()})}if(!((s=(i=ye().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=ye().gapi)===null||r===void 0)&&r.load)o();else{const a=mh("iframefcb");return ye()[a]=()=>{gapi.load?o():t(be(n,"network-request-failed"))},fh(`${ph()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw Gn=null,e})}let Gn=null;function hf(n){return Gn=Gn||uf(n),Gn}/**
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
 */const ff=new Tn(5e3,15e3),pf="__/auth/iframe",mf="emulator/auth/iframe",_f={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},gf=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function vf(n){const e=n.config;w(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ks(e,mf):`https://${n.config.authDomain}/${pf}`,i={apiKey:e.apiKey,appName:n.name,v:Ut},s=gf.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Ft(i).slice(1)}`}async function bf(n){const e=await hf(n),t=ye().gapi;return w(t,n,"internal-error"),e.open({where:document.body,url:vf(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:_f,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=be(n,"network-request-failed"),a=ye().setTimeout(()=>{r(o)},ff.get());function l(){ye().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
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
 */const yf={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},wf=500,If=600,Ef="_blank",Cf="http://localhost";class uo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Tf(n,e,t,i=wf,s=If){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},yf),{width:i.toString(),height:s.toString(),top:r,left:o}),c=se().toLowerCase();t&&(a=xa(c)?Ef:t),Pa(c)&&(e=e||Cf,l.scrollbars="yes");const d=Object.entries(l).reduce((h,[p,_])=>`${h}${p}=${_},`,"");if(rh(c)&&a!=="_self")return Sf(e||"",a),new uo(null);const u=window.open(e||"",a,d);w(u,n,"popup-blocked");try{u.focus()}catch{}return new uo(u)}function Sf(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const kf="__/auth/handler",Af="emulator/auth/handler",Rf=encodeURIComponent("fac");async function ho(n,e,t,i,s,r){w(n.config.authDomain,n,"auth-domain-config-required"),w(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Ut,eventId:s};if(e instanceof Wa){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",hs(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries({}))o[d]=u}if(e instanceof Sn){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await n._getAppCheckToken(),c=l?`#${Rf}=${encodeURIComponent(l)}`:"";return`${Nf(n)}?${Ft(a).slice(1)}${c}`}function Nf({config:n}){return n.emulator?Ks(n,Af):`https://${n.authDomain}/${kf}`}/**
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
 */const Zi="webStorageSupport";class Pf{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qa,this._completeRedirectFn=ef,this._overrideRedirectResult=Jh}async _openPopup(e,t,i,s){var r;Pe((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await ho(e,t,i,vs(),s);return Tf(e,o,Xs())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await ho(e,t,i,vs(),s);return xh(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Pe(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await bf(e),i=new nf(e);return t.register("authEvent",s=>(w(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Zi,{type:Zi},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Zi];o!==void 0&&t(!!o),Ne(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=lf(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Fa()||Oa()||Ys()}}const Of=Pf;var fo="@firebase/auth",po="1.7.9";/**
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
 */class xf{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){w(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Mf(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Df(n){Rt(new lt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;w(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ua(n)},c=new uh(i,s,r,l);return gh(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Rt(new lt("auth-internal",e=>{const t=Qs(e.getProvider("auth").getImmediate());return(i=>new xf(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ke(fo,po,Mf(n)),Ke(fo,po,"esm2017")}/**
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
 */const Lf=5*60,$f=fa("authIdTokenMaxAge")||Lf;let mo=null;const Ff=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>$f)return;const s=t==null?void 0:t.token;mo!==s&&(mo=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Uf(n=ba()){const e=Hs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=_h(n,{popupRedirectResolver:Of,persistence:[Wh,Nh,qa]}),i=fa("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=Ff(r.toString());Sh(t,o,()=>o(t.currentUser)),Th(t,a=>o(a))}}const s=ua("auth");return s&&vh(t,`http://${s}`),t}function Vf(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}hh({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=be("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",Vf().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Df("Browser");var _o={};const go="@firebase/database",vo="1.0.8";/**
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
 */let el="";function Bf(n){el=n}/**
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
 */class Wf{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),G(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:ln(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class Hf{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return ve(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const tl=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Wf(e)}}catch{}return new Hf},rt=tl("localStorage"),jf=tl("sessionStorage");/**
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
 */const kt=new Bs("@firebase/database"),nl=function(){let n=1;return function(){return n++}}(),il=function(n){const e=Od(n),t=new Ad;t.update(e);const i=t.digest();return Fs.encodeByteArray(i)},An=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=An.apply(null,i):typeof i=="object"?e+=G(i):e+=i,e+=" "}return e};let nn=null,bo=!0;const Gf=function(n,e){g(!0,"Can't turn on custom loggers persistently."),kt.logLevel=N.VERBOSE,nn=kt.log.bind(kt)},Y=function(...n){if(bo===!0&&(bo=!1,nn===null&&jf.get("logging_enabled")===!0&&Gf()),nn){const e=An.apply(null,n);nn(e)}},Rn=function(n){return function(...e){Y(n,...e)}},ws=function(...n){const e="FIREBASE INTERNAL ERROR: "+An(...n);kt.error(e)},Oe=function(...n){const e=`FIREBASE FATAL ERROR: ${An(...n)}`;throw kt.error(e),new Error(e)},ie=function(...n){const e="FIREBASE WARNING: "+An(...n);kt.warn(e)},Kf=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ie("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},er=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},qf=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},dt="[MIN_NAME]",Qe="[MAX_NAME]",_t=function(n,e){if(n===e)return 0;if(n===dt||e===Qe)return-1;if(e===dt||n===Qe)return 1;{const t=yo(n),i=yo(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},zf=function(n,e){return n===e?0:n<e?-1:1},zt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+G(e))},tr=function(n){if(typeof n!="object"||n===null)return G(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=G(e[i]),t+=":",t+=tr(n[e[i]]);return t+="}",t},sl=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Q(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const rl=function(n){g(!er(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},Yf=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Qf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Jf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Xf=new RegExp("^-?(0*)\\d{1,10}$"),Zf=-2147483648,ep=2147483647,yo=function(n){if(Xf.test(n)){const e=Number(n);if(e>=Zf&&e<=ep)return e}return null},Bt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw ie("Exception was thrown by user callback.",t),e},Math.floor(0))}},tp=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},sn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class np{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){ie(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class ip{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Y("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ie(e)}}class Kn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Kn.OWNER="owner";/**
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
 */const nr="5",ol="v",al="s",ll="r",cl="f",dl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ul="ls",hl="p",Is="ac",fl="websocket",pl="long_polling";/**
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
 */class ml{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=rt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&rt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function sp(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function _l(n,e,t){g(typeof e=="string","typeof type must == string"),g(typeof t=="object","typeof params must == object");let i;if(e===fl)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===pl)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);sp(n)&&(t.ns=n.namespace);const s=[];return Q(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class rp{constructor(){this.counters_={}}incrementCounter(e,t=1){ve(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return cd(this.counters_)}}/**
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
 */const es={},ts={};function ir(n){const e=n.toString();return es[e]||(es[e]=new rp),es[e]}function op(n,e){const t=n.toString();return ts[t]||(ts[t]=e()),ts[t]}/**
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
 */class ap{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Bt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const wo="start",lp="close",cp="pLPCommand",dp="pRTLPCB",gl="id",vl="pw",bl="ser",up="cb",hp="seg",fp="ts",pp="d",mp="dframe",yl=1870,wl=30,_p=yl-wl,gp=25e3,vp=3e4;class Et{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Rn(e),this.stats_=ir(t),this.urlFn=l=>(this.appCheckToken&&(l[Is]=this.appCheckToken),_l(t,pl,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ap(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(vp)),qf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new sr((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===wo)this.id=a,this.password=l;else if(o===lp)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[wo]="t",i[bl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[up]=this.scriptTagHolder.uniqueCallbackIdentifier),i[ol]=nr,this.transportSessionId&&(i[al]=this.transportSessionId),this.lastSessionId&&(i[ul]=this.lastSessionId),this.applicationId&&(i[hl]=this.applicationId),this.appCheckToken&&(i[Is]=this.appCheckToken),typeof location<"u"&&location.hostname&&dl.test(location.hostname)&&(i[ll]=cl);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Et.forceAllow_=!0}static forceDisallow(){Et.forceDisallow_=!0}static isAvailable(){return Et.forceAllow_?!0:!Et.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Yf()&&!Qf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=G(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=ca(t),s=sl(i,_p);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[mp]="t",i[gl]=e,i[vl]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=G(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class sr{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=nl(),window[cp+this.uniqueCallbackIdentifier]=e,window[dp+this.uniqueCallbackIdentifier]=t,this.myIFrame=sr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Y("frame writing exception"),a.stack&&Y(a.stack),Y(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Y("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[gl]=this.myID,e[vl]=this.myPW,e[bl]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+wl+i.length<=yl;){const o=this.pendingSegs.shift();i=i+"&"+hp+s+"="+o.seg+"&"+fp+s+"="+o.ts+"&"+pp+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(gp)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Y("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const bp=16384,yp=45e3;let si=null;typeof MozWebSocket<"u"?si=MozWebSocket:typeof WebSocket<"u"&&(si=WebSocket);class pe{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Rn(this.connId),this.stats_=ir(t),this.connURL=pe.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[ol]=nr,typeof location<"u"&&location.hostname&&dl.test(location.hostname)&&(o[ll]=cl),t&&(o[al]=t),i&&(o[ul]=i),s&&(o[Is]=s),r&&(o[hl]=r),_l(e,fl,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,rt.set("previous_websocket_failure",!0);try{let i;yd(),this.mySock=new si(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){pe.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&si!==null&&!pe.forceDisallow_}static previouslyFailed(){return rt.isInMemoryStorage||rt.get("previous_websocket_failure")===!0}markConnectionHealthy(){rt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=ln(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=G(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=sl(t,bp);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(yp))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}pe.responsesRequiredToBeHealthy=2;pe.healthyTimeout=3e4;/**
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
 */class un{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Et,pe]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=pe&&pe.isAvailable();let i=t&&!pe.previouslyFailed();if(e.webSocketOnly&&(t||ie("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[pe];else{const s=this.transports_=[];for(const r of un.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);un.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}un.globalTransportInitialized_=!1;/**
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
 */const wp=6e4,Ip=5e3,Ep=10*1024,Cp=100*1024,ns="t",Io="d",Tp="s",Eo="r",Sp="e",Co="o",To="a",So="n",ko="p",kp="h";class Ap{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Rn("c:"+this.id+":"),this.transportManager_=new un(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=sn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Cp?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Ep?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ns in e){const t=e[ns];t===To?this.upgradeIfSecondaryHealthy_():t===Eo?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Co&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=zt("t",e),i=zt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ko,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:To,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:So,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=zt("t",e),i=zt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=zt(ns,e);if(Io in e){const i=e[Io];if(t===kp){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===So){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Tp?this.onConnectionShutdown_(i):t===Eo?this.onReset_(i):t===Sp?ws("Server Error: "+i):t===Co?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ws("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),nr!==i&&ie("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),sn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(wp))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):sn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Ip))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ko,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(rt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Il{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class El{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class ri extends El{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Vs()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ri}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Ao=32,Ro=768;class O{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function k(){return new O("")}function I(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Je(n){return n.pieces_.length-n.pieceNum_}function D(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new O(n.pieces_,e)}function rr(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Rp(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function hn(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Cl(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new O(e,0)}function V(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof O)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new O(t,0)}function C(n){return n.pieceNum_>=n.pieces_.length}function ne(n,e){const t=I(n),i=I(e);if(t===null)return e;if(t===i)return ne(D(n),D(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Np(n,e){const t=hn(n,0),i=hn(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=_t(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function or(n,e){if(Je(n)!==Je(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function he(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Je(n)>Je(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Pp{constructor(e,t){this.errorPrefix_=t,this.parts_=hn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Ci(this.parts_[i]);Tl(this)}}function Op(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Ci(e),Tl(n)}function xp(n){const e=n.parts_.pop();n.byteLength_-=Ci(e),n.parts_.length>0&&(n.byteLength_-=1)}function Tl(n){if(n.byteLength_>Ro)throw new Error(n.errorPrefix_+"has a key path longer than "+Ro+" bytes ("+n.byteLength_+").");if(n.parts_.length>Ao)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Ao+") or object contains a cycle "+it(n))}function it(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class ar extends El{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new ar}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Yt=1e3,Mp=60*5*1e3,No=30*1e3,Dp=1.3,Lp=3e4,$p="server_kill",Po=3;class ke extends Il{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ke.nextPersistentConnectionId_++,this.log_=Rn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Yt,this.maxReconnectDelay_=Mp,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ar.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ri.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(G(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new $t,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ke.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&ve(e,"w")){const i=at(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();ie(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||kd(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=No)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Sd(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+G(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):ws("Unrecognized action received from server: "+G(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Yt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Yt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Lp&&(this.reconnectDelay_=Yt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Dp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ke.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?Y("getToken() completed but was canceled"):(Y("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new Ap(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{ie(p+" ("+this.repoInfo_.toString()+")"),this.interrupt($p)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&ie(u),l())}}}interrupt(e){Y("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Y("Resuming connection for reason: "+e),delete this.interruptReasons_[e],hs(this.interruptReasons_)&&(this.reconnectDelay_=Yt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>tr(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new O(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Y("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Po&&(this.reconnectDelay_=No,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Y("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Po&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+el.replace(/\./g,"-")]=1,Vs()?e["framework.cordova"]=1:pa()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ri.getInstance().currentlyOnline();return hs(this.interruptReasons_)&&e}}ke.nextPersistentConnectionId_=0;ke.nextConnectionId_=0;/**
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
 */class E{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new E(e,t)}}/**
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
 */class ki{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new E(dt,e),s=new E(dt,t);return this.compare(i,s)!==0}minPost(){return E.MIN}}/**
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
 */let Fn;class Sl extends ki{static get __EMPTY_NODE(){return Fn}static set __EMPTY_NODE(e){Fn=e}compare(e,t){return _t(e.name,t.name)}isDefinedOn(e){throw Lt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return E.MIN}maxPost(){return new E(Qe,Fn)}makePost(e,t){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new E(e,Fn)}toString(){return".key"}}const qe=new Sl;/**
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
 */class Un{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class q{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??q.RED,this.left=s??re.EMPTY_NODE,this.right=r??re.EMPTY_NODE}copy(e,t,i,s,r){return new q(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return re.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return re.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,q.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,q.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}q.RED=!0;q.BLACK=!1;class Fp{copy(e,t,i,s,r){return this}insert(e,t,i){return new q(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class re{constructor(e,t=re.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new re(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,q.BLACK,null,null))}remove(e){return new re(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,q.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Un(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Un(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Un(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Un(this.root_,null,this.comparator_,!0,e)}}re.EMPTY_NODE=new Fp;/**
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
 */function Up(n,e){return _t(n.name,e.name)}function lr(n,e){return _t(n,e)}/**
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
 */let Es;function Vp(n){Es=n}const kl=function(n){return typeof n=="number"?"number:"+rl(n):"string:"+n},Al=function(n){if(n.isLeafNode()){const e=n.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ve(e,".sv"),"Priority must be a string or number.")}else g(n===Es||n.isEmpty(),"priority of unexpected type.");g(n===Es||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Oo;class K{constructor(e,t=K.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Al(this.priorityNode_)}static set __childrenNodeConstructor(e){Oo=e}static get __childrenNodeConstructor(){return Oo}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new K(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:K.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return C(e)?this:I(e)===".priority"?this.priorityNode_:K.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:K.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=I(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(g(i!==".priority"||Je(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,K.__childrenNodeConstructor.EMPTY_NODE.updateChild(D(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+kl(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=rl(this.value_):e+=this.value_,this.lazyHash_=il(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===K.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof K.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=K.VALUE_TYPE_ORDER.indexOf(t),r=K.VALUE_TYPE_ORDER.indexOf(i);return g(s>=0,"Unknown leaf type: "+t),g(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}K.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Rl,Nl;function Bp(n){Rl=n}function Wp(n){Nl=n}class Hp extends ki{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?_t(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return E.MIN}maxPost(){return new E(Qe,new K("[PRIORITY-POST]",Nl))}makePost(e,t){const i=Rl(e);return new E(t,new K("[PRIORITY-POST]",i))}toString(){return".priority"}}const L=new Hp;/**
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
 */const jp=Math.log(2);class Gp{constructor(e){const t=r=>parseInt(Math.log(r)/jp,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const oi=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new q(h,u.node,q.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=s(l,p),y=s(p+1,c);return u=n[p],h=t?t(u):u,new q(h,u.node,q.BLACK,_,y)}},r=function(l){let c=null,d=null,u=n.length;const h=function(_,y){const S=u-_,z=u;u-=_;const J=s(S+1,z),oe=n[S],yt=t?t(oe):oe;p(new q(yt,oe.node,y,null,J))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const y=l.nextBitIsOne(),S=Math.pow(2,l.count-(_+1));y?h(S,q.BLACK):(h(S,q.BLACK),h(S,q.RED))}return d},o=new Gp(n.length),a=r(o);return new re(i||e,a)};/**
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
 */let is;const wt={};class Se{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return g(wt&&L,"ChildrenNode.ts has not been loaded"),is=is||new Se({".priority":wt},{".priority":L}),is}get(e){const t=at(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof re?t:null}hasIndex(e){return ve(this.indexSet_,e.toString())}addIndex(e,t){g(e!==qe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(E.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=oi(i,e.getCompare()):a=wt;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const d=Object.assign({},this.indexes_);return d[l]=a,new Se(d,c)}addToIndexes(e,t){const i=Qn(this.indexes_,(s,r)=>{const o=at(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),s===wt)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(E.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),oi(a,o.getCompare())}else return wt;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new E(e.name,a))),l.insert(e,e.node)}});return new Se(i,this.indexSet_)}removeFromIndexes(e,t){const i=Qn(this.indexes_,s=>{if(s===wt)return s;{const r=t.get(e.name);return r?s.remove(new E(e.name,r)):s}});return new Se(i,this.indexSet_)}}/**
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
 */let Qt;class b{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Al(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Qt||(Qt=new b(new re(lr),null,Se.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Qt}updatePriority(e){return this.children_.isEmpty()?this:new b(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Qt:t}}getChild(e){const t=I(e);return t===null?this:this.getImmediateChild(t).getChild(D(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(g(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new E(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Qt:this.priorityNode_;return new b(s,o,r)}}updateChild(e,t){const i=I(e);if(i===null)return t;{g(I(e)!==".priority"||Je(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(D(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(L,(o,a)=>{t[o]=a.val(e),i++,r&&b.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+kl(this.getPriority().val())+":"),this.forEachChild(L,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":il(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new E(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new E(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new E(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Nn?-1:0}withIndex(e){if(e===qe||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new b(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===qe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(L),s=t.getIterator(L);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===qe?null:this.indexMap_.get(e.toString())}}b.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Kp extends b{constructor(){super(new re(lr),b.EMPTY_NODE,Se.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return b.EMPTY_NODE}isEmpty(){return!1}}const Nn=new Kp;Object.defineProperties(E,{MIN:{value:new E(dt,b.EMPTY_NODE)},MAX:{value:new E(Qe,Nn)}});Sl.__EMPTY_NODE=b.EMPTY_NODE;K.__childrenNodeConstructor=b;Vp(Nn);Wp(Nn);/**
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
 */const qp=!0;function H(n,e=null){if(n===null)return b.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new K(t,H(e))}if(!(n instanceof Array)&&qp){const t=[];let i=!1;if(Q(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=H(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new E(o,l)))}}),t.length===0)return b.EMPTY_NODE;const r=oi(t,Up,o=>o.name,lr);if(i){const o=oi(t,L.getCompare());return new b(r,H(e),new Se({".priority":o},{".priority":L}))}else return new b(r,H(e),Se.Default)}else{let t=b.EMPTY_NODE;return Q(n,(i,s)=>{if(ve(n,i)&&i.substring(0,1)!=="."){const r=H(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(H(e))}}Bp(H);/**
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
 */class Pl extends ki{constructor(e){super(),this.indexPath_=e,g(!C(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?_t(e.name,t.name):r}makePost(e,t){const i=H(e),s=b.EMPTY_NODE.updateChild(this.indexPath_,i);return new E(t,s)}maxPost(){const e=b.EMPTY_NODE.updateChild(this.indexPath_,Nn);return new E(Qe,e)}toString(){return hn(this.indexPath_,0).join("/")}}/**
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
 */class zp extends ki{compare(e,t){const i=e.node.compareTo(t.node);return i===0?_t(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return E.MIN}maxPost(){return E.MAX}makePost(e,t){const i=H(e);return new E(t,i)}toString(){return".value"}}const Ol=new zp;/**
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
 */function xl(n){return{type:"value",snapshotNode:n}}function Pt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function fn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function pn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Yp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class cr{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(fn(t,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Pt(t,i)):o.trackChildChange(pn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(L,(s,r)=>{t.hasChild(s)||i.trackChildChange(fn(s,r))}),t.isLeafNode()||t.forEachChild(L,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(pn(s,r,o))}else i.trackChildChange(Pt(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?b.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class mn{constructor(e){this.indexedFilter_=new cr(e.getIndex()),this.index_=e.getIndex(),this.startPost_=mn.getStartPost_(e),this.endPost_=mn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new E(t,i))||(i=b.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=b.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(b.EMPTY_NODE);const r=this;return t.forEachChild(L,(o,a)=>{r.matches(new E(o,a))||(s=s.updateImmediateChild(o,b.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class Qp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new mn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new E(t,i))||(i=b.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=b.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=b.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(b.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,b.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,p)=>u(p,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const l=new E(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(d&&!i.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(pn(t,i,u)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(fn(t,u));const y=a.updateImmediateChild(t,b.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(Pt(h.name,h.node)),y.updateImmediateChild(h.name,h.node)):y}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(fn(c.name,c.node)),r.trackChildChange(Pt(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,b.EMPTY_NODE)):e}}/**
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
 */class dr{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=L}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:dt}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Qe}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===L}copy(){const e=new dr;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Jp(n){return n.loadsAllData()?new cr(n.getIndex()):n.hasLimit()?new Qp(n):new mn(n)}function Xp(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function Zp(n,e){const t=n.copy();return t.index_=e,t}function xo(n){const e={};if(n.isDefault())return e;let t;if(n.index_===L?t="$priority":n.index_===Ol?t="$value":n.index_===qe?t="$key":(g(n.index_ instanceof Pl,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=G(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=G(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+G(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=G(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+G(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Mo(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==L&&(e.i=n.index_.toString()),e}/**
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
 */class ai extends Il{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Rn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=ai.getListenId_(e,i),a={};this.listens_[o]=a;const l=xo(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),at(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=ai.getListenId_(e,t);delete this.listens_[i]}get(e){const t=xo(e._queryParams),i=e._path.toString(),s=new $t;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ft(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=ln(a.responseText)}catch{ie("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&ie("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class em{constructor(){this.rootNode_=b.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function li(){return{value:null,children:new Map}}function Ml(n,e,t){if(C(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=I(e);n.children.has(i)||n.children.set(i,li());const s=n.children.get(i);e=D(e),Ml(s,e,t)}}function Cs(n,e,t){n.value!==null?t(e,n.value):tm(n,(i,s)=>{const r=new O(e.toString()+"/"+i);Cs(s,r,t)})}function tm(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class nm{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Q(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const Do=10*1e3,im=30*1e3,sm=5*60*1e3;class rm{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new nm(e);const i=Do+(im-Do)*Math.random();sn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Q(e,(s,r)=>{r>0&&ve(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),sn(this.reportStats_.bind(this),Math.floor(Math.random()*2*sm))}}/**
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
 */var me;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(me||(me={}));function ur(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function hr(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function fr(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class ci{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=me.ACK_USER_WRITE,this.source=ur()}operationForChild(e){if(C(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new O(e));return new ci(k(),t,this.revert)}}else return g(I(this.path)===e,"operationForChild called for unrelated child."),new ci(D(this.path),this.affectedTree,this.revert)}}/**
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
 */class _n{constructor(e,t){this.source=e,this.path=t,this.type=me.LISTEN_COMPLETE}operationForChild(e){return C(this.path)?new _n(this.source,k()):new _n(this.source,D(this.path))}}/**
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
 */class ut{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=me.OVERWRITE}operationForChild(e){return C(this.path)?new ut(this.source,k(),this.snap.getImmediateChild(e)):new ut(this.source,D(this.path),this.snap)}}/**
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
 */class Ot{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=me.MERGE}operationForChild(e){if(C(this.path)){const t=this.children.subtree(new O(e));return t.isEmpty()?null:t.value?new ut(this.source,k(),t.value):new Ot(this.source,k(),t)}else return g(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ot(this.source,D(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Xe{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(C(e))return this.isFullyInitialized()&&!this.filtered_;const t=I(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class om{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function am(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Yp(o.childName,o.snapshotNode))}),Jt(n,s,"child_removed",e,i,t),Jt(n,s,"child_added",e,i,t),Jt(n,s,"child_moved",r,i,t),Jt(n,s,"child_changed",e,i,t),Jt(n,s,"value",e,i,t),s}function Jt(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>cm(n,a,l)),o.forEach(a=>{const l=lm(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function lm(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function cm(n,e,t){if(e.childName==null||t.childName==null)throw Lt("Should only compare child_ events.");const i=new E(e.childName,e.snapshotNode),s=new E(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function Ai(n,e){return{eventCache:n,serverCache:e}}function rn(n,e,t,i){return Ai(new Xe(e,t,i),n.serverCache)}function Dl(n,e,t,i){return Ai(n.eventCache,new Xe(e,t,i))}function di(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function ht(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let ss;const dm=()=>(ss||(ss=new re(zf)),ss);class M{constructor(e,t=dm()){this.value=e,this.children=t}static fromObject(e){let t=new M(null);return Q(e,(i,s)=>{t=t.set(new O(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:k(),value:this.value};if(C(e))return null;{const i=I(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(D(e),t);return r!=null?{path:V(new O(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(C(e))return this;{const t=I(e),i=this.children.get(t);return i!==null?i.subtree(D(e)):new M(null)}}set(e,t){if(C(e))return new M(t,this.children);{const i=I(e),r=(this.children.get(i)||new M(null)).set(D(e),t),o=this.children.insert(i,r);return new M(this.value,o)}}remove(e){if(C(e))return this.children.isEmpty()?new M(null):new M(null,this.children);{const t=I(e),i=this.children.get(t);if(i){const s=i.remove(D(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new M(null):new M(this.value,r)}else return this}}get(e){if(C(e))return this.value;{const t=I(e),i=this.children.get(t);return i?i.get(D(e)):null}}setTree(e,t){if(C(e))return t;{const i=I(e),r=(this.children.get(i)||new M(null)).setTree(D(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new M(this.value,o)}}fold(e){return this.fold_(k(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(V(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,k(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(C(e))return null;{const r=I(e),o=this.children.get(r);return o?o.findOnPath_(D(e),V(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,k(),t)}foreachOnPath_(e,t,i){if(C(e))return this;{this.value&&i(t,this.value);const s=I(e),r=this.children.get(s);return r?r.foreachOnPath_(D(e),V(t,s),i):new M(null)}}foreach(e){this.foreach_(k(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(V(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class _e{constructor(e){this.writeTree_=e}static empty(){return new _e(new M(null))}}function on(n,e,t){if(C(e))return new _e(new M(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=ne(s,e);return r=r.updateChild(o,t),new _e(n.writeTree_.set(s,r))}else{const s=new M(t),r=n.writeTree_.setTree(e,s);return new _e(r)}}}function Ts(n,e,t){let i=n;return Q(t,(s,r)=>{i=on(i,V(e,s),r)}),i}function Lo(n,e){if(C(e))return _e.empty();{const t=n.writeTree_.setTree(e,new M(null));return new _e(t)}}function Ss(n,e){return gt(n,e)!=null}function gt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(ne(t.path,e)):null}function $o(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(L,(i,s)=>{e.push(new E(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new E(i,s.value))}),e}function ze(n,e){if(C(e))return n;{const t=gt(n,e);return t!=null?new _e(new M(t)):new _e(n.writeTree_.subtree(e))}}function ks(n){return n.writeTree_.isEmpty()}function xt(n,e){return Ll(k(),n.writeTree_,e)}function Ll(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Ll(V(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(V(n,".priority"),i)),t}}/**
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
 */function Ri(n,e){return Vl(e,n)}function um(n,e,t,i,s){g(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=on(n.visibleWrites,e,t)),n.lastWriteId=i}function hm(n,e,t,i){g(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Ts(n.visibleWrites,e,t),n.lastWriteId=i}function fm(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function pm(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);g(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&mm(a,i.path)?s=!1:he(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return _m(n),!0;if(i.snap)n.visibleWrites=Lo(n.visibleWrites,i.path);else{const a=i.children;Q(a,l=>{n.visibleWrites=Lo(n.visibleWrites,V(i.path,l))})}return!0}else return!1}function mm(n,e){if(n.snap)return he(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&he(V(n.path,t),e))return!0;return!1}function _m(n){n.visibleWrites=$l(n.allWrites,gm,k()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function gm(n){return n.visible}function $l(n,e,t){let i=_e.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)he(t,o)?(a=ne(t,o),i=on(i,a,r.snap)):he(o,t)&&(a=ne(o,t),i=on(i,k(),r.snap.getChild(a)));else if(r.children){if(he(t,o))a=ne(t,o),i=Ts(i,a,r.children);else if(he(o,t))if(a=ne(o,t),C(a))i=Ts(i,k(),r.children);else{const l=at(r.children,I(a));if(l){const c=l.getChild(D(a));i=on(i,k(),c)}}}else throw Lt("WriteRecord should have .snap or .children")}}return i}function Fl(n,e,t,i,s){if(!i&&!s){const r=gt(n.visibleWrites,e);if(r!=null)return r;{const o=ze(n.visibleWrites,e);if(ks(o))return t;if(t==null&&!Ss(o,k()))return null;{const a=t||b.EMPTY_NODE;return xt(o,a)}}}else{const r=ze(n.visibleWrites,e);if(!s&&ks(r))return t;if(!s&&t==null&&!Ss(r,k()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(he(c.path,e)||he(e,c.path))},a=$l(n.allWrites,o,e),l=t||b.EMPTY_NODE;return xt(a,l)}}}function vm(n,e,t){let i=b.EMPTY_NODE;const s=gt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(L,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=ze(n.visibleWrites,e);return t.forEachChild(L,(o,a)=>{const l=xt(ze(r,new O(o)),a);i=i.updateImmediateChild(o,l)}),$o(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=ze(n.visibleWrites,e);return $o(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function bm(n,e,t,i,s){g(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=V(e,t);if(Ss(n.visibleWrites,r))return null;{const o=ze(n.visibleWrites,r);return ks(o)?s.getChild(t):xt(o,s.getChild(t))}}function ym(n,e,t,i){const s=V(e,t),r=gt(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=ze(n.visibleWrites,s);return xt(o,i.getNode().getImmediateChild(t))}else return null}function wm(n,e){return gt(n.visibleWrites,e)}function Im(n,e,t,i,s,r,o){let a;const l=ze(n.visibleWrites,e),c=gt(l,k());if(c!=null)a=c;else if(t!=null)a=xt(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=h.getNext();for(;p&&d.length<s;)u(p,i)!==0&&d.push(p),p=h.getNext();return d}else return[]}function Em(){return{visibleWrites:_e.empty(),allWrites:[],lastWriteId:-1}}function ui(n,e,t,i){return Fl(n.writeTree,n.treePath,e,t,i)}function pr(n,e){return vm(n.writeTree,n.treePath,e)}function Fo(n,e,t,i){return bm(n.writeTree,n.treePath,e,t,i)}function hi(n,e){return wm(n.writeTree,V(n.treePath,e))}function Cm(n,e,t,i,s,r){return Im(n.writeTree,n.treePath,e,t,i,s,r)}function mr(n,e,t){return ym(n.writeTree,n.treePath,e,t)}function Ul(n,e){return Vl(V(n.treePath,e),n.writeTree)}function Vl(n,e){return{treePath:n,writeTree:e}}/**
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
 */class Tm{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;g(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),g(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,pn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,fn(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Pt(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,pn(i,e.snapshotNode,s.oldSnap));else throw Lt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Sm{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Bl=new Sm;class _r{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Xe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return mr(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ht(this.viewCache_),r=Cm(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function km(n){return{filter:n}}function Am(n,e){g(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Rm(n,e,t,i,s){const r=new Tm;let o,a;if(t.type===me.OVERWRITE){const c=t;c.source.fromUser?o=As(n,e,c.path,c.snap,i,s,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!C(c.path),o=fi(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===me.MERGE){const c=t;c.source.fromUser?o=Pm(n,e,c.path,c.children,i,s,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Rs(n,e,c.path,c.children,i,s,a,r))}else if(t.type===me.ACK_USER_WRITE){const c=t;c.revert?o=Mm(n,e,c.path,i,s,r):o=Om(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===me.LISTEN_COMPLETE)o=xm(n,e,t.path,i,r);else throw Lt("Unknown operation type: "+t.type);const l=r.getChanges();return Nm(e,o,l),{viewCache:o,changes:l}}function Nm(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=di(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(xl(di(e)))}}function Wl(n,e,t,i,s,r){const o=e.eventCache;if(hi(i,t)!=null)return e;{let a,l;if(C(t))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=ht(e),d=c instanceof b?c:b.EMPTY_NODE,u=pr(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=ui(i,ht(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=I(t);if(c===".priority"){g(Je(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=Fo(i,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=D(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=Fo(i,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=mr(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return rn(e,a,o.isFullyInitialized()||C(t),n.filter.filtersNodes())}}function fi(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(C(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),p,null)}else{const p=I(t);if(!l.isCompleteForPath(t)&&Je(t)>1)return e;const _=D(t),S=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=d.updatePriority(l.getNode(),S):c=d.updateChild(l.getNode(),p,S,_,Bl,null)}const u=Dl(e,c,l.isFullyInitialized()||C(t),d.filtersNodes()),h=new _r(s,u,r);return Wl(n,u,t,s,h,a)}function As(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new _r(s,e,r);if(C(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=rn(e,c,!0,n.filter.filtersNodes());else{const u=I(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=rn(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=D(t),p=a.getNode().getImmediateChild(u);let _;if(C(h))_=i;else{const y=d.getCompleteChild(u);y!=null?rr(h)===".priority"&&y.getChild(Cl(h)).isEmpty()?_=y:_=y.updateChild(h,i):_=b.EMPTY_NODE}if(p.equals(_))l=e;else{const y=n.filter.updateChild(a.getNode(),u,_,h,d,o);l=rn(e,y,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Uo(n,e){return n.eventCache.isCompleteForChild(e)}function Pm(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=V(t,l);Uo(e,I(d))&&(a=As(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=V(t,l);Uo(e,I(d))||(a=As(n,a,d,c,s,r,o))}),a}function Vo(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Rs(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;C(t)?c=i:c=new M(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),_=Vo(n,p,h);l=fi(n,l,new O(u),_,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const p=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!p){const _=e.serverCache.getNode().getImmediateChild(u),y=Vo(n,_,h);l=fi(n,l,new O(u),y,s,r,o,a)}}),l}function Om(n,e,t,i,s,r,o){if(hi(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(C(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return fi(n,e,t,l.getNode().getChild(t),s,r,a,o);if(C(t)){let c=new M(null);return l.getNode().forEachChild(qe,(d,u)=>{c=c.set(new O(d),u)}),Rs(n,e,t,c,s,r,a,o)}else return e}else{let c=new M(null);return i.foreach((d,u)=>{const h=V(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),Rs(n,e,t,c,s,r,a,o)}}function xm(n,e,t,i,s){const r=e.serverCache,o=Dl(e,r.getNode(),r.isFullyInitialized()||C(t),r.isFiltered());return Wl(n,o,t,i,Bl,s)}function Mm(n,e,t,i,s,r){let o;if(hi(i,t)!=null)return e;{const a=new _r(i,e,s),l=e.eventCache.getNode();let c;if(C(t)||I(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=ui(i,ht(e));else{const u=e.serverCache.getNode();g(u instanceof b,"serverChildren would be complete if leaf node"),d=pr(i,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=I(t);let u=mr(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,D(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,b.EMPTY_NODE,D(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=ui(i,ht(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||hi(i,k())!=null,rn(e,c,o,n.filter.filtersNodes())}}/**
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
 */class Dm{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new cr(i.getIndex()),r=Jp(i);this.processor_=km(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(b.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(b.EMPTY_NODE,a.getNode(),null),d=new Xe(l,o.isFullyInitialized(),s.filtersNodes()),u=new Xe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Ai(u,d),this.eventGenerator_=new om(this.query_)}get query(){return this.query_}}function Lm(n){return n.viewCache_.serverCache.getNode()}function $m(n){return di(n.viewCache_)}function Fm(n,e){const t=ht(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!C(e)&&!t.getImmediateChild(I(e)).isEmpty())?t.getChild(e):null}function Bo(n){return n.eventRegistrations_.length===0}function Um(n,e){n.eventRegistrations_.push(e)}function Wo(n,e,t){const i=[];if(t){g(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Ho(n,e,t,i){e.type===me.MERGE&&e.source.queryId!==null&&(g(ht(n.viewCache_),"We should always have a full cache before handling merges"),g(di(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Rm(n.processor_,s,e,t,i);return Am(n.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Hl(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Vm(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(L,(r,o)=>{i.push(Pt(r,o))}),t.isFullyInitialized()&&i.push(xl(t.getNode())),Hl(n,i,t.getNode(),e)}function Hl(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return am(n.eventGenerator_,e,t,s)}/**
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
 */let pi;class jl{constructor(){this.views=new Map}}function Bm(n){g(!pi,"__referenceConstructor has already been defined"),pi=n}function Wm(){return g(pi,"Reference.ts has not been loaded"),pi}function Hm(n){return n.views.size===0}function gr(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return g(r!=null,"SyncTree gave us an op for an invalid query."),Ho(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Ho(o,e,t,i));return r}}function Gl(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=ui(t,s?i:null),l=!1;a?l=!0:i instanceof b?(a=pr(t,i),l=!1):(a=b.EMPTY_NODE,l=!1);const c=Ai(new Xe(a,l,!1),new Xe(i,s,!1));return new Dm(e,c)}return o}function jm(n,e,t,i,s,r){const o=Gl(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Um(o,t),Vm(o,t)}function Gm(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Ze(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Wo(c,t,i)),Bo(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Wo(l,t,i)),Bo(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Ze(n)&&r.push(new(Wm())(e._repo,e._path)),{removed:r,events:o}}function Kl(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Ye(n,e){let t=null;for(const i of n.views.values())t=t||Fm(i,e);return t}function ql(n,e){if(e._queryParams.loadsAllData())return Ni(n);{const i=e._queryIdentifier;return n.views.get(i)}}function zl(n,e){return ql(n,e)!=null}function Ze(n){return Ni(n)!=null}function Ni(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let mi;function Km(n){g(!mi,"__referenceConstructor has already been defined"),mi=n}function qm(){return g(mi,"Reference.ts has not been loaded"),mi}let zm=1;class jo{constructor(e){this.listenProvider_=e,this.syncPointTree_=new M(null),this.pendingWriteTree_=Em(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function vr(n,e,t,i,s){return um(n.pendingWriteTree_,e,t,i,s),s?Wt(n,new ut(ur(),e,t)):[]}function Ym(n,e,t,i){hm(n.pendingWriteTree_,e,t,i);const s=M.fromObject(t);return Wt(n,new Ot(ur(),e,s))}function He(n,e,t=!1){const i=fm(n.pendingWriteTree_,e);if(pm(n.pendingWriteTree_,e)){let r=new M(null);return i.snap!=null?r=r.set(k(),!0):Q(i.children,o=>{r=r.set(new O(o),!0)}),Wt(n,new ci(i.path,r,t))}else return[]}function Pn(n,e,t){return Wt(n,new ut(hr(),e,t))}function Qm(n,e,t){const i=M.fromObject(t);return Wt(n,new Ot(hr(),e,i))}function Jm(n,e){return Wt(n,new _n(hr(),e))}function Xm(n,e,t){const i=br(n,t);if(i){const s=yr(i),r=s.path,o=s.queryId,a=ne(r,e),l=new _n(fr(o),a);return wr(n,r,l)}else return[]}function _i(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||zl(o,e))){const l=Gm(o,e,t,i);Hm(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,p)=>Ze(p));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=t_(h);for(let _=0;_<p.length;++_){const y=p[_],S=y.query,z=Xl(n,y);n.listenProvider_.startListening(an(S),gn(n,S),z.hashFn,z.onComplete)}}}!u&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(an(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(Oi(h));n.listenProvider_.stopListening(an(h),p)}))}n_(n,c)}return a}function Yl(n,e,t,i){const s=br(n,i);if(s!=null){const r=yr(s),o=r.path,a=r.queryId,l=ne(o,e),c=new ut(fr(a),l,t);return wr(n,o,c)}else return[]}function Zm(n,e,t,i){const s=br(n,i);if(s){const r=yr(s),o=r.path,a=r.queryId,l=ne(o,e),c=M.fromObject(t),d=new Ot(fr(a),l,c);return wr(n,o,d)}else return[]}function Ns(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,p)=>{const _=ne(h,s);r=r||Ye(p,_),o=o||Ze(p)});let a=n.syncPointTree_.get(s);a?(o=o||Ze(a),r=r||Ye(a,k())):(a=new jl,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=b.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,_)=>{const y=Ye(_,k());y&&(r=r.updateImmediateChild(p,y))}));const c=zl(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=Oi(e);g(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=i_();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const d=Ri(n.pendingWriteTree_,s);let u=jm(a,e,t,d,r,l);if(!c&&!o&&!i){const h=ql(a,e);u=u.concat(s_(n,e,h))}return u}function Pi(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=ne(o,e),c=Ye(a,l);if(c)return c});return Fl(s,e,r,t,!0)}function e_(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=ne(c,t);i=i||Ye(d,u)});let s=n.syncPointTree_.get(t);s?i=i||Ye(s,k()):(s=new jl,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Xe(i,!0,!1):null,a=Ri(n.pendingWriteTree_,e._path),l=Gl(s,e,a,r?o.getNode():b.EMPTY_NODE,r);return $m(l)}function Wt(n,e){return Ql(e,n.syncPointTree_,null,Ri(n.pendingWriteTree_,k()))}function Ql(n,e,t,i){if(C(n.path))return Jl(n,e,t,i);{const s=e.get(k());t==null&&s!=null&&(t=Ye(s,k()));let r=[];const o=I(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=Ul(i,o);r=r.concat(Ql(a,l,c,d))}return s&&(r=r.concat(gr(s,n,i,t))),r}}function Jl(n,e,t,i){const s=e.get(k());t==null&&s!=null&&(t=Ye(s,k()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Ul(i,o),d=n.operationForChild(o);d&&(r=r.concat(Jl(d,a,l,c)))}),s&&(r=r.concat(gr(s,n,i,t))),r}function Xl(n,e){const t=e.query,i=gn(n,t);return{hashFn:()=>(Lm(e)||b.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Xm(n,t._path,i):Jm(n,t._path);{const r=Jf(s,t);return _i(n,t,null,r)}}}}function gn(n,e){const t=Oi(e);return n.queryToTagMap.get(t)}function Oi(n){return n._path.toString()+"$"+n._queryIdentifier}function br(n,e){return n.tagToQueryMap.get(e)}function yr(n){const e=n.indexOf("$");return g(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new O(n.substr(0,e))}}function wr(n,e,t){const i=n.syncPointTree_.get(e);g(i,"Missing sync point for query tag that we're tracking");const s=Ri(n.pendingWriteTree_,e);return gr(i,t,s,null)}function t_(n){return n.fold((e,t,i)=>{if(t&&Ze(t))return[Ni(t)];{let s=[];return t&&(s=Kl(t)),Q(i,(r,o)=>{s=s.concat(o)}),s}})}function an(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(qm())(n._repo,n._path):n}function n_(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Oi(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function i_(){return zm++}function s_(n,e,t){const i=e._path,s=gn(n,e),r=Xl(n,t),o=n.listenProvider_.startListening(an(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)g(!Ze(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!C(c)&&d&&Ze(d))return[Ni(d).query];{let h=[];return d&&(h=h.concat(Kl(d).map(p=>p.query))),Q(u,(p,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(an(d),gn(n,d))}}return o}/**
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
 */class Ir{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ir(t)}node(){return this.node_}}class Er{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=V(this.path_,e);return new Er(this.syncTree_,t)}node(){return Pi(this.syncTree_,this.path_)}}const r_=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Go=function(n,e,t){if(!n||typeof n!="object")return n;if(g(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return o_(n[".sv"],e,t);if(typeof n[".sv"]=="object")return a_(n[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},o_=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:g(!1,"Unexpected server value: "+n)}},a_=function(n,e,t){n.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&g(!1,"Unexpected increment value: "+i);const s=e.node();if(g(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Zl=function(n,e,t,i){return Tr(e,new Er(t,n),i)},Cr=function(n,e,t){return Tr(n,new Ir(e),t)};function Tr(n,e,t){const i=n.getPriority().val(),s=Go(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Go(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new K(a,H(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new K(s))),o.forEachChild(L,(a,l)=>{const c=Tr(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Sr{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function xi(n,e){let t=e instanceof O?e:new O(e),i=n,s=I(t);for(;s!==null;){const r=at(i.node.children,s)||{children:{},childCount:0};i=new Sr(s,i,r),t=D(t),s=I(t)}return i}function vt(n){return n.node.value}function kr(n,e){n.node.value=e,Ps(n)}function ec(n){return n.node.childCount>0}function l_(n){return vt(n)===void 0&&!ec(n)}function Mi(n,e){Q(n.node.children,(t,i)=>{e(new Sr(t,n,i))})}function tc(n,e,t,i){t&&e(n),Mi(n,s=>{tc(s,e,!0)})}function c_(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function On(n){return new O(n.parent===null?n.name:On(n.parent)+"/"+n.name)}function Ps(n){n.parent!==null&&d_(n.parent,n.name,n)}function d_(n,e,t){const i=l_(t),s=ve(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Ps(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Ps(n))}/**
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
 */const u_=/[\[\].#$\/\u0000-\u001F\u007F]/,h_=/[\[\].#$\u0000-\u001F\u007F]/,rs=10*1024*1024,Ar=function(n){return typeof n=="string"&&n.length!==0&&!u_.test(n)},nc=function(n){return typeof n=="string"&&n.length!==0&&!h_.test(n)},f_=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),nc(n)},gi=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!er(n)||n&&typeof n=="object"&&ve(n,".sv")},ic=function(n,e,t,i){i&&e===void 0||xn(Ei(n,"value"),e,t)},xn=function(n,e,t){const i=t instanceof O?new Pp(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+it(i));if(typeof e=="function")throw new Error(n+"contains a function "+it(i)+" with contents = "+e.toString());if(er(e))throw new Error(n+"contains "+e.toString()+" "+it(i));if(typeof e=="string"&&e.length>rs/3&&Ci(e)>rs)throw new Error(n+"contains a string greater than "+rs+" utf8 bytes "+it(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Q(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ar(o)))throw new Error(n+" contains an invalid key ("+o+") "+it(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Op(i,o),xn(n,a,i),xp(i)}),s&&r)throw new Error(n+' contains ".value" child '+it(i)+" in addition to actual children.")}},p_=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=hn(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Ar(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Np);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&he(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},m_=function(n,e,t,i){const s=Ei(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Q(e,(o,a)=>{const l=new O(o);if(xn(s,a,V(t,l)),rr(l)===".priority"&&!gi(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),p_(s,r)},sc=function(n,e,t,i){if(!nc(t))throw new Error(Ei(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},__=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),sc(n,e,t)},Rr=function(n,e){if(I(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},g_=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ar(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!f_(t))throw new Error(Ei(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class v_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Di(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!or(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function rc(n,e,t){Di(n,t),oc(n,i=>or(i,e))}function le(n,e,t){Di(n,t),oc(n,i=>he(i,e)||he(e,i))}function oc(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(b_(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function b_(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();nn&&Y("event: "+t.toString()),Bt(i)}}}/**
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
 */const y_="repo_interrupt",w_=25;class I_{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new v_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=li(),this.transactionQueueTree_=new Sr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function E_(n,e,t){if(n.stats_=ir(n.repoInfo_),n.forceRestClient_||tp())n.server_=new ai(n.repoInfo_,(i,s,r,o)=>{Ko(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>qo(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{G(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new ke(n.repoInfo_,e,(i,s,r,o)=>{Ko(n,i,s,r,o)},i=>{qo(n,i)},i=>{C_(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=op(n.repoInfo_,()=>new rm(n.stats_,n.server_)),n.infoData_=new em,n.infoSyncTree_=new jo({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=Pn(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Nr(n,"connected",!1),n.serverSyncTree_=new jo({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);le(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function ac(n){const t=n.infoData_.getNode(new O(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Mn(n){return r_({timestamp:ac(n)})}function Ko(n,e,t,i,s){n.dataUpdateCount++;const r=new O(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Qn(t,c=>H(c));o=Zm(n.serverSyncTree_,r,l,s)}else{const l=H(t);o=Yl(n.serverSyncTree_,r,l,s)}else if(i){const l=Qn(t,c=>H(c));o=Qm(n.serverSyncTree_,r,l)}else{const l=H(t);o=Pn(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Mt(n,r)),le(n.eventQueue_,a,o)}function qo(n,e){Nr(n,"connected",e),e===!1&&A_(n)}function C_(n,e){Q(e,(t,i)=>{Nr(n,t,i)})}function Nr(n,e,t){const i=new O("/.info/"+e),s=H(t);n.infoData_.updateSnapshot(i,s);const r=Pn(n.infoSyncTree_,i,s);le(n.eventQueue_,i,r)}function Li(n){return n.nextWriteId_++}function T_(n,e,t){const i=e_(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=H(s).withIndex(e._queryParams.getIndex());Ns(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Pn(n.serverSyncTree_,e._path,r);else{const a=gn(n.serverSyncTree_,e);o=Yl(n.serverSyncTree_,e._path,r,a)}return le(n.eventQueue_,e._path,o),_i(n.serverSyncTree_,e,t,null,!0),r},s=>(Ht(n,"get for query "+G(e)+" failed: "+s),Promise.reject(new Error(s))))}function S_(n,e,t,i,s){Ht(n,"set",{path:e.toString(),value:t,priority:i});const r=Mn(n),o=H(t,i),a=Pi(n.serverSyncTree_,e),l=Cr(o,a,r),c=Li(n),d=vr(n.serverSyncTree_,e,l,c,!0);Di(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,p)=>{const _=h==="ok";_||ie("set at "+e+" failed: "+h);const y=He(n.serverSyncTree_,c,!_);le(n.eventQueue_,e,y),Os(n,s,h,p)});const u=Or(n,e);Mt(n,u),le(n.eventQueue_,u,[])}function k_(n,e,t,i){Ht(n,"update",{path:e.toString(),value:t});let s=!0;const r=Mn(n),o={};if(Q(t,(a,l)=>{s=!1,o[a]=Zl(V(e,a),H(l),n.serverSyncTree_,r)}),s)Y("update() called with empty data.  Don't do anything."),Os(n,i,"ok",void 0);else{const a=Li(n),l=Ym(n.serverSyncTree_,e,o,a);Di(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||ie("update at "+e+" failed: "+c);const h=He(n.serverSyncTree_,a,!u),p=h.length>0?Mt(n,e):e;le(n.eventQueue_,p,h),Os(n,i,c,d)}),Q(t,c=>{const d=Or(n,V(e,c));Mt(n,d)}),le(n.eventQueue_,e,[])}}function A_(n){Ht(n,"onDisconnectEvents");const e=Mn(n),t=li();Cs(n.onDisconnect_,k(),(s,r)=>{const o=Zl(s,r,n.serverSyncTree_,e);Ml(t,s,o)});let i=[];Cs(t,k(),(s,r)=>{i=i.concat(Pn(n.serverSyncTree_,s,r));const o=Or(n,s);Mt(n,o)}),n.onDisconnect_=li(),le(n.eventQueue_,k(),i)}function R_(n,e,t){let i;I(e._path)===".info"?i=Ns(n.infoSyncTree_,e,t):i=Ns(n.serverSyncTree_,e,t),rc(n.eventQueue_,e._path,i)}function N_(n,e,t){let i;I(e._path)===".info"?i=_i(n.infoSyncTree_,e,t):i=_i(n.serverSyncTree_,e,t),rc(n.eventQueue_,e._path,i)}function P_(n){n.persistentConnection_&&n.persistentConnection_.interrupt(y_)}function Ht(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Y(t,...e)}function Os(n,e,t,i){e&&Bt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function O_(n,e,t,i,s,r){Ht(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:nl(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Pr(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{xn("transaction failed: Data returned ",l,o.path),o.status=0;const c=xi(n.transactionQueueTree_,e),d=vt(c)||[];d.push(o),kr(c,d);let u;typeof l=="object"&&l!==null&&ve(l,".priority")?(u=at(l,".priority"),g(gi(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Pi(n.serverSyncTree_,e)||b.EMPTY_NODE).getPriority().val();const h=Mn(n),p=H(l,u),_=Cr(p,a,h);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=_,o.currentWriteId=Li(n);const y=vr(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);le(n.eventQueue_,e,y),$i(n,n.transactionQueueTree_)}}function Pr(n,e,t){return Pi(n.serverSyncTree_,e,t)||b.EMPTY_NODE}function $i(n,e=n.transactionQueueTree_){if(e||Fi(n,e),vt(e)){const t=cc(n,e);g(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&x_(n,On(e),t)}else ec(e)&&Mi(e,t=>{$i(n,t)})}function x_(n,e,t){const i=t.map(c=>c.currentWriteId),s=Pr(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];g(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=ne(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Ht(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(He(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();Fi(n,xi(n.transactionQueueTree_,e)),$i(n,n.transactionQueueTree_),le(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)Bt(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{ie("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Mt(n,e)}},o)}function Mt(n,e){const t=lc(n,e),i=On(t),s=cc(n,t);return M_(n,s,i),i}function M_(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=ne(t,l.path);let d=!1,u;if(g(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(He(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=w_)d=!0,u="maxretry",s=s.concat(He(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Pr(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){xn("transaction failed: Data returned ",p,l.path);let _=H(p);typeof p=="object"&&p!=null&&ve(p,".priority")||(_=_.updatePriority(h.getPriority()));const S=l.currentWriteId,z=Mn(n),J=Cr(_,h,z);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=J,l.currentWriteId=Li(n),o.splice(o.indexOf(S),1),s=s.concat(vr(n.serverSyncTree_,l.path,J,l.currentWriteId,l.applyLocally)),s=s.concat(He(n.serverSyncTree_,S,!0))}else d=!0,u="nodata",s=s.concat(He(n.serverSyncTree_,l.currentWriteId,!0))}le(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Fi(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Bt(i[a]);$i(n,n.transactionQueueTree_)}function lc(n,e){let t,i=n.transactionQueueTree_;for(t=I(e);t!==null&&vt(i)===void 0;)i=xi(i,t),e=D(e),t=I(e);return i}function cc(n,e){const t=[];return dc(n,e,t),t.sort((i,s)=>i.order-s.order),t}function dc(n,e,t){const i=vt(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Mi(e,s=>{dc(n,s,t)})}function Fi(n,e){const t=vt(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,kr(e,t.length>0?t:void 0)}Mi(e,i=>{Fi(n,i)})}function Or(n,e){const t=On(lc(n,e)),i=xi(n.transactionQueueTree_,e);return c_(i,s=>{os(n,s)}),os(n,i),tc(i,s=>{os(n,s)}),t}function os(n,e){const t=vt(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(g(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(He(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?kr(e,void 0):t.length=r+1,le(n.eventQueue_,On(e),s);for(let o=0;o<i.length;o++)Bt(i[o])}}/**
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
 */function D_(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function L_(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):ie(`Invalid query segment '${t}' in query '${n}'`)}return e}const zo=function(n,e){const t=$_(n),i=t.namespace;t.domain==="firebase.com"&&Oe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Oe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Kf();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new ml(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new O(t.pathString)}},$_=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(s=D_(n.substring(d,u)));const h=L_(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */const Yo="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",F_=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Yo.charAt(t%64),t=Math.floor(t/64);g(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Yo.charAt(e[s]);return g(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class U_{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+G(this.snapshot.exportVal())}}class V_{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class uc{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Dn{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return C(this._path)?null:rr(this._path)}get ref(){return new we(this._repo,this._path)}get _queryIdentifier(){const e=Mo(this._queryParams),t=tr(e);return t==="{}"?"default":t}get _queryObject(){return Mo(this._queryParams)}isEqual(e){if(e=ee(e),!(e instanceof Dn))return!1;const t=this._repo===e._repo,i=or(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Rp(this._path)}}function B_(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function W_(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===qe){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==dt)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(n.hasEnd()){if(n.getIndexEndName()!==Qe)throw new Error(i);if(typeof t!="string")throw new Error(s)}}else if(n.getIndex()===L){if(e!=null&&!gi(e)||t!=null&&!gi(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(g(n.getIndex()instanceof Pl||n.getIndex()===Ol,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class we extends Dn{constructor(e,t){super(e,t,new dr,!1)}get parent(){const e=Cl(this._path);return e===null?null:new we(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Dt{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new O(e),i=vn(this.ref,e);return new Dt(this._node.getChild(t),i,L)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Dt(s,vn(this.ref,i),L)))}hasChild(e){const t=new O(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function bt(n,e){return n=ee(n),n._checkNotDeleted("ref"),e!==void 0?vn(n._root,e):n._root}function vn(n,e){return n=ee(n),I(n._path)===null?__("child","path",e):sc("child","path",e),new we(n._repo,V(n._path,e))}function hc(n,e){n=ee(n),Rr("push",n._path),ic("push",e,n._path,!0);const t=ac(n._repo),i=F_(t),s=vn(n,i),r=vn(n,i);let o;return e!=null?o=H_(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function H_(n,e){n=ee(n),Rr("set",n._path),ic("set",e,n._path,!1);const t=new $t;return S_(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function U(n,e){m_("update",e,n._path);const t=new $t;return k_(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Xt(n){n=ee(n);const e=new uc(()=>{}),t=new Ui(e);return T_(n._repo,n,t).then(i=>new Dt(i,new we(n._repo,n._path),n._queryParams.getIndex()))}class Ui{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new U_("value",this,new Dt(e.snapshotNode,new we(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new V_(this,e,t):null}matches(e){return e instanceof Ui?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function j_(n,e,t,i,s){const r=new uc(t,void 0),o=new Ui(r);return R_(n._repo,n,o),()=>N_(n._repo,n,o)}function G_(n,e,t,i){return j_(n,"value",e)}class fc{}class K_ extends fc{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Dn(e._repo,e._path,Xp(e._queryParams,this._limit),e._orderByCalled)}}function Qo(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new K_(n)}class q_ extends fc{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){B_(e,"orderByKey");const t=Zp(e._queryParams,qe);return W_(t),new Dn(e._repo,e._path,t,!0)}}function Jo(){return new q_}function Xo(n,...e){let t=ee(n);for(const i of e)t=i._apply(t);return t}Bm(we);Km(we);/**
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
 */const z_="FIREBASE_DATABASE_EMULATOR_HOST",xs={};let Y_=!1;function Q_(n,e,t,i){n.repoInfo_=new ml(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function J_(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Oe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Y("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=zo(r,s),a=o.repoInfo,l;typeof process<"u"&&_o&&(l=_o[z_]),l?(r=`http://${l}?ns=${a.namespace}`,o=zo(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new ip(n.name,n.options,e);g_("Invalid Firebase Database URL",o),C(o.path)||Oe("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Z_(a,n,c,new np(n.name,t));return new eg(d,n)}function X_(n,e){const t=xs[e];(!t||t[n.key]!==n)&&Oe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),P_(n),delete t[n.key]}function Z_(n,e,t,i){let s=xs[e.name];s||(s={},xs[e.name]=s);let r=s[n.toURLString()];return r&&Oe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new I_(n,Y_,t,i),s[n.toURLString()]=r,r}class eg{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(E_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new we(this._repo,k())),this._rootInternal}_delete(){return this._rootInternal!==null&&(X_(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Oe("Cannot call "+e+" on a deleted database.")}}function tg(n=ba(),e){const t=Hs(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=md("database");i&&ng(t,...i)}return t}function ng(n,e,t,i={}){n=ee(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&Oe("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&Oe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Kn(Kn.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:_d(i.mockUserToken,n.app.options.projectId);r=new Kn(o)}Q_(s,e,t,r)}/**
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
 */function ig(n){Bf(Ut),Rt(new lt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return J_(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Ke(go,vo,n),Ke(go,vo,"esm2017")}/**
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
 */class sg{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function ce(n,e,t){var i;if(n=ee(n),Rr("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=(i=void 0)!==null&&i!==void 0?i:!0,r=new $t,o=(l,c,d)=>{let u=null;l?r.reject(l):(u=new Dt(d,new we(n._repo,n._path),L),r.resolve(new sg(c,u)))},a=G_(n,()=>{});return O_(n._repo,n._path,e,o,a,s),r.promise}ke.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ke.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};ig();const Ms={apiKey:"AIzaSyARFa-vzKVmIdxP5xDRXVzasL2ui94eZ-w",authDomain:"market-6e66a.firebaseapp.com",databaseURL:"https://market-6e66a-default-rtdb.firebaseio.com",projectId:"market-6e66a",storageBucket:"market-6e66a.firebasestorage.app",messagingSenderId:"402312269082",appId:"1:402312269082:web:cf304afc54057ea162b0a3"},rg=!!Ms.apiKey&&!!Ms.databaseURL;let Zt=null,Zo=null,ea=null;function Me(){return Zt||(Zt=va(Ms),Zo=Uf(Zt),ea=tg(Zt)),{app:Zt,auth:Zo,db:ea}}function og(){const{auth:n}=Me();return new Promise(e=>{let t=!1;const i=kh(n,s=>{t||(t=!0,i(),e(s||null))},()=>e(null));setTimeout(()=>{t||(t=!0,e(n.currentUser||null))},4e3)})}const ag="../STONK-Home/index.html",as=2600;function lg(n){return String(n||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"")}function cg(){return/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)||location.protocol==="file:"}function dg(n){const e=lg(n);return ag+(e?`?room=${encodeURIComponent(e)}`:"")}function ug({title:n="STONK Home에서 입장해 주세요",message:e="",roomCode:t="",auto:i=!0}={}){var l;const s=dg(t),r=document.getElementById("stonk-home-gate");r&&r.remove();const o=document.createElement("div");o.id="stonk-home-gate",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),Object.assign(o.style,{position:"fixed",inset:"0",zIndex:"99999",display:"grid",placeItems:"center",padding:"24px",background:"radial-gradient(120% 90% at 50% -10%, rgba(139,108,255,0.22), transparent 60%), rgba(5,6,10,0.94)",backdropFilter:"blur(8px)",color:"#f4f7ff",fontFamily:"Pretendard, Inter, 'Noto Sans KR', system-ui, sans-serif"});const a=i&&!cg();if(o.innerHTML=`
    <div style="width:min(460px,100%);text-align:center;padding:32px 26px;border:1px solid rgba(255,255,255,0.14);border-radius:18px;background:rgba(14,16,24,0.92);box-shadow:0 24px 70px rgba(0,0,0,0.5),0 0 60px rgba(139,108,255,0.16)">
      <div style="font-size:13px;font-weight:900;letter-spacing:2px;color:#8b6cff;margin-bottom:8px">STONK UNIVERSE</div>
      <h2 style="margin:0 0 10px;font-size:1.5rem">${n}</h2>
      <p style="margin:0 0 18px;color:#aab2c8;font-size:0.95rem;line-height:1.5">${e||"로그인 · 방 선택 · 닉네임 설정은 STONK Home에서 진행합니다."}</p>
      <a data-home-go href="${s}" style="display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 26px;border-radius:14px;font-weight:900;text-decoration:none;color:#0a0a12;background:linear-gradient(135deg,#a99bff,#8b6cff);box-shadow:0 10px 30px rgba(139,108,255,0.4)">STONK Home으로 이동</a>
      ${t?`<div style="margin-top:14px;font-size:0.82rem;color:#8a93a8">방 코드 <b style="color:#41e0ff;letter-spacing:2px">${t}</b> 유지</div>`:""}
      ${a?`<div style="margin-top:12px;font-size:0.8rem;color:#8a93a8"><span data-gate-count>${Math.ceil(as/1e3)}</span>초 후 자동 이동…</div>`:'<div style="margin-top:12px;font-size:0.78rem;color:#5f6678">개발 모드: 자동 이동 없음</div>'}
    </div>
  `,document.body.appendChild(o),(l=o.querySelector("[data-home-go]"))==null||l.addEventListener("click",c=>{c.preventDefault(),location.href=s}),a){let c=Math.ceil(as/1e3);const d=o.querySelector("[data-gate-count]"),u=setInterval(()=>{c-=1,d&&(d.textContent=String(Math.max(0,c))),c<=0&&clearInterval(u)},1e3);setTimeout(()=>{location.href=s},as)}return o}const tt="MAIN",xr=.002,Mr=.01,pc=60*60*1e3,bn=60,mc={d1:{id:"d1",label:"1일 정기예금",ms:24*3600*1e3,rate:.005,desc:"24시간 · 이자 0.5%"},d3:{id:"d3",label:"3일 정기예금",ms:72*3600*1e3,rate:.018,desc:"72시간 · 이자 1.8%"}},_c={S:5e7,A:3e7,B:15e6,C:7e6,D:3e6,F:0},gc={arcade:{id:"arcade",title:"Arcade 손실 완화 보험",premium:3e6,ms:24*3600*1e3,desc:"24시간 · 아케이드 큰 손실 시 일부 완화(예정)"},gacha:{id:"gacha",title:"Gacha 폭망 보호권",premium:5e6,ms:24*3600*1e3,desc:"24시간 · 가챠 과소비 경고 강화"},loan:{id:"loan",title:"대출 유예권",premium:2e6,ms:24*3600*1e3,desc:"24시간 · 대출 위험도를 한 단계 완화 표시(신용등급과는 별개)"}},vc={stable:{id:"stable",title:"안정형 펀드",ms:6*3600*1e3,min:-.01,max:.02,risk:"낮음"},growth:{id:"growth",title:"성장형 펀드",ms:12*3600*1e3,min:-.05,max:.08,risk:"중간"},ipo:{id:"ipo",title:"IPO 청약 상품",ms:24*3600*1e3,min:-.2,max:.35,risk:"높음"},lever:{id:"lever",title:"레버리지 펀드",ms:24*3600*1e3,min:-.4,max:.6,risk:"매우 높음"}},yn=["NORMAL","SILVER","GOLD","PLATINUM","BLACK"],bc={NORMAL:0,SILVER:30,GOLD:55,PLATINUM:78,BLACK:92},yc=.003,wc="GOLD",Ic={NORMAL:0,SILVER:.03,GOLD:.05,PLATINUM:.08,BLACK:.1},Ec={NORMAL:0,SILVER:0,GOLD:.003,PLATINUM:.0035,BLACK:.004};function Cc(n){return Ic[n]||0}function Tc(n){return Ec[n]||0}function xe(n){return Math.max(0,yn.indexOf(n||"NORMAL"))}const Sc={pbond:{id:"pbond",title:"PLATINUM 안정 채권",ms:24*3600*1e3,min:-.02,max:.04,risk:"낮음",requiredVipTier:"PLATINUM"},bsecret:{id:"bsecret",title:"BLACK 시크릿 펀드",ms:48*3600*1e3,min:-.15,max:.2,risk:"매우 높음",requiredVipTier:"BLACK"}},kc=12*3600*1e3,Ac=3,ft={BASIC:{id:"BASIC",title:"BASIC Card",limit:5e6,minGrade:"B",minVip:"NORMAL",insExtra:0,perk:"기본 게임머니 신용카드"},GOLD:{id:"GOLD",title:"GOLD Card",limit:2e7,minGrade:"A",minVip:"GOLD",insExtra:.02,perk:"보험 할인 +2% · 결제 알림 강화"},PLATINUM:{id:"PLATINUM",title:"PLATINUM Card",limit:5e7,minGrade:"S",minVip:"PLATINUM",insExtra:0,perk:"카드 이용 시 VIP 점수 소폭 +"},BLACK:{id:"BLACK",title:"BLACK Card",limit:1e8,minGrade:"S",minVip:"BLACK",insExtra:0,perk:"BLACK 전용 디자인 · 프리미엄 효과"}},Rc=["BASIC","GOLD","PLATINUM","BLACK"],hg={F:0,D:1,C:2,B:3,A:4,S:5};function wn(n){return hg[n]||0}const Vi={lowrate:{id:"lowrate",type:"lowrate",title:"저금리 데이",desc:"예금·대출 이자가 소폭 낮아집니다."},highrate:{id:"highrate",type:"highrate",title:"고금리 데이",desc:"예금·대출 이자가 소폭 높아지고 대출 경고가 강해집니다."},boom:{id:"boom",type:"boom",title:"투자 호황",desc:"신규 투자상품의 기대 상단이 소폭 올라갑니다."},bust:{id:"bust",type:"bust",title:"투자 침체",desc:"신규 투자상품의 손실 가능성이 커지고 경고가 강해집니다."},insurance:{id:"insurance",type:"insurance",title:"보험 우대 기간",desc:"보험 가입비가 추가 5% 할인됩니다(총 할인 최대 20%)."},cashback:{id:"cashback",type:"cashback",title:"카드 캐시백 이벤트",desc:"카드 납부 시 VIP 점수가 소폭 증가합니다."},vipweek:{id:"vipweek",type:"vipweek",title:"VIP 우대 기간",desc:"VIP 점수 획득과 VIP 금고 이자가 소폭 증가합니다."},caution:{id:"caution",type:"caution",title:"금융 경계주의보",desc:"대출·카드 고액 사용 경고가 강화됩니다. (보상 없음)"}},Ds=Object.keys(Vi);function jt(n){const e=n&&n.type,t={depositMult:1,loanMult:1,insExtraDisc:0,investMinAdd:0,investMaxAdd:0,vipVaultAdd:0,vipGainMult:1,cardCashbackVip:0,warnBoost:!1};return e==="lowrate"?(t.depositMult=.7,t.loanMult=.7):e==="highrate"?(t.depositMult=1.3,t.loanMult=1.3,t.warnBoost=!0):e==="boom"?t.investMaxAdd=.03:e==="bust"?(t.investMinAdd=-.05,t.warnBoost=!0):e==="insurance"?t.insExtraDisc=.05:e==="cashback"?t.cardCashbackVip=1:e==="vipweek"?(t.vipVaultAdd=5e-4,t.vipGainMult=1.2):e==="caution"&&(t.warnBoost=!0),t}function Nc(n){let e=2166136261;const t="bankevt:"+String(n);for(let s=0;s<t.length;s++)e^=t.charCodeAt(s),e=Math.imul(e,16777619);const i=Ds[(e>>>0)%Ds.length];return Object.assign({},Vi[i],{seed:t,manual:!1})}function Pc(n){const e=new Date((n||Date.now())+324e5);return`${e.getUTCFullYear()}-${e.getUTCMonth()+1}-${e.getUTCDate()}`}let pt=null;function Oc(n){pt=n||null}function R(n){const e=Number(n);return Number.isFinite(e)?e:0}function f(n){return Math.trunc(R(n))}function Z(n){return n=Math.round(R(n)),Math.max(0,Math.min(100,n))}function ge(n){return n=Z(n),n>=90?"S":n>=75?"A":n>=55?"B":n>=35?"C":n>=15?"D":"F"}function xc(n){return _c[n]??0}function P(n){return f(n).toLocaleString("ko-KR")+"원"}const fg=n=>bt(Me().db,`rooms/${tt}/players/${n}`),de=n=>bt(Me().db,`rooms/${tt}/players/${n}/cash`),B=n=>bt(Me().db,`rooms/${tt}/bank/${n}`),Mc=n=>bt(Me().db,`rooms/${tt}/bank/${n}/tx`),vi=n=>bt(Me().db,`rooms/${tt}/bank/${n}/messages`),pg=()=>bt(Me().db,`rooms/${tt}/bankEvents/current`);function Dc(n){return{enabled:!1,cardTier:"",cardLimit:0,usedAmount:0,billingAmount:0,dueAt:0,lastBilledAt:0,lastOverdueProcessedAt:0,overdue:!1,overdueCount:0,suspended:!1,createdAt:n||Date.now(),updatedAt:n||Date.now()}}function Lc(n,e){const t=n&&typeof n=="object"?n:{};return{enabled:!!t.enabled,cardTier:t.cardTier||"",cardLimit:Math.max(0,f(t.cardLimit)),usedAmount:Math.max(0,f(t.usedAmount)),billingAmount:Math.max(0,f(t.billingAmount)),dueAt:f(t.dueAt),lastBilledAt:f(t.lastBilledAt),lastOverdueProcessedAt:f(t.lastOverdueProcessedAt),overdue:!!t.overdue,overdueCount:Math.max(0,f(t.overdueCount)),suspended:!!t.suspended,createdAt:f(t.createdAt)||e,updatedAt:e}}function $c(n){return{balance:0,fixed:{},loanPrincipal:0,loanInterest:0,creditScore:bn,creditGrade:ge(bn),insurances:{},investments:{},vipScore:0,vipTier:"NORMAL",vipVaultBalance:0,card:Dc(n),lastInterestSettledAt:n,lastVipSettledAt:n,createdAt:n,updatedAt:n}}function mg(n,e){const t=$c(e),i=n&&typeof n=="object"?n:{};return{nickname:i.nickname||"",balance:Math.max(0,f(i.balance)),fixed:i.fixed&&typeof i.fixed=="object"?i.fixed:{},loanPrincipal:Math.max(0,f(i.loanPrincipal)),loanInterest:Math.max(0,f(i.loanInterest)),creditScore:Z(i.creditScore!=null?i.creditScore:bn),creditGrade:i.creditGrade||ge(i.creditScore!=null?i.creditScore:bn),insurances:i.insurances&&typeof i.insurances=="object"?i.insurances:{},investments:i.investments&&typeof i.investments=="object"?i.investments:{},vipScore:Z(i.vipScore),vipTier:i.vipTier||"NORMAL",vipVaultBalance:Math.max(0,f(i.vipVaultBalance)),card:Lc(i.card,e),lastInterestSettledAt:f(i.lastInterestSettledAt)||t.lastInterestSettledAt,lastVipSettledAt:f(i.lastVipSettledAt)||t.lastVipSettledAt,createdAt:f(i.createdAt)||e,updatedAt:e}}function X(n){return{nickname:n.nickname||"",balance:Math.max(0,f(n.balance)),fixed:n.fixed||{},loanPrincipal:Math.max(0,f(n.loanPrincipal)),loanInterest:Math.max(0,f(n.loanInterest)),creditScore:Z(n.creditScore),creditGrade:ge(n.creditScore),insurances:n.insurances||{},investments:n.investments||{},vipScore:Z(n.vipScore),vipTier:n.vipTier||"NORMAL",vipVaultBalance:Math.max(0,f(n.vipVaultBalance)),card:Lc(n.card,Date.now()),lastInterestSettledAt:f(n.lastInterestSettledAt),lastVipSettledAt:f(n.lastVipSettledAt)||f(n.lastInterestSettledAt),createdAt:f(n.createdAt),updatedAt:Date.now()}}function Dr(n,e){const t=f(n.lastInterestSettledAt)||e,i=Math.max(0,e-t),s=i/864e5,r=jt(pt),o=xr*r.depositMult,a=Mr*r.loanMult,l=s>0?Math.floor(R(n.balance)*o*s):0,c=s>0?Math.floor(R(n.loanPrincipal)*a*s):0,d=f(n.lastVipSettledAt)||t,u=Math.max(0,e-d)/864e5,h=(Tc(n.vipTier)||yc)+r.vipVaultAdd,p=u>0?Math.floor(R(n.vipVaultBalance)*h*u):0,_={...n};return(l>0||c>0)&&(_.balance=Math.max(0,f(n.balance)+l),_.loanInterest=Math.max(0,f(n.loanInterest)+c),_.lastInterestSettledAt=e),p>0&&(_.vipVaultBalance=Math.max(0,f(n.vipVaultBalance)+p),_.lastVipSettledAt=e),{bank:_,freeInt:l,loanInt:c,vipInt:p,elapsed:i}}function Gt(n){return Object.values(n.fixed||{}).reduce((e,t)=>e+f(t&&t.amount),0)}function Lr(n){const e=Date.now();return Object.values(n.investments||{}).reduce((t,i)=>!i||i.status==="settled"?t:t+(e>=R(i.maturesAt)?f(Wi(i).amount):f(i.principal)),0)}function Bi(n,e){return f(n)+f(e.balance)+Gt(e)+f(e.vipVaultBalance)+Lr(e)-f(e.loanPrincipal)-f(e.loanInterest)}function _g(n,e,t){let i=Z(n);const s=Bi(e,t),r=f(t.loanPrincipal)+f(t.loanInterest);return f(t.loanPrincipal)===0&&(i+=1),s<0&&(i-=5),r>f(e)+f(t.balance)+Gt(t)&&(i-=3),Z(i)}function x(n,e,t,i,s,r){return{type:n,title:e,amount:f(t),beforeCash:f(i),afterCash:f(s),memo:r||"",createdAt:Date.now()}}async function $(n,e){await hc(Mc(n),e)}function $r(n){return{type:n.type||"system",title:n.title||"",body:n.body||"",amount:f(n.amount),relatedId:n.relatedId||"",read:!1,actionLabel:n.actionLabel||"",actionUrl:n.actionUrl||"",createdAt:Date.now()}}async function De(n,e){await hc(vi(n),$r(e))}async function gg(n,e){await U(bt(Me().db,`rooms/${tt}/bank/${n}/messages/${e}`),{read:!0})}async function vg(n,e){const t={};(e||[]).forEach(i=>{i&&!i.read&&i.id&&(t[`${i.id}/read`]=!0)}),Object.keys(t).length&&await U(vi(n),t)}function Fc(n){return(n||[]).filter(e=>e&&!e.read).length}async function Fr(n){Me();const e=Date.now(),[t,i,s,r,o]=await Promise.all([Xt(fg(n)),Xt(B(n)),Xt(Xo(Mc(n),Jo(),Qo(20))),Xt(Xo(vi(n),Jo(),Qo(60))),Xt(pg())]),a=t.val()||{},l=f(a.cash),c=a.nickname||i.val()&&i.val().nickname||"플레이어",d=Uc(o.val(),e);Oc(d);let u=mg(i.val(),e);const h=!i.exists(),p=u.vipTier;u.nickname||(u.nickname=c);const _=Dr(u,e);let y=!1;const S=_.freeInt>0||_.loanInt>0||_.vipInt>0;h?(u=Ae(u,l),await U(B(n),X(u))):_.elapsed>=pc&&S?(u=_.bank,u.creditScore=_g(u.creditScore,l,u),u=Ae(u,l),await U(B(n),X(u)),_.freeInt>0&&await $(n,x("interest","자유예금 이자",_.freeInt,l,l,"")),_.loanInt>0&&await $(n,x("loanInterest","대출 이자",-_.loanInt,l,l,"")),_.vipInt>0&&await $(n,x("vipInterest","VIP 금고 이자",_.vipInt,l,l,"")),y=!0):(u=_.bank,u=Ae(u,l)),u.creditGrade=ge(u.creditScore);const z=s.exists()?Object.entries(s.val()).map(([F,fe])=>({id:F,...fe})).sort((F,fe)=>R(fe.createdAt)-R(F.createdAt)):[];let J=r.exists()?Object.entries(r.val()).map(([F,fe])=>({id:F,...fe})).sort((F,fe)=>R(fe.createdAt)-R(F.createdAt)):[];const oe=bg(u,e);if(oe.changed){oe.creditDelta&&(u.creditScore=Z(u.creditScore+oe.creditDelta),u.creditGrade=ge(u.creditScore)),await U(B(n),X(u));for(const F of oe.tx)await $(n,F)}J=await yg(n,u,p,J,e,oe.msgs);try{if(J.length>50){const F=J.slice().sort((ae,Ki)=>R(Ki.createdAt)-R(ae.createdAt)),fe=new Set(F.slice(0,50).map(ae=>ae.id)),Le=F.filter(ae=>ae.id&&!fe.has(ae.id)&&ae.read&&!String(ae.id).startsWith("local-"));if(Le.length){const ae={};Le.forEach(qt=>{ae[qt.id]=null}),await U(vi(n),ae),console.info("[bank] 오래된 알림 정리:",Le.length);const Ki=new Set(Le.map(qt=>qt.id));J=J.filter(qt=>!Ki.has(qt.id))}}}catch(F){console.warn("[bank] 알림 정리 실패:",F)}const yt=Object.values(u.fixed||{}).filter(F=>e>=R(F.maturesAt)).length,Ln=Object.values(u.investments||{}).filter(F=>F&&F.status!=="settled"&&e>=R(F.maturesAt)).length,Kt={freeInt:_.freeInt,loanInt:_.loanInt,vipInt:_.vipInt,maturedFixed:yt,maturedInvest:Ln,applied:y};return{uid:n,cash:l,nickname:c,bank:u,tx:z,msgs:J,unread:Fc(J),feed:Kt,event:d,settledNow:y}}function Uc(n,e){return e=e||Date.now(),n&&n.manual&&(!n.expiresAt||R(n.expiresAt)>e)&&n.type?Object.assign({},Vi[n.type]||{},n):Nc(Pc(e))}function bg(n,e){const t={changed:!1,creditDelta:0,msgs:[],tx:[]},i=n.card;if(!i||!i.enabled)return t;if(f(i.usedAmount)>0&&f(i.dueAt)>0&&e>=f(i.dueAt)&&(f(i.lastBilledAt)<f(i.dueAt)&&(i.billingAmount=f(i.usedAmount),i.lastBilledAt=f(i.dueAt),t.changed=!0,t.msgs.push({type:"card",title:"카드 결제일 도착",body:`STONK Card 청구액 ${P(i.billingAmount)}(게임머니) 납부가 필요합니다.`,relatedId:"cardbill-"+i.dueAt,actionLabel:"카드 탭에서 납부"}),t.tx.push(x("card_bill","카드 청구",i.billingAmount,0,0,"결제일 도래"))),f(i.billingAmount)>0&&e>=f(i.dueAt)+kc&&f(i.lastOverdueProcessedAt)<f(i.dueAt))){i.overdue=!0,i.overdueCount=f(i.overdueCount)+1,i.lastOverdueProcessedAt=f(i.dueAt),t.creditDelta-=5,t.changed=!0;let s=`STONK Card 청구액 ${P(i.billingAmount)} 미납으로 신용점수가 하락했습니다.`;i.overdueCount>=Ac&&(i.suspended=!0,s+=" 미납 누적으로 카드가 정지되었습니다.",t.msgs.push({type:"card",title:"카드 사용 정지",body:"미납 누적으로 STONK Card 사용이 정지되었습니다. 전액 납부 후 복구할 수 있습니다.",relatedId:"cardsusp-"+i.dueAt}),t.tx.push(x("card_suspend","카드 사용 정지",0,0,0,`미납 ${i.overdueCount}회`))),t.msgs.push({type:"card",title:"카드 미납 발생",body:s,relatedId:"cardover-"+i.dueAt}),t.tx.push(x("card_overdue","카드 미납",0,0,0,`청구 ${P(i.billingAmount)} 미납 · 신용 -5`))}return t}async function yg(n,e,t,i,s,r){const o=new Set((i||[]).map(d=>d.relatedId).filter(Boolean)),a=[],l=async d=>{if(d.relatedId&&o.has(d.relatedId))return;d.relatedId&&o.add(d.relatedId);const u=$r(d);await De(n,d),a.push({id:"local-"+Math.random().toString(36).slice(2),...u})};for(const d of r||[])await l(d);const c={};for(const d of Object.values(e.insurances||{}))d&&d.status==="active"&&R(d.expiresAt)<=s&&(d.status="expired",c[`insurances/${d.id}/status`]="expired",await l({type:"insurance",title:"보험 만료",body:`${d.title}이(가) 만료되었습니다.`,relatedId:"insexp-"+d.id}));Object.keys(c).length&&await U(B(n),c);for(const d of Object.values(e.fixed||{}))d&&s>=R(d.maturesAt)&&await l({type:"fixed",title:"정기예금 만기 도착",body:`${d.title||d.label} 수령이 가능합니다.`,relatedId:"fixmat-"+d.id,actionLabel:"예금 탭에서 수령",actionUrl:""});for(const d of Object.values(e.investments||{}))if(d&&d.status!=="settled"&&s>=R(d.maturesAt)){const u=Wi(d);await l({type:"investment",title:"투자상품 만기 도착",body:`${d.title} 만기 · 예상 ${(u.rate*100).toFixed(1)}%. 수령이 가능합니다.`,relatedId:"invmat-"+d.id})}return xe(e.vipTier)>xe(t)&&(await l({type:"vip",title:"VIP 등급 상승",body:`${At(e.vipTier)} 등급으로 승급했습니다.${e.vipTier==="GOLD"?" VIP 금고가 해금되었습니다.":""}`,relatedId:"viptier-"+e.vipTier}),await $(n,x("vip_tier_up","VIP 등급 상승",0,0,0,`${At(t)} → ${At(e.vipTier)}`))),a.length?[...a,...i||[]].sort((d,u)=>R(u.createdAt)-R(d.createdAt)):i}async function ue(n,e,t){const i=Date.now(),s=Dr(e,i);return(s.freeInt>0||s.loanInt>0)&&(s.freeInt>0&&await $(n,x("interest","자유예금 이자",s.freeInt,t,t,"")),s.loanInt>0&&await $(n,x("loanInterest","대출 이자",-s.loanInt,t,t,""))),s.bank}function bi(n,e,t){return n.creditScore=Z(n.creditScore+e),n.creditGrade=ge(n.creditScore),n}async function Vc(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");let i=await ue(n,{...t.bank},t.cash),s=0;const r=f(t.cash),o=await ce(de(n),c=>{const d=c==null?r:f(c);if(s=Math.min(e,d),!(s<=0))return d-s});if(!o.committed||s<=0)throw new Error("보유 현금이 없습니다.");const a=f((o.snapshot&&o.snapshot.val())??t.cash)+s,l=a-s;return i.balance=Math.max(0,f(i.balance)+s),await U(B(n),X(i)),await $(n,x("deposit","자유예금 입금",s,a,l,"")),s<e?`입금 완료 (가용 현금 ${P(s)})`:"입금 완료"}async function Bc(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");if(e>f(t.bank.balance))throw new Error("예금 잔액이 부족합니다.");let i=await ue(n,{...t.bank},t.cash);e>f(i.balance)&&(e=f(i.balance)),i.balance=Math.max(0,f(i.balance)-e),await U(B(n),X(i));const s=f(t.cash);return await ce(de(n),r=>f(r)+e),await $(n,x("withdraw","자유예금 출금",e,s,s+e,"")),"출금 완료"}async function Wc(n,e,t,i){const s=mc[e];if(!s)throw new Error("상품을 선택하세요.");if(t=f(t),t<=0)throw new Error("금액을 확인하세요.");if(t>f(i.cash))throw new Error("보유 현금이 부족합니다.");let r=await ue(n,{...i.bank},i.cash);const o=f(i.cash);if(!(await ce(de(n),u=>{const h=u==null?o:f(u);if(!(h<t))return h-t})).committed)throw new Error("보유 현금이 부족합니다.");const l=Date.now(),c="f"+l.toString(36);r.fixed=r.fixed||{},r.fixed[c]={id:c,product:e,label:s.label,amount:t,rate:s.rate,startedAt:l,maturesAt:l+s.ms},await U(B(n),X(r));const d=f(i.cash);return await $(n,x("fixedOpen",`${s.label} 가입`,t,d,d-t,"")),`${s.label} 가입 완료`}async function Hc(n,e,t){let i=await ue(n,{...t.bank},t.cash);const s=i.fixed&&i.fixed[e];if(!s)throw new Error("정기예금을 찾을 수 없습니다.");const r=f(s.amount);delete i.fixed[e],await U(B(n),X(i));const o=f(t.cash);return await ce(de(n),a=>f(a)+r),await $(n,x("fixedCancel",`${s.label} 중도해지 (이자 미지급)`,r,o,o+r,"만기 전 해지")),"중도해지 — 원금만 반환되었습니다."}async function jc(n,e,t){let i=await ue(n,{...t.bank},t.cash);const s=i.fixed&&i.fixed[e];if(!s)throw new Error("정기예금을 찾을 수 없습니다.");if(Date.now()<f(s.maturesAt))throw new Error("아직 만기가 되지 않았습니다.");const r=f(s.amount),o=Math.floor(r*R(s.rate)),a=r+o;delete i.fixed[e],i=bi(i,1,t.cash),await U(B(n),X(i));const l=f(t.cash);return await ce(de(n),c=>f(c)+a),await $(n,x("fixedClaim",`${s.label} 만기수령 (원금+이자)`,a,l,l+a,`이자 ${P(o)}`)),await De(n,{type:"fixed",title:"정기예금 수령 완료",body:`${s.label} ${P(a)}을(를) 수령했습니다. (이자 ${P(o)})`,amount:a,relatedId:"fixclaim-"+e}),`만기 수령 완료 (+${P(o)} 이자)`}async function Gc(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");let i=await ue(n,{...t.bank},t.cash);const s=ge(i.creditScore),r=xc(s),o=f(i.loanPrincipal);if(r<=0)throw new Error("현재 신용등급(F)으로는 대출이 불가합니다.");if(o+e>r)throw new Error(`대출 한도 초과 (한도 ${P(r)}, 현재 잔액 ${P(o)})`);i.loanPrincipal=o+e;const a=Hi(i).find(c=>c.type==="loan");i=bi(i,a?-1:-3,t.cash),a&&(i.insurances[a.id].status="used",i.insurances[a.id].usedAt=Date.now()),await U(B(n),X(i));const l=f(t.cash);return await ce(de(n),c=>f(c)+e),await $(n,x("loan","대출 실행",e,l,l+e,`잔액 ${P(i.loanPrincipal)}${a?" · 유예권 적용":""}`)),a&&(await $(n,x("insurance_used","대출 유예권 적용",0,l,l,"신용점수 하락 완화(-3 → -1)")),await De(n,{type:"insurance",title:"대출 유예권 사용됨",body:"대출 실행 시 신용점수 하락이 완화되었습니다.",relatedId:"insused-"+a.id})),`대출 완료 (+${P(e)})${a?" · 유예권으로 신용 하락 완화":""}`}async function Ls(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");if(e>f(t.cash))throw new Error("보유 현금이 부족합니다.");let i=await ue(n,{...t.bank},t.cash);const s=f(i.loanPrincipal)+f(i.loanInterest);if(s<=0)throw new Error("상환할 대출이 없습니다.");const r=Math.min(e,s),o=f(t.cash);if(!(await ce(de(n),p=>{const _=p==null?o:f(p);if(!(_<r))return _-r})).committed)throw new Error("보유 현금이 부족합니다.");let l=r;const c=Math.min(l,f(i.loanInterest));i.loanInterest=Math.max(0,f(i.loanInterest)-c),l-=c;const d=Math.min(l,f(i.loanPrincipal));i.loanPrincipal=Math.max(0,f(i.loanPrincipal)-d);const u=i.loanPrincipal<=0;u?(i.loanInterest=0,i=bi(i,5,t.cash)):i=bi(i,1,t.cash),await U(B(n),X(i));const h=f(t.cash);return await $(n,x("repay",u?"대출 전액 상환":"대출 상환",-r,h,h-r,`이자 ${P(c)} · 원금 ${P(d)}`)),u?"전액 상환 완료 🎉":`상환 완료 (이자 ${P(c)} · 원금 ${P(d)})`}function Kc(n){n=Z(n);let e="NORMAL";for(const t of yn)n>=bc[t]&&(e=t);return e}function At(n){return{NORMAL:"일반",SILVER:"실버",GOLD:"골드",PLATINUM:"플래티넘",BLACK:"블랙"}[n]||"일반"}function Ae(n,e){const t={...n},i=f(n.balance)+Gt(n)+f(n.vipVaultBalance),s=Bi(e,n);let r=0;return r+=Math.min(40,Math.floor(i/25e5)),r+=Math.min(25,Math.floor(Math.max(0,s)/4e6)),r+=Object.keys(n.fixed||{}).length?8:0,r+=Object.keys(n.investments||{}).length?8:0,r+=Object.keys(n.insurances||{}).length?5:0,r+=f(n.loanPrincipal)===0?6:0,r+=Math.min(8,Z(n.creditScore)>=75?8:0),r=Math.round(r*jt(pt).vipGainMult),t.vipScore=Z(r),t.vipTier=Kc(t.vipScore),t}function wg(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function ta(n){let e=(wg(String(n))||1)>>>0;return e^=e<<13,e>>>=0,e^=e>>17,e^=e<<5,e>>>=0,e%1e5/1e5}function Ur(n){return vc[n]||Sc[n]||null}function Wi(n){const e=Ur(n.productType)||{},t={min:n.expectedMinRate!=null?R(n.expectedMinRate):R(e.min),max:n.expectedMaxRate!=null?R(n.expectedMaxRate):R(e.max)},i=ta(n.seed),s=ta(n.seed+"x"),r=(i+s)/2,o=.45,a=t.min+(t.max-t.min)*(r*(1-o)+o*.5+(r-.5)*o),l=Math.max(t.min,Math.min(t.max,a)),c=f(n.principal),d=Math.max(0,Math.round(c*(1+l)));return{rate:l,amount:d,profit:d-c}}function qc(n){return n>=.25?["대박","win"]:n>=.05?["성공","ok"]:n>-.02?["보합","flat"]:n>-.2?["손실","lose"]:["폭락","crash"]}function Ig(n,e){if(Bi(n,e)<0)return{key:"severe",label:"심각",tone:"danger"};const i=f(e.loanPrincipal)+f(e.loanInterest);if(i<=0)return{key:"safe",label:"안전",tone:"ok"};const s=f(n)+f(e.balance)+Gt(e)+f(e.vipVaultBalance)+Lr(e),r=s>0?i/s:1;let o=r<.3?{key:"ok",label:"관리 가능",tone:"ok"}:r<.7?{key:"warn",label:"주의",tone:"warn"}:{key:"high",label:"위험",tone:"danger"};return Hi(e).some(a=>a.type==="loan")&&(o.key==="high"?o={key:"warn",label:"주의",tone:"warn"}:o.key==="warn"&&(o={key:"ok",label:"관리 가능",tone:"ok"}),o.eased=!0),o.ratio=r,o}function Eg(n,e){const t=f(e.balance)+Gt(e)+f(e.vipVaultBalance);if(t<=0)return{label:"미이용",tone:"muted"};const i=[];return Object.keys(e.fixed||{}).length&&i.push("장기 예치 중"),t>f(n)&&i.push("보수적 운용"),i.unshift("안정 자산 보유"),{label:i.join(" · "),tone:"ok"}}function zc(n,e){return n&&n.status!=="expired"&&R(n.expiresAt)>(e||Date.now())}function Hi(n,e){return e=e||Date.now(),Object.values(n.insurances||{}).filter(t=>zc(t,e))}async function Cg(n,e,t){const i=gc[e];if(!i)throw new Error("보험 상품을 선택하세요.");let s=await ue(n,{...t.bank},t.cash);const r=Date.now();if(Hi(s,r).some(S=>S.type===e))throw new Error("이미 가입 중인 보험입니다.");const o=t.bank.vipTier||"NORMAL",a=jt(pt),l=t.bank.card&&t.bank.card.enabled&&ft[t.bank.card.cardTier]?ft[t.bank.card.cardTier].insExtra:0,c=Math.min(.2,Cc(o)+a.insExtraDisc+l),d=Math.max(1,Math.floor(i.premium*(1-c)));if(d>f(t.cash))throw new Error("보유 현금이 부족합니다.");const u=f(t.cash);if(!(await ce(de(n),S=>{const z=S==null?u:f(S);if(!(z<d))return z-d})).committed)throw new Error("보유 현금이 부족합니다.");const p="ins"+r.toString(36);s.insurances=s.insurances||{},s.insurances[p]={id:p,type:e,title:i.title,premium:d,basePremium:i.premium,status:"active",startedAt:r,expiresAt:r+i.ms,usedAt:0,createdAt:r},s=Ae(s,t.cash),await U(B(n),X(s));const _=f(t.cash),y=c>0?`할인 ${Math.round(c*100)}% 적용${a.insExtraDisc>0?" (보험 우대 이벤트 포함)":""}`:"";return await $(n,x("insurance_buy",`${i.title} 가입`,-d,_,_-d,y)),await De(n,{type:"insurance",title:"보험 가입 완료",body:`${i.title}에 가입했습니다.${y?" ("+y+")":""}`,amount:-d,relatedId:"insbuy-"+p}),`${i.title} 가입 완료${c>0?` · ${Math.round(c*100)}% 할인`:""}`}async function Tg(n,e,t,i){const s=Ur(e);if(!s)throw new Error("투자상품을 선택하세요.");if(s.requiredVipTier&&xe(i.bank.vipTier)<xe(s.requiredVipTier))throw new Error(`${At(s.requiredVipTier)} 등급부터 가입 가능한 상품입니다.`);if(t=f(t),t<=0)throw new Error("금액을 확인하세요.");if(t>f(i.cash))throw new Error("보유 현금이 부족합니다.");let r=await ue(n,{...i.bank},i.cash);const o=f(i.cash);if(!(await ce(de(n),S=>{const z=S==null?o:f(S);if(!(z<t))return z-t})).committed)throw new Error("보유 현금이 부족합니다.");const l=Date.now(),c="inv"+l.toString(36),d=n+":"+c+":"+l,u=jt(pt),h=R(s.min)+u.investMinAdd,p=R(s.max)+u.investMaxAdd;r.investments=r.investments||{},r.investments[c]={id:c,productType:e,title:s.title,principal:t,expectedMinRate:h,expectedMaxRate:p,status:"active",seed:d,startedAt:l,maturesAt:l+s.ms,resultRate:null,resultAmount:null,settledAt:0,createdAt:l},r=Ae(r,i.cash),await U(B(n),X(r));const _=f(i.cash),y=u.investMinAdd||u.investMaxAdd?` · ${pt.title} 반영`:"";return await $(n,x("investment_buy",`${s.title} 가입`,-t,_,_-t,`위험도 ${s.risk}${y}`)),`${s.title} 가입 완료${y}`}async function Sg(n,e,t){let i=await ue(n,{...t.bank},t.cash);const s=i.investments&&i.investments[e];if(!s)throw new Error("투자상품을 찾을 수 없습니다.");if(Date.now()<R(s.maturesAt))throw new Error("아직 만기가 되지 않았습니다.");if(s.status==="settled")throw new Error("이미 정산된 상품입니다.");const r=Wi(s);delete i.investments[e],i=Ae(i,t.cash),await U(B(n),X(i));const o=f(t.cash);await ce(de(n),l=>f(l)+r.amount);const[a]=qc(r.rate);return await $(n,x("investment_settle",`${s.title} 정산 · ${a}`,r.amount,o,o+r.amount,`${(r.rate*100).toFixed(1)}%`)),await De(n,{type:"investment",title:"투자 정산 완료",body:`${s.title} 정산: ${P(r.amount)} 수령 (${(r.rate*100).toFixed(1)}%, ${a})`,amount:r.amount,relatedId:"invsettle-"+e}),`${a}! ${r.profit>=0?"+":"−"}${P(Math.abs(r.profit))} (${(r.rate*100).toFixed(1)}%)`}function Yc(n){return yn.indexOf(n.vipTier||"NORMAL")>=yn.indexOf(wc)}async function kg(n,e,t){if(!Yc(t.bank))throw new Error("VIP 금고는 GOLD 등급부터 이용 가능합니다.");if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");let i=await ue(n,{...t.bank},t.cash),s=0;const r=f(t.cash);if(!(await ce(de(n),l=>{const c=l==null?r:f(l);if(s=Math.min(e,c),!(s<=0))return c-s})).committed||s<=0)throw new Error("보유 현금이 없습니다.");i.vipVaultBalance=Math.max(0,f(i.vipVaultBalance)+s),i=Ae(i,t.cash),await U(B(n),X(i));const a=f(t.cash);return await $(n,x("vip_deposit","VIP 금고 입금",s,a,a-s,"")),s<e?`VIP 금고 입금 (가용 ${P(s)})`:"VIP 금고 입금 완료"}async function Ag(n,e,t){if(e=f(e),e<=0)throw new Error("금액을 확인하세요.");if(e>f(t.bank.vipVaultBalance))throw new Error("VIP 금고 잔액이 부족합니다.");let i=await ue(n,{...t.bank},t.cash);e>f(i.vipVaultBalance)&&(e=f(i.vipVaultBalance)),i.vipVaultBalance=Math.max(0,f(i.vipVaultBalance)-e),i=Ae(i,t.cash),await U(B(n),X(i));const s=f(t.cash);return await ce(de(n),r=>f(r)+e),await $(n,x("vip_withdraw","VIP 금고 출금",e,s,s+e,"")),"VIP 금고 출금 완료"}function Rg(n){const e=ge(n.creditScore),t=n.vipTier||"NORMAL";let i="";for(const s of Rc){const r=ft[s];(wn(e)>=wn(r.minGrade)||xe(t)>=xe(r.minVip))&&(i=s)}return i}function Vr(n,e){const t=ft[e];if(!t)return!1;const i=ge(n.creditScore);return wn(i)>=wn(t.minGrade)||xe(n.vipTier||"NORMAL")>=xe(t.minVip)}function Ng(n){return Math.max(0,f(n&&n.cardLimit)-f(n&&n.usedAmount))}async function Pg(n,e,t){const i={...t.bank};if(i.card&&i.card.enabled)throw new Error("이미 카드를 발급했습니다. 업그레이드를 이용하세요.");const s=ft[e];if(!s)throw new Error("카드 등급을 선택하세요.");if(!Vr(i,e))throw new Error(`${s.title} 발급 조건(신용 ${s.minGrade}↑ 또는 VIP ${At(s.minVip)}↑)을 충족하지 않습니다.`);const r=Date.now(),o=Object.assign(Dc(r),{enabled:!0,cardTier:e,cardLimit:s.limit});return await U(B(n),{card:o}),await $(n,x("card_issue",`${s.title} 발급`,0,f(t.cash),f(t.cash),`한도 ${P(s.limit)}`)),await De(n,{type:"card",title:"STONK Card 발급 완료",body:`${s.title}(게임머니 신용카드)가 발급되었습니다. 한도 ${P(s.limit)}.`,relatedId:"cardissue-"+r}),`${s.title} 발급 완료`}async function Og(n,e,t){const i={...t.bank};if(!i.card||!i.card.enabled)throw new Error("먼저 카드를 발급하세요.");const s=ft[e];if(!s)throw new Error("카드 등급을 선택하세요.");if(!Vr(i,e))throw new Error(`${s.title} 조건을 충족하지 않습니다.`);if(f(i.card.billingAmount)>0||i.card.overdue)throw new Error("미납 청구액이 있으면 업그레이드할 수 없습니다.");return await U(B(n),{"card/cardTier":e,"card/cardLimit":s.limit,"card/updatedAt":Date.now()}),await $(n,x("card_upgrade",`${s.title} 전환`,0,f(t.cash),f(t.cash),`한도 ${P(s.limit)}`)),await De(n,{type:"card",title:"카드 등급 변경",body:`${s.title}로 변경되었습니다. 한도 ${P(s.limit)}.`,relatedId:"cardup-"+Date.now()}),`${s.title}로 변경 완료`}async function xg(n,e,t){let i=await ue(n,{...t.bank},t.cash);const s=i.card;if(!s||!s.enabled)throw new Error("카드가 없습니다.");const r=Math.max(f(s.billingAmount),f(s.usedAmount));if(r<=0)throw new Error("납부할 청구액이 없습니다.");let o=Math.min(Math.max(0,f(e)),r);if(o<=0)throw new Error("금액을 확인하세요.");if(o>f(t.cash))throw new Error("보유 현금이 부족합니다.");const a=f(t.cash);if(!(await ce(de(n),h=>{const p=h==null?a:f(h);if(!(p<o))return p-o})).committed)throw new Error("보유 현금이 부족합니다.");s.usedAmount=Math.max(0,f(s.usedAmount)-o),s.billingAmount=Math.max(0,f(s.billingAmount)-o);let c=!1;s.usedAmount<=0?(s.usedAmount=0,s.billingAmount=0,s.overdue=!1,s.dueAt=0,s.lastBilledAt=0,s.lastOverdueProcessedAt=0,s.suspended=!1,i.creditScore=Z(i.creditScore+1),c=!0):s.billingAmount<=0&&(s.overdue=!1);const d=jt(pt);d.cardCashbackVip>0&&(i.vipScore=Z(i.vipScore+d.cardCashbackVip)),i=Ae(i,t.cash),i.creditGrade=ge(i.creditScore),await U(B(n),X(i));const u=f(t.cash);return await $(n,x("card_pay","카드 납부",-o,u,u-o,c?"전액 납부 완료":`일부 납부 · 잔여 ${P(s.usedAmount)}`)),await De(n,{type:"card",title:"카드 납부 완료",body:`${P(o)} 납부되었습니다.${c?" 청구액을 모두 정리했습니다.":` 남은 청구 ${P(s.usedAmount)}.`}${d.cardCashbackVip>0?" (캐시백 이벤트: VIP+1)":""}`,amount:-o,relatedId:"cardpay-"+Date.now()}),c?"카드 전액 납부 완료":`카드 납부 완료 (잔여 ${P(s.usedAmount)})`}async function Mg(n,e){const i={...e.bank}.card;if(!i||!i.enabled)throw new Error("카드가 없습니다.");if(!i.suspended)throw new Error("정지 상태가 아닙니다.");if(f(i.usedAmount)>0||f(i.billingAmount)>0||i.overdue)throw new Error("미납 청구액을 먼저 정리하세요.");return await U(B(n),{"card/suspended":!1,"card/overdueCount":0,"card/updatedAt":Date.now()}),await $(n,x("card_restore","카드 사용 복구",0,f(e.cash),f(e.cash),"정지 해제")),await De(n,{type:"card",title:"카드 사용 복구",body:"STONK Card 사용이 복구되었습니다.",relatedId:"cardrestore-"+Date.now()}),"카드 사용이 복구되었습니다"}const Dg=Object.freeze(Object.defineProperty({__proto__:null,BANK_EVENTS:Vi,BANK_EVENT_IDS:Ds,CARD_GRACE_MS:kc,CARD_SUSPEND_OVERDUE:Ac,CARD_TIERS:ft,CARD_TIER_ORDER:Rc,FIXED_PRODUCTS:mc,FREE_RATE_DAY:xr,INIT_CREDIT:bn,INSURANCE_PRODUCTS:gc,INVESTMENT_PRODUCTS:vc,LOAN_LIMIT_BY_GRADE:_c,LOAN_RATE_DAY:Mr,MIN_AUTOSETTLE_MS:pc,ROOM:tt,VIP_DISCOUNT:Ic,VIP_INVESTMENT_PRODUCTS:Sc,VIP_TIERS:yn,VIP_TIER_MIN:bc,VIP_VAULT_MIN_TIER:wc,VIP_VAULT_RATE_BY_TIER:Ec,VIP_VAULT_RATE_DAY:yc,activeInsurances:Hi,buyInsurance:Cg,buyInvestment:Tg,cancelFixed:Hc,cardCanIssue:Vr,cardEligibleTier:Rg,cardRemaining:Ng,claimFixed:jc,claimInvestment:Sg,clampScore:Z,computeSeedEvent:Nc,dateKeyKST:Pc,defaultBank:$c,depositFree:Vc,depositStability:Eg,depositVip:kg,eventEffects:jt,fixedTotal:Gt,gradeFromScore:ge,gradeRank:wn,insuranceActive:zc,int:f,investLabel:qc,investOutcome:Wi,investProduct:Ur,investmentsValue:Lr,issueCard:Pg,loadState:Fr,loanLimit:xc,loanRisk:Ig,markAllMessagesRead:vg,markMessageRead:gg,msgItem:$r,netWorth:Bi,num:R,openFixed:Wc,payCard:xg,repayLoan:Ls,resolveEvent:Uc,restoreCard:Mg,setActiveEvent:Oc,settleInterest:Dr,takeLoan:Gc,txItem:x,unreadCount:Fc,upgradeCard:Og,vipDiscount:Cc,vipRank:xe,vipTierFromScore:Kc,vipTierLabel:At,vipVaultRate:Tc,vipVaultUnlocked:Yc,withdrawFree:Bc,withdrawVip:Ag,won:P},Symbol.toStringTag,{value:"Module"})),{won:v,int:T,num:j,fixedTotal:Qc,netWorth:Jc,gradeFromScore:ji,loanLimit:Br,FIXED_PRODUCTS:Lg,INSURANCE_PRODUCTS:Xc,INVESTMENT_PRODUCTS:$g,VIP_INVESTMENT_PRODUCTS:Fg,investmentsValue:Ug,investOutcome:Zc,investLabel:Vg,loanRisk:Bg,depositStability:Wg,activeInsurances:Hg,insuranceActive:ls,buyInsurance:jg,buyInvestment:Gg,claimInvestment:Kg,vipTierLabel:mt,vipVaultUnlocked:ed,depositVip:qg,withdrawVip:zg,VIP_VAULT_RATE_DAY:Yg,vipDiscount:Qg,vipVaultRate:Jg,vipRank:yi,markMessageRead:Xg,markAllMessagesRead:Zg,unreadCount:ev,CARD_TIERS:Vn,CARD_TIER_ORDER:cs,cardEligibleTier:td,cardCanIssue:na,cardRemaining:tv,issueCard:nv,upgradeCard:iv,payCard:sv,restoreCard:rv}=Dg,ov="yaV8N60yIiUggaWNpNF2VhkCwxb2",av="tomem@naver.com",W=document.getElementById("app");let m=null,nd=!1,wi="dashboard",en="all",ds=!1,ia=!1;lv();async function lv(){if(!rg){sa("Firebase 설정이 비어 있습니다.");return}hv();let n=null;try{n=await og()}catch{}if(!n){ug({message:"STONK Home에서 로그인 후 이용해 주세요. 같은 계정의 자산이 그대로 연결됩니다."}),fv();return}try{nd=n.uid===ov||String(n.email||"").toLowerCase()===av,m=await Fr(n.uid),st(),yv()}catch(e){console.error("[bank] 로드 실패:",e),sa("은행 데이터를 불러오지 못했습니다: "+(e&&e.message))}}async function cv(){if(m){try{m=await Fr(m.uid)}catch(n){console.warn(n)}st()}}function A(n){return String(n??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function In(n,e="ok"){const t=document.createElement("div");t.className="bk-toast "+e,t.textContent=n,document.body.appendChild(t),setTimeout(()=>{t.classList.add("hide"),setTimeout(()=>t.remove(),280)},2200)}async function te(n){if(!ds){ds=!0;try{const e=await n();e&&In(e,"ok"),await cv()}catch(e){In(e&&e.message||"오류가 발생했습니다.","err")}finally{ds=!1}}}function Ie(n){const e=document.getElementById(n);return e?Math.floor(Number(e.value)||0):0}function dv(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function uv(n){return n=Math.floor(Number(n)||0),n>=1e7||m&&m.cash>0&&n>=m.cash*.3}function Bn(n,e,t){if(!uv(n))return te(t);const i=document.createElement("div");i.className="bk-modal-dim",i.innerHTML=`<div class="bk-modal">
    <h3>고액 거래 확인</h3>
    <p class="bk-modal-amt">${v(n)}</p>
    <p class="bk-note">STONK 가상 게임머니 거래입니다. 진행하시겠어요?</p>
    <div class="bk-modal-stage" hidden><span class="bk-spin"></span> <span class="bk-modal-label">${A(e||"처리 중...")}</span></div>
    <div class="bk-modal-btns"><button class="bk-btn" data-mc="cancel" type="button">취소</button><button class="bk-btn primary" data-mc="ok" type="button">확인</button></div>
  </div>`,document.body.appendChild(i);const s=()=>i.remove();i.querySelector('[data-mc="cancel"]').onclick=s,i.addEventListener("click",r=>{r.target===i&&s()}),i.querySelector('[data-mc="ok"]').onclick=()=>{i.querySelector(".bk-modal-btns").hidden=!0,i.querySelector(".bk-modal-stage").hidden=!1,setTimeout(()=>{s(),te(t)},dv()?0:600)}}function hv(){W.innerHTML='<div class="bk-center"><div class="bk-spin"></div><p>STONK Bank 연결 중…</p></div>'}function sa(n){W.innerHTML=`<div class="bk-center"><h2>⚠️ 오류</h2><p>${A(n)}</p><a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로</a></div>`}function fv(){W.innerHTML=`<div class="bk-center">
    <div class="bk-logo"><span class="bk-mark">$</span><b>STONK</b> Bank</div>
    <h2>로그인이 필요합니다</h2>
    <p class="muted">STONK Home에서 로그인 후 이용해 주세요.<br>같은 계정의 보유 현금이 그대로 연결됩니다.</p>
    <a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로 이동</a>
  </div>`}function id(n){return`<span class="bk-grade g-${n}">${n}</span>`}function st(){if(!m)return;const n=m.bank,e=T(n.balance)+Qc(n),t=Jc(m.cash,n),i=ji(n.creditScore);W.className=n.vipTier==="BLACK"?"is-black":"",W.innerHTML=`
    <header class="bk-header">
      <a class="bk-brand" href="#" data-home title="STONK Bank 메인"><span class="bk-mark">$</span><b>STONK</b> Bank</a>
      <div class="bk-nav">
        <a href="../STONK-Home/index.html">홈</a>
        <a href="../STONK-Battle/index.html">주식시장</a>
        <a href="../STONK-Board/index.html">주식소식</a>
        <a href="../STONK-Wiki/index.html">주식정보</a>
        <a href="../STONK-Arcade/index.html">아케이드</a>
        <a href="../STONK-Gacha/index.html">가챠</a>
        ${nd?'<a href="../STONK-Admin/market-admin.html">관리자</a>':""}
      </div>
      <div class="bk-user">
        <button class="bk-bell" type="button" data-tab="messages" title="알림/우편함" aria-label="알림">🔔${m.unread>0?`<span class="bk-bell-dot">${m.unread>99?"99+":m.unread}</span>`:""}</button>
        <span class="bk-nick">${A(m.nickname)}</span>${Ii(n.vipTier)}${id(i)}
      </div>
    </header>

    <section class="bk-summary">
      <div class="bk-sum-card net"><span>순자산</span><b class="${t<0?"minus":""}">${v(t)}</b></div>
      <div class="bk-sum-card cash"><span>보유 현금</span><b>${v(m.cash)}</b></div>
      <div class="bk-sum-card dep"><span>총 예금</span><b>${v(e)}</b></div>
      <div class="bk-sum-card loan"><span>대출 잔액</span><b class="${T(n.loanPrincipal)>0?"warn":""}">${v(n.loanPrincipal)}</b></div>
    </section>

    <nav class="bk-tabs">
      ${["dashboard:대시보드","deposit:예금","loan:대출","card:카드","insurance:보험","invest:투자","vip:VIP","messages:알림","history:거래내역"].map(s=>{const[r,o]=s.split(":");return`<button class="bk-tab ${wi===r?"active":""}" data-tab="${r}">${o}</button>`}).join("")}
    </nav>

    <main class="bk-main">${pv(wi)}</main>
    <footer class="bk-footer">모든 금액은 STONK 가상 게임머니입니다. 실제 화폐·투자와 무관합니다.</footer>
  `,Fv()}function pv(n){return n==="deposit"?kv():n==="loan"?Av():n==="insurance"?xv():n==="invest"?Mv():n==="vip"?Lv():n==="card"?gv():n==="messages"?bv():n==="history"?Nv():Iv()}function $s(){const n=m.event;return n?`<div class="bk-event-banner ev-${A(n.type)}">
    <span class="bk-event-ico">📰</span>
    <div><b>오늘의 금융 이벤트 · ${A(n.title)}</b><small>${A(n.desc)} <i class="muted">(게임머니 금융 이벤트)</i></small></div>
  </div>`:""}const mv={BASIC:"BASIC",GOLD:"GOLD",PLATINUM:"PLATINUM",BLACK:"BLACK"};function _v(){return m.bank&&m.bank.card||{}}function sd(n,e){const t=n.cardTier||"BASIC",i=T(n.usedAmount),s=T(n.cardLimit)||1,r=Math.min(100,Math.round(i/s*100)),o=n.suspended?"suspended":n.overdue?"overdue":r>=80?"near":"";return`<div class="stonk-card tier-${t} ${o} ${e?"compact":""}">
    <div class="sc-top"><span class="sc-brand">STONK</span><span class="sc-tier">${mv[t]||t}</span></div>
    <div class="sc-num">•••• •••• •••• ${String(1e3+r%9e3).slice(-4)}</div>
    <div class="sc-foot"><span>사용 ${v(i)} / 한도 ${v(n.cardLimit)}</span>${n.suspended?'<b class="sc-flag">정지</b>':n.overdue?'<b class="sc-flag">미납</b>':""}</div>
    <div class="sc-gauge"><span style="width:${r}%"></span></div>
  </div>`}function gv(){const n=_v(),e=td(m.bank),t=tv(n),i=Math.max(T(n.billingAmount),T(n.usedAmount)),s=T(n.dueAt)>0?Math.max(0,T(n.dueAt)-Date.now()):0;if(!n.enabled)return`${$s()}
      <div class="bk-grid">
        <div class="bk-card">
          <h3>STONK Card 발급 <span class="bk-tag risk">게임머니 신용카드</span></h3>
          <p class="bk-note">현금이 부족해도 한도 내에서 Gacha·Arcade 결제가 가능한 <b>게임머니 신용 결제 수단</b>입니다. 실제 결제가 아닙니다.</p>
          ${cs.map(a=>{const l=Vn[a],c=na(m.bank,a);return`<label class="bk-product ${c?"":"locked"}"><input type="radio" name="cardTier" value="${a}" ${a===e?"checked":""} ${c?"":"disabled"}/>
              <span><b>${l.title} ${c?'<small class="bk-tag safe">발급 가능</small>':'<small class="bk-tag risk">조건 미달</small>'}</b>
              <small>한도 ${v(l.limit)} · 조건 신용 ${l.minGrade}↑ 또는 VIP ${mt(l.minVip)}↑ · ${A(l.perk)}</small></span></label>`}).join("")}
          <button class="bk-btn primary" data-act="cardIssue" ${e?"":"disabled"}>${e?"카드 발급":"발급 조건 미달"}</button>
        </div>
        <div class="bk-card"><h3>안내</h3><p class="bk-note">카드 사용액은 즉시 차감되지 않고 누적되어 <b>24시간 뒤 청구</b>됩니다. 청구 후 12시간 내 미납 시 신용점수가 하락하고, 미납이 누적되면 카드가 정지됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p></div>
      </div>`;const r=cs[cs.indexOf(n.cardTier)+1],o=r&&na(m.bank,r)&&!n.overdue&&i<=0;return`${$s()}
    <div class="bk-grid">
      <div class="bk-card">
        <h3>내 카드</h3>
        ${sd(n)}
        <div class="bk-row"><span>남은 한도</span><b>${v(t)}</b></div>
        <div class="bk-row"><span>청구 예정/청구액</span><b class="${i>0?"warn":""}">${v(i)}</b></div>
        <div class="bk-row"><span>결제일</span><b>${T(n.dueAt)>0?s>0?"D-"+En(s):"도래(납부 필요)":"이용 없음"}</b></div>
        <div class="bk-row"><span>상태</span><b>${n.suspended?qn("정지","danger"):n.overdue?qn("미납","danger"):qn("정상","ok")}</b></div>
      </div>
      <div class="bk-card">
        <h3>납부 / 관리</h3>
        <div class="bk-amount"><input id="cardPayAmt" type="number" inputmode="numeric" placeholder="납부 금액" min="1" /><span class="bk-suffix">원</span></div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="cardPayAmt:maxpay">전액(${v(i)})</button></div>
        <div class="bk-btnrow"><button class="bk-btn primary" data-act="cardPay" ${i>0?"":"disabled"}>납부하기</button>
          ${n.suspended?'<button class="bk-btn" data-act="cardRestore">카드 복구</button>':o?`<button class="bk-btn" data-act="cardUpgrade" data-tier="${r}">${Vn[r].title}로 업그레이드</button>`:`<button class="bk-btn" disabled>${i>0?"납부 후 업그레이드":"최고 등급"}</button>`}</div>
        <p class="bk-note">납부는 보유 현금에서 차감됩니다. 일부 납부도 가능합니다. 보유 현금 ${v(m.cash)} · 혜택: ${A(Vn[n.cardTier]?Vn[n.cardTier].perk:"")}</p>
      </div>
    </div>`}const vv={insurance:"🛡️",investment:"📈",fixed:"🏦",vip:"👑",loan:"⚠️",admin:"🛠️",system:"🔔"};function rd(n){const e=vv[n.type]||"🔔";return`<li class="bk-msg ${n.read?"":"unread"}" ${n.id&&!String(n.id).startsWith("local-")?`data-msgread="${A(n.id)}"`:""}>
    <span class="bk-msg-ico">${e}</span>
    <div class="bk-msg-mid"><b>${A(n.title)}</b><small>${A(n.body)}</small><i class="bk-msg-time">${Gi(n.createdAt)}</i></div>
    ${n.actionUrl?`<a class="bk-btn ghost small" href="${A(n.actionUrl)}">${A(n.actionLabel||"이동")}</a>`:""}
    ${n.read?"":'<span class="bk-msg-new">N</span>'}</li>`}function bv(){const n=(m.msgs||[]).slice(0,30);return`<div class="bk-card">
    <h3>알림 / 우편함 <small class="muted">안읽음 ${m.unread||0} · 최근 ${n.length}건</small>
      ${m.unread>0?'<button class="bk-btn ghost small" data-allread style="float:right">전체 읽음</button>':""}</h3>
    ${n.length?`<ul class="bk-msgs">${n.map(rd).join("")}</ul>`:'<p class="bk-empty">받은 알림이 없습니다.</p>'}
    <p class="bk-note">보험 적용·투자/정기 만기·VIP 승급 등 금융 이벤트가 여기에 기록됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p>
  </div>`}function yv(){if(ia||!m||!m.feed)return;ia=!0;const n=m.feed,e=[];n.applied&&n.freeInt>0&&e.push(`자유예금 이자 +${v(n.freeInt)} 정산`),n.applied&&n.vipInt>0&&e.push(`VIP 금고 이자 +${v(n.vipInt)} 정산`),n.applied&&n.loanInt>0&&e.push(`대출 이자 +${v(n.loanInt)} 반영`),n.maturedFixed>0&&e.push(`정기예금 만기 ${n.maturedFixed}건`),n.maturedInvest>0&&e.push(`투자 정산 가능 ${n.maturedInvest}건`),e.length&&In(e.join(" · "),n.loanInt>0&&!n.freeInt?"warn":"ok")}function wv(){const n=m.feed;if(!n)return"";const e=[];return n.applied&&n.freeInt>0&&e.push(`<span class="ok">자유예금 이자 +${v(n.freeInt)}</span>`),n.applied&&n.vipInt>0&&e.push(`<span class="ok">VIP 금고 이자 +${v(n.vipInt)}</span>`),n.applied&&n.loanInt>0&&e.push(`<span class="warn">대출 이자 +${v(n.loanInt)}</span>`),n.maturedFixed>0&&e.push(`<span>정기예금 만기 ${n.maturedFixed}건</span>`),n.maturedInvest>0&&e.push(`<span>투자 정산 가능 ${n.maturedInvest}건</span>`),e.length?`<div class="bk-feed">🔔 ${e.join(" · ")}</div>`:""}function Iv(){const n=m.bank,e=ji(n.creditScore),t=Z(n.creditScore),i=Jc(m.cash,n),s=Bg(m.cash,n),r=Wg(m.cash,n),o=m.feed||{},a=o.applied?T(o.freeInt)+T(o.vipInt):0,l=Object.values(n.investments||{}),c=l.filter(y=>Date.now()>=j(y.maturesAt)).length,d=l.reduce((y,S)=>y+(Date.now()>=j(S.maturesAt)?Zc(S).profit:0),0),u=Hg(n),h=(m.tx||[]).slice(0,3),p=n.card||{},_=Math.max(T(p.billingAmount),T(p.usedAmount));return`
    ${$s()}
    ${wv()}
    <div class="bk-grid">
      <div class="bk-card net-hero">
        <h3>순자산</h3>
        <div class="bk-net-big ${i<0?"minus":""}">${v(i)}</div>
        <div class="bk-chips">
          <span class="bk-chip"><i>현금</i>${v(m.cash)}</span>
          <span class="bk-chip"><i>예금</i>${v(T(n.balance)+Qc(n))}</span>
          <span class="bk-chip"><i>VIP금고</i>${v(n.vipVaultBalance)}</span>
          <span class="bk-chip"><i>투자</i>${v(Ug(n))}</span>
          <span class="bk-chip ${T(n.loanPrincipal)>0?"warn":""}"><i>대출</i>${v(T(n.loanPrincipal)+T(n.loanInterest))}</span>
        </div>
      </div>

      <div class="bk-card credit">
        <h3>신용등급 <span class="bk-tag ${t>=75?"safe":"risk"}">${e}</span></h3>
        <div class="bk-credit"><div class="bk-grade-big g-${e}">${e}</div><div class="bk-score"><div class="bk-score-bar"><span style="width:${t}%"></span></div><small>${t} / 100 · 한도 ${v(Br(e))}</small></div></div>
        <div class="bk-row"><span>VIP 등급</span><b>${Ii(n.vipTier)} <small class="muted">${n.vipScore}점</small></b></div>
      </div>

      <div class="bk-card">
        <h3>리스크 진단</h3>
        <div class="bk-row"><span>대출 위험도</span><b>${qn(s.label,s.tone)}${s.eased?' <small class="muted">유예권 적용</small>':""}</b></div>
        <div class="bk-row"><span>예금 안정도</span><b class="${r.tone==="ok"?"ok":"muted"}">${r.label}</b></div>
        <div class="bk-row"><span>오늘 정산 이자</span><b class="${a>0?"ok":"muted"}">${a>0?"+"+v(a):"정산 없음"}</b></div>
        ${s.key==="high"||s.key==="severe"?'<p class="bk-note danger">자산 대비 대출 비중이 높습니다. 상환을 권장합니다.</p>':""}
      </div>

      <div class="bk-card">
        <h3>보험 <span class="bk-tag safe">${u.length}건 유효</span></h3>
        ${u.length?u.map(y=>`<div class="bk-row"><span>${A(y.title)}</span><b class="ok">유효</b></div>`).join(""):'<p class="bk-empty">가입한 보험이 없습니다.</p>'}
        <button class="bk-btn ghost small" data-tab="insurance">보험 보기</button>
      </div>

      <div class="bk-card">
        <h3>투자상품</h3>
        <div class="bk-row"><span>보유 상품</span><b>${l.length}건</b></div>
        <div class="bk-row"><span>정산 가능</span><b class="${c>0?"ok":"muted"}">${c}건</b></div>
        <div class="bk-row"><span>정산 가능 평가손익</span><b class="${d>0?"ok":d<0?"warn":"muted"}">${d>=0?"+":"−"}${v(Math.abs(d))}</b></div>
        <button class="bk-btn ghost small" data-tab="invest">투자 보기</button>
      </div>

      <div class="bk-card">
        <h3>VIP</h3>
        <div class="bk-row"><span>등급 / 점수</span><b>${Ii(n.vipTier)} ${n.vipScore}점</b></div>
        <div class="bk-row"><span>VIP 금고</span><b>${v(n.vipVaultBalance)} <small class="muted">${ed(n)?"":"· 잠금"}</small></b></div>
        <button class="bk-btn ghost small" data-tab="vip">VIP 보기</button>
      </div>

      <div class="bk-card">
        <h3>알림 <span class="bk-tag ${m.unread>0?"risk":"safe"}">안읽음 ${m.unread||0}</span><button class="bk-btn ghost small" data-tab="messages" style="float:right">전체 보기</button></h3>
        ${(m.msgs||[]).length?`<ul class="bk-msgs mini">${(m.msgs||[]).slice(0,3).map(rd).join("")}</ul>`:'<p class="bk-empty">받은 알림이 없습니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>STONK Card <span class="bk-tag ${p.suspended||p.overdue?"risk":p.enabled?"safe":""}">${p.enabled?p.suspended?"정지":p.overdue?"미납":"정상":"미발급"}</span><button class="bk-btn ghost small" data-tab="card" style="float:right">카드</button></h3>
        ${p.enabled?sd(p,!0)+`<div class="bk-row"><span>청구 예정/청구</span><b class="${_>0?"warn":""}">${v(_)}</b></div>`:'<p class="bk-empty">카드를 발급하면 한도 내 게임머니 신용 결제가 가능합니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>Activity Feed <small class="muted">최근 활동</small></h3>
        ${ra().length?`<ul class="bk-activity">${ra().slice(0,8).map(Tv).join("")}</ul>`:'<p class="bk-empty">최근 활동이 없습니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>최근 거래 <button class="bk-btn ghost small" data-tab="history" style="float:right">전체 보기</button></h3>
        ${h.length?`<ul class="bk-tx mini">${h.map(od).join("")}</ul>`:'<p class="bk-empty">거래내역이 없습니다.</p>'}
      </div>
    </div>`}function qn(n,e){return`<span class="bk-status ${e}">${A(n)}</span>`}function Ii(n){return`<span class="bk-vip v-${n||"NORMAL"}">${A(mt(n))}</span>`}const Ev={deposit:"🏦",withdraw:"🏧",fixedOpen:"📦",fixedCancel:"📦",fixedClaim:"📦",loan:"📝",repay:"✅",interest:"💰",loanInterest:"⚠️",vipInterest:"👑",insurance_buy:"🛡️",insurance_used:"🛡️",investment_buy:"📈",investment_settle:"📊",vip_deposit:"👑",vip_withdraw:"👑",vip_tier_up:"⭐",card_issue:"💳",card_upgrade:"💳",card_use:"💳",card_pay:"✅",card_bill:"🧾",card_overdue:"🚨",card_suspend:"⛔",card_restore:"🔓",admin_adjust:"🛠️"};function Cv(n){const e=T(n.amount);switch(n.type){case"deposit":return`예금 ${v(e)}이 금고에 보관되었습니다.`;case"withdraw":return`예금 ${v(Math.abs(e))}을 인출했습니다.`;case"loan":return`대출 ${v(e)}이 승인되었습니다.`;case"repay":return`대출 ${v(Math.abs(e))}을 상환했습니다.`;case"fixedClaim":return`정기예금 ${v(e)}을 수령했습니다.`;case"investment_settle":return`${n.title}${n.memo?" · "+n.memo:""}`;case"insurance_used":return`${n.title}.`;case"card_issue":return"STONK Card가 발급되었습니다.";case"card_use":return`STONK Card 결제가 승인되었습니다. (${v(e)})`;case"card_pay":return`카드 청구액 ${v(Math.abs(e))}이 납부되었습니다.`;case"card_overdue":return"카드 미납이 발생했습니다.";case"vip_tier_up":return`VIP 등급이 상승했습니다.${n.memo?" ("+n.memo+")":""}`;default:return`${n.title||n.type}${e?" · "+(e>=0?"+":"−")+v(Math.abs(e)):""}`}}function ra(){return(m.tx||[]).slice(0,12)}function Tv(n){return`<li class="bk-act"><span class="bk-act-ico">${Ev[n.type]||"•"}</span><span class="bk-act-text">${A(Cv(n))}</span><i class="bk-act-time">${Gi(n.createdAt)}</i></li>`}function Sv(){const n=m.tx||[],e=Object.values(m.bank&&m.bank.insurances||{}),t=e.filter(a=>a.status==="used").length,i=e.filter(a=>a.status==="expired").length;let s=0,r=0,o=0;return n.forEach(a=>{a.type==="insurance_used"&&(/Arcade/.test(a.title||"")?s+=T(a.amount):/Gacha/.test(a.title||"")?r+=1:/유예/.test(a.title||"")&&(o+=1))}),{total:e.length,used:t,expired:i,arcadeRefund:s,gachaDust:r,loanGrace:o}}function kv(){const n=m.bank,e=Object.values(n.fixed||{}).sort((i,s)=>j(i.maturesAt)-j(s.maturesAt)),t=Date.now();return`
    <div class="bk-grid">
      <div class="bk-card">
        <h3>자유예금 <span class="bk-tag safe">자유 입출금</span></h3>
        <div class="bk-row"><span>예금 잔액</span><b>${v(n.balance)}</b></div>
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
        <p class="bk-note">보유 현금 ${v(m.cash)} · 이자 하루 ${(xr*100).toFixed(1)}%</p>
      </div>

      <div class="bk-card">
        <h3>정기예금 <span class="bk-tag safe">묶을수록 이자↑</span></h3>
        ${Object.values(Lg).map(i=>`
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
      ${e.length?`<div class="bk-fixedlist">${e.map(i=>{const s=t>=j(i.maturesAt),r=Math.max(0,j(i.maturesAt)-t),o=Math.floor(T(i.amount)*j(i.rate));return`<div class="bk-fixed ${s?"matured":""}">
          <div><b>${A(i.label)}</b><small>${v(i.amount)} · 이자 ${v(o)} ${s?"· <span class='ok'>만기 완료</span>":"· 남은 시간 "+En(r)}</small></div>
          <div class="bk-fixed-act">
            ${s?`<button class="bk-btn primary small" data-claim="${A(i.id)}">수령하기</button>`:`<button class="bk-btn small" data-cancel="${A(i.id)}">중도해지</button>`}
          </div>
        </div>`}).join("")}</div>`:'<p class="bk-empty">가입한 정기예금이 없습니다.</p>'}
    </div>`}function Av(){const n=m.bank,e=ji(n.creditScore),t=Br(e),i=Math.max(0,t-T(n.loanPrincipal));return`
    <div class="bk-grid">
      <div class="bk-card loanbox">
        <h3>대출 받기 <span class="bk-tag risk">위험</span></h3>
        <div class="bk-row"><span>내 등급 / 한도</span><b>${id(e)} ${v(t)}</b></div>
        <div class="bk-row"><span>추가 대출 가능</span><b>${v(i)}</b></div>
        <div class="bk-amount">
          <input id="loanAmt" type="number" inputmode="numeric" placeholder="대출 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="loanAmt:maxloan">최대</button></div>
        <button class="bk-btn danger" data-act="loan" ${t<=0?"disabled":""}>대출 받기</button>
        <p class="bk-note danger">이자 하루 ${(Mr*100).toFixed(1)}% — 갚지 않으면 빠르게 불어나고 신용등급이 떨어집니다.</p>
      </div>

      <div class="bk-card">
        <h3>상환하기</h3>
        <div class="bk-row"><span>대출 원금</span><b class="${T(n.loanPrincipal)>0?"warn":""}">${v(n.loanPrincipal)}</b></div>
        <div class="bk-row"><span>누적 이자</span><b class="${T(n.loanInterest)>0?"warn":""}">${v(n.loanInterest)}</b></div>
        <div class="bk-row total"><span>상환할 금액</span><b>${v(T(n.loanPrincipal)+T(n.loanInterest))}</b></div>
        <div class="bk-amount">
          <input id="repayAmt" type="number" inputmode="numeric" placeholder="상환 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-btnrow">
          <button class="bk-btn primary" data-act="repay">상환하기</button>
          <button class="bk-btn" data-act="repayAll">전액 상환</button>
        </div>
        <p class="bk-note">상환은 <b>이자부터</b> 갚고 남은 금액으로 원금을 갚습니다. 보유 현금 ${v(m.cash)}</p>
      </div>
    </div>`}const Rv={deposit:["입금","in"],withdraw:["출금","out"],fixedOpen:["정기가입","out"],fixedCancel:["중도해지","in"],fixedClaim:["만기수령","in"],loan:["대출","in"],repay:["상환","out"],interest:["예금이자","in"],loanInterest:["대출이자","out"],vipInterest:["VIP이자","in"],insurance_buy:["보험가입","out"],insurance_expired:["보험만료","out"],insurance_used:["보험사용","in"],investment_buy:["투자가입","out"],investment_settle:["투자정산","in"],investment_cancel:["투자해지","in"],vip_deposit:["VIP입금","in"],vip_withdraw:["VIP출금","out"],vip_tier_up:["VIP승급","in"],card_issue:["카드발급","in"],card_upgrade:["카드전환","in"],card_use:["카드결제","out"],card_bill:["카드청구","out"],card_pay:["카드납부","out"],card_overdue:["카드미납","out"],card_suspend:["카드정지","out"],card_restore:["카드복구","in"],admin_adjust:["관리자조정","in"]},oa={all:null,deposit:["deposit","withdraw"],fixed:["fixedOpen","fixedCancel","fixedClaim"],loan:["loan","repay"],interest:["interest","loanInterest","vipInterest"],insurance:["insurance_buy","insurance_expired","insurance_used"],invest:["investment_buy","investment_settle","investment_cancel"],vip:["vip_deposit","vip_withdraw","vip_tier_up"],card:["card_issue","card_upgrade","card_use","card_bill","card_pay","card_overdue","card_suspend","card_restore"]},us={all:"전체",deposit:"예금",fixed:"정기예금",loan:"대출",interest:"이자",insurance:"보험",invest:"투자",vip:"VIP",card:"카드"};function od(n){const e=Rv[n.type]||[n.type,"in"],t=T(n.amount),i=t>=0?"plus":"minus";return`<li><span class="bk-tx-badge t-${e[1]}">${e[0]}</span>
    <div class="bk-tx-mid"><b>${A(n.title||e[0])}</b><small>${Gi(n.createdAt)}${n.memo?" · "+A(n.memo):""}</small></div>
    <b class="bk-tx-amt ${i}">${t>=0?"+":"−"}${v(Math.abs(t))}</b></li>`}function Nv(){const n=m.tx||[],e=oa[en],t=(e?n.filter(i=>e.includes(i.type)):n).slice(0,50);return`<div class="bk-card">
    <h3>거래내역 <small class="muted">${us[en]} · ${t.length}건</small></h3>
    <div class="bk-filters">
      ${Object.keys(oa).map(i=>`<button class="bk-chipbtn ${en===i?"active":""}" data-filter="${i}">${us[i]}</button>`).join("")}
    </div>
    ${t.length?`<ul class="bk-tx">${t.map(od).join("")}</ul>`:`<p class="bk-empty">${us[en]} 거래내역이 없습니다.</p>`}
  </div>`}const Pv={arcade:"Arcade에서 100만원 이상 손실 시 1회에 한해 손실액의 10%를 환급합니다. (자동 적용)",gacha:"10회 뽑기에서 Epic 이상이 없거나 Common이 8개 이상일 때 Dust 300을 지급합니다. (자동 적용)",loan:"대출 실행 또는 대출 위험도 하락 시 신용점수 하락을 1회 완화합니다. (자동 적용)"};function Ov(n,e){return n.status==="used"?'<span class="bk-status ok">사용됨</span>':n.status==="expired"||j(n.expiresAt)<=e?'<span class="bk-status muted">만료</span>':'<span class="bk-status warn">활성</span>'}function xv(){const n=m.bank,e=Date.now(),t=n.vipTier||"NORMAL",i=Qg(t),s=Object.values(n.insurances||{}),r=s.filter(o=>o.status==="used").sort((o,a)=>j(a.usedAt)-j(o.usedAt)).slice(0,3);return`
    <div class="bk-grid">
      ${Object.values(Xc).map(o=>{const a=s.find(c=>c.type===o.id&&ls(c,e)),l=Math.max(1,Math.floor(o.premium*(1-i)));return`<div class="bk-card">
          <h3>${A(o.title)} ${a?'<span class="bk-tag safe">가입중</span>':'<span class="bk-tag risk">게임머니 보호</span>'}</h3>
          <p class="bk-note">${A(Pv[o.id]||o.desc)}</p>
          <div class="bk-row"><span>가입비</span><b>${i>0?`<s class="muted">${v(o.premium)}</s> ${v(l)}`:v(o.premium)}</b></div>
          ${i>0?`<div class="bk-row"><span>VIP 할인</span><b class="ok">${mt(t)} ${Math.round(i*100)}%</b></div>`:""}
          ${a?`<div class="bk-row"><span>만료까지</span><b class="ok">${En(Math.max(0,j(a.expiresAt)-e))}</b></div>
               <button class="bk-btn" disabled>가입 중</button>`:`<button class="bk-btn primary" data-buyins="${o.id}">${v(l)} 가입하기</button>`}
        </div>`}).join("")}
    </div>
    <div class="bk-card">
      <h3>보험 통계 <small class="muted">게임머니 보호 기능</small></h3>
      ${(()=>{const o=Sv();return`
        <div class="bk-row"><span>총 가입 / 사용됨 / 만료</span><b>${o.total} / <span class="ok">${o.used}</span> / <span class="muted">${o.expired}</span></b></div>
        <div class="bk-row"><span>Arcade 보험 총 환급액</span><b>${v(o.arcadeRefund)}</b></div>
        <div class="bk-row"><span>Gacha 보호권 지급</span><b>${o.gachaDust}회</b></div>
        <div class="bk-row"><span>대출 유예권 사용</span><b>${o.loanGrace}회</b></div>`})()}
    </div>
    ${r.length?`<div class="bk-card">
      <h3>최근 보험 적용 기록</h3>
      <div class="bk-fixedlist">${r.map(o=>`<div class="bk-fixed matured"><div><b>${A(o.title)}</b><small>${o.usedAt?Gi(o.usedAt)+" 적용됨":"적용됨"}</small></div><span class="bk-status ok">사용됨</span></div>`).join("")}</div>
    </div>`:""}
    <div class="bk-card">
      <h3>내 보험 내역</h3>
      ${s.length?`<div class="bk-fixedlist">${s.sort((o,a)=>j(a.startedAt)-j(o.startedAt)).map(o=>`
        <div class="bk-fixed ${ls(o,e)?"matured":""}">
          <div><b>${A(o.title)}</b><small>${v(o.premium)} · ${ls(o,e)?"만료 "+En(Math.max(0,j(o.expiresAt)-e)):o.status==="used"?"보상 적용 완료":"만료됨"}</small></div>
          ${Ov(o,e)}
        </div>`).join("")}</div>`:'<p class="bk-empty">가입 이력이 없습니다.</p>'}
      <p class="bk-note">보험은 손실을 완화/보호하는 <b>게임머니 보호 기능</b>입니다. 무한 증식 수단이 아닙니다.</p>
    </div>`}function Mv(){const n=m.bank,e=Date.now(),t=Object.values(n.investments||{}).sort((i,s)=>j(i.maturesAt)-j(s.maturesAt));return`
    <div class="bk-grid">
      <div class="bk-card">
        <h3>투자상품 가입 <span class="bk-tag risk">원금 손실 가능</span></h3>
        ${[...Object.values($g),...Object.values(Fg)].map(i=>{const s=i.requiredVipTier&&yi(n.vipTier)<yi(i.requiredVipTier);return`<label class="bk-product ${s?"locked":""}"><input type="radio" name="invProd" value="${i.id}" ${i.id==="stable"?"checked":""} ${s?"disabled":""}/>
            <span><b>${A(i.title)} <small class="bk-risk r-${A(i.risk)}">${A(i.risk)}</small>${i.requiredVipTier?` <small class="bk-tag ${s?"risk":"safe"}">${mt(i.requiredVipTier)} 전용</small>`:""}</b>
            <small>${$v(i.ms)} · 예상 ${(i.min*100).toFixed(0)}% ~ +${(i.max*100).toFixed(0)}%${s?` · ${mt(i.requiredVipTier)} 등급 필요`:""}</small></span></label>`}).join("")}
        <div class="bk-amount">
          <input id="invAmt" type="number" inputmode="numeric" placeholder="투자 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="invAmt:maxin">최대</button></div>
        <button class="bk-btn primary" data-act="buyInvest">투자하기</button>
        <p class="bk-note">만기 전 해지는 불가합니다. 결과는 가입 시점에 확정되어 새로고침해도 바뀌지 않습니다. 보유 현금 ${v(m.cash)}</p>
      </div>
      <div class="bk-card">
        <h3>안내</h3>
        <p class="bk-note">Battle의 실시간 매매와 달리, 투자상품은 <b>만기 후 자동 정산</b>되는 금융상품입니다. 레버리지 펀드는 손실 폭이 큽니다.</p>
        <p class="bk-note">모든 결과는 STONK 가상 게임머니 기준입니다.</p>
      </div>
    </div>
    <div class="bk-card">
      <h3>보유 투자상품</h3>
      ${t.length?`<div class="bk-fixedlist">${t.map(i=>{const s=e>=j(i.maturesAt),r=s?Zc(i):null,[o,a]=r?Vg(r.rate):["",""];return`<div class="bk-fixed ${s?"matured":""}">
          <div><b>${A(i.title)}</b><small>${v(i.principal)} · ${s?`<span class="inv-${a}">${o} ${r.rate>=0?"+":"−"}${v(Math.abs(r.profit))}</span>`:"남은 시간 "+En(Math.max(0,j(i.maturesAt)-e))}</small></div>
          <div class="bk-fixed-act">${s?`<button class="bk-btn primary small" data-claiminv="${A(i.id)}">수령하기</button>`:'<span class="bk-tag">운용중</span>'}</div>
        </div>`}).join("")}</div>`:'<p class="bk-empty">보유한 투자상품이 없습니다.</p>'}
    </div>`}const Dv={NORMAL:["기본 Bank 기능 사용"],SILVER:["보험 가입비 3% 할인","거래내역 SILVER 표시"],GOLD:["VIP 금고 사용 가능","보험 가입비 5% 할인","VIP 금고 이자 하루 0.30%"],PLATINUM:["VIP 금고 이자 하루 0.35%","보험 가입비 8% 할인","PLATINUM 안정 채권 해금"],BLACK:["VIP 금고 이자 하루 0.40%","보험 가입비 10% 할인","BLACK 시크릿 펀드 해금","대시보드 BLACK 전용 효과"]};function Lv(){const n=m.bank,e=ed(n),t=n.vipTier||"NORMAL",i=Jg(t)||Yg;return`
    <div class="bk-grid">
      <div class="bk-card credit ${t==="BLACK"?"black-card":""}">
        <h3>VIP 등급 ${t==="BLACK"?'<span class="bk-tag" style="background:#14151c;color:#f0d488">BLACK 혜택 활성화</span>':""}</h3>
        <div class="bk-credit"><div class="bk-grade-big v-${t}">${mt(t).slice(0,1)}</div>
          <div class="bk-score"><div class="bk-score-bar"><span style="width:${n.vipScore}%"></span></div><small>${mt(t)} · ${n.vipScore} / 100</small></div></div>
        <p class="bk-note">예금·정기·투자·보험 이용과 무대출·높은 순자산으로 VIP 점수가 오릅니다. GOLD 등급부터 VIP 금고가 열립니다.</p>
      </div>
      <div class="bk-card">
        <h3>등급별 혜택</h3>
        ${["SILVER","GOLD","PLATINUM","BLACK"].map(s=>`
          <div class="bk-row"><span>${Ii(s)}</span><b class="${yi(t)>=yi(s)?"ok":"muted"}" style="font-weight:600;font-size:12px;text-align:right">${Dv[s].join(" · ")}</b></div>`).join("")}
      </div>
      <div class="bk-card">
        <h3>VIP 금고 ${e?'<span class="bk-tag safe">이용 가능</span>':'<span class="bk-tag risk">GOLD부터 잠금</span>'}</h3>
        <div class="bk-row"><span>금고 잔액</span><b>${v(n.vipVaultBalance)}</b></div>
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
        <p class="bk-note">VIP 금고 이자는 등급이 높을수록 올라갑니다(과도한 수익 방지를 위해 낮게 유지). 보유 현금 ${v(m.cash)}</p>`:'<p class="bk-note">현재 등급에서는 VIP 금고가 잠겨 있습니다. 예금·투자 등을 이용해 <b>GOLD</b> 등급에 도달하면 열립니다.</p>'}
      </div>
    </div>`}function $v(n){return Math.round(n/36e5)+"시간"}function En(n){const e=Math.floor(n/36e5),t=Math.floor(n%36e5/6e4);return e>0?`${e}시간 ${t}분`:`${t}분`}function Gi(n){const e=new Date(j(n)||Date.now()),t=i=>(i<10?"0":"")+i;return`${e.getMonth()+1}/${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function Fv(){const n=W.querySelector("[data-home]");n&&n.addEventListener("click",t=>{t.preventDefault(),wi="dashboard",window.scrollTo(0,0),st()}),W.querySelectorAll("[data-tab]").forEach(t=>t.addEventListener("click",()=>{wi=t.dataset.tab,st()})),W.querySelectorAll("[data-fill]").forEach(t=>t.addEventListener("click",()=>Uv(t.dataset.fill))),W.querySelectorAll("[data-act]").forEach(t=>t.addEventListener("click",()=>Vv(t.dataset.act))),W.querySelectorAll("[data-claim]").forEach(t=>t.addEventListener("click",()=>te(()=>jc(m.uid,t.dataset.claim,m)))),W.querySelectorAll("[data-cancel]").forEach(t=>t.addEventListener("click",()=>{confirm("정기예금을 중도해지하면 이자 없이 원금만 돌려받습니다. 해지할까요?")&&te(()=>Hc(m.uid,t.dataset.cancel,m))})),W.querySelectorAll("[data-claiminv]").forEach(t=>t.addEventListener("click",()=>te(()=>Kg(m.uid,t.dataset.claiminv,m)))),W.querySelectorAll("[data-buyins]").forEach(t=>t.addEventListener("click",()=>{const i=Xc[t.dataset.buyins];i&&confirm(`${i.title} 가입비 ${v(i.premium)}을(를) 결제할까요? (게임머니)`)&&te(()=>jg(m.uid,t.dataset.buyins,m))})),W.querySelectorAll("[data-filter]").forEach(t=>t.addEventListener("click",()=>{en=t.dataset.filter,st()})),W.querySelectorAll("[data-msgread]").forEach(t=>t.addEventListener("click",()=>{const i=(m.msgs||[]).find(s=>s.id===t.dataset.msgread);i&&!i.read&&(i.read=!0,m.unread=ev(m.msgs),Xg(m.uid,i.id).catch(()=>{}),st())}));const e=W.querySelector("[data-allread]");e&&e.addEventListener("click",()=>{Zg(m.uid,m.msgs).catch(()=>{}),(m.msgs||[]).forEach(t=>{t.read=!0}),m.unread=0,st()})}function Uv(n){const[e,t]=n.split(":"),i=document.getElementById(e);if(!i)return;const s=m.bank;let r=0;if(t==="maxin")r=T(m.cash);else if(t==="maxout")r=T(s.balance);else if(t==="maxvip")r=T(s.vipVaultBalance);else if(t==="maxloan")r=Math.max(0,Br(ji(s.creditScore))-T(s.loanPrincipal));else if(t==="maxpay"){const o=s.card||{};r=Math.min(T(m.cash),Math.max(T(o.billingAmount),T(o.usedAmount)))}i.value=r>0?r:""}function Vv(n){var t;const e=m.bank;if(n==="deposit")return te(()=>Vc(m.uid,Ie("freeAmt"),m));if(n==="withdraw")return te(()=>Bc(m.uid,Ie("freeAmt"),m));if(n==="openFixed"){const i=(W.querySelector('input[name="fixedProd"]:checked')||{}).value||"d1";return te(()=>Wc(m.uid,i,Ie("fixedAmt"),m))}if(n==="loan"){const i=Ie("loanAmt");return Bn(i,"대출 심사 중...",()=>Gc(m.uid,i,m))}if(n==="repay"){const i=Ie("repayAmt");return Bn(i,"상환 처리 중...",()=>Ls(m.uid,i,m))}if(n==="buyInvest"){const i=(W.querySelector('input[name="invProd"]:checked')||{}).value||"stable",s=Ie("invAmt");return Bn(s,"투자 계약 체결...",()=>Gg(m.uid,i,s,m))}if(n==="vipDeposit")return te(()=>qg(m.uid,Ie("vipAmt"),m));if(n==="vipWithdraw")return te(()=>zg(m.uid,Ie("vipAmt"),m));if(n==="cardIssue"){const i=(W.querySelector('input[name="cardTier"]:checked')||{}).value||td(m.bank);if(!i){In("발급 가능한 카드 등급이 없습니다.","err");return}return te(()=>nv(m.uid,i,m))}if(n==="cardUpgrade"){const i=(t=(W.querySelector('[data-act="cardUpgrade"]')||{}).dataset)==null?void 0:t.tier;return te(()=>iv(m.uid,i,m))}if(n==="cardRestore")return te(()=>rv(m.uid,m));if(n==="cardPay"){const i=Ie("cardPayAmt");return Bn(i,"카드 승인 확인 중...",()=>sv(m.uid,i,m))}if(n==="repayAll"){const i=T(e.loanPrincipal)+T(e.loanInterest);if(i<=0){In("상환할 대출이 없습니다.","err");return}return te(()=>Ls(m.uid,i,m))}}
