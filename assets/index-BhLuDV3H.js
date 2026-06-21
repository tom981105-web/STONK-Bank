(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();var Yr={};/**
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
 */const ga={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const g=function(t,e){if(!t)throw Vt(e)},Vt=function(t){return new Error("Firebase Database ("+ga.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const va=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},_d=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],a=t[n++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Gi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,a=o?t[i+1]:0,l=i+2<t.length,c=l?t[i+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let f=(a&15)<<2|c>>6,m=c&63;l||(m=64,o||(f=64)),s.push(n[d],n[u],n[f],n[m])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(va(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):_d(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const u=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new gd;const f=r<<2|a>>4;if(s.push(f),c!==64){const m=a<<4&240|c>>2;if(s.push(m),u!==64){const _=c<<6&192|u;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class gd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ba=function(t){const e=va(t);return Gi.encodeByteArray(e,!0)},Zn=function(t){return ba(t).replace(/\./g,"")},es=function(t){try{return Gi.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function vd(t){return ya(void 0,t)}function ya(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!bd(n)||(t[n]=ya(t[n],e[n]));return t}function bd(t){return t!=="__proto__"}/**
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
 */function yd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const wd=()=>yd().__FIREBASE_DEFAULTS__,Id=()=>{if(typeof process>"u"||typeof Yr>"u")return;const t=Yr.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Ed=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&es(t[1]);return e&&JSON.parse(e)},Ki=()=>{try{return wd()||Id()||Ed()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},wa=t=>{var e,n;return(n=(e=Ki())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Cd=t=>{const e=wa(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Ia=()=>{var t;return(t=Ki())===null||t===void 0?void 0:t.config},Ea=t=>{var e;return(e=Ki())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class Bt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Td(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Zn(JSON.stringify(n)),Zn(JSON.stringify(o)),""].join(".")}/**
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
 */function oe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function qi(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(oe())}function kd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sd(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ca(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ad(){const t=oe();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Rd(){return ga.NODE_ADMIN===!0}function Nd(){try{return typeof indexedDB=="object"}catch{return!1}}function Pd(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}/**
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
 */const Od="FirebaseError";class st extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Od,Object.setPrototypeOf(this,st.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Pn.prototype.create)}}class Pn{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?xd(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new st(i,a,s)}}function xd(t,e){return t.replace(Md,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Md=/\{\$([^}]+)}/g;/**
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
 */function pn(t){return JSON.parse(t)}function q(t){return JSON.stringify(t)}/**
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
 */const Ta=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=pn(es(r[0])||""),n=pn(es(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},Dd=function(t){const e=Ta(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Ld=function(t){const e=Ta(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function be(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function ct(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function bi(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ts(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function ns(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(Qr(r)&&Qr(o)){if(!ns(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function Qr(t){return t!==null&&typeof t=="object"}/**
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
 */function Wt(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class $d{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let u=0;u<16;u++)s[u]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let u=16;u<80;u++){const f=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const f=(i<<5|i>>>27)+c+l+d+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Fd(t,e){const n=new Ud(t,e);return n.subscribe.bind(n)}class Ud{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let i;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Vd(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:s},i.next===void 0&&(i.next=ei),i.error===void 0&&(i.error=ei),i.complete===void 0&&(i.complete=ei);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Vd(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ei(){}function Ns(t,e){return`${t} failed: ${e} argument `}/**
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
 */const Bd=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,g(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Ps=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function se(t){return t&&t._delegate?t._delegate:t}class dt{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const rt="[DEFAULT]";/**
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
 */class Wd{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Bt;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(jd(e))try{this.getOrInitializeService({instanceIdentifier:rt})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=rt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rt){return this.instances.has(e)}getOptions(e=rt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,n){var s;const i=this.normalizeInstanceIdentifier(n),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Hd(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=rt){return this.component?this.component.multipleInstances?e:rt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Hd(t){return t===rt?void 0:t}function jd(t){return t.instantiationMode==="EAGER"}/**
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
 */class Gd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Wd(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var x;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(x||(x={}));const Kd={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},qd=x.INFO,zd={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},Yd=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=zd[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class zi{constructor(e){this.name=e,this._logLevel=qd,this._logHandler=Yd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Kd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const Qd=(t,e)=>e.some(n=>t instanceof n);let Jr,Xr;function Jd(){return Jr||(Jr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xd(){return Xr||(Xr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ka=new WeakMap,yi=new WeakMap,Sa=new WeakMap,ti=new WeakMap,Yi=new WeakMap;function Zd(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(qe(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ka.set(n,t)}).catch(()=>{}),Yi.set(e,t),e}function eu(t){if(yi.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});yi.set(t,e)}let wi={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return yi.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Sa.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return qe(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function tu(t){wi=t(wi)}function nu(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ni(this),e,...n);return Sa.set(s,e.sort?e.sort():[e]),qe(s)}:Xd().includes(t)?function(...e){return t.apply(ni(this),e),qe(ka.get(this))}:function(...e){return qe(t.apply(ni(this),e))}}function su(t){return typeof t=="function"?nu(t):(t instanceof IDBTransaction&&eu(t),Qd(t,Jd())?new Proxy(t,wi):t)}function qe(t){if(t instanceof IDBRequest)return Zd(t);if(ti.has(t))return ti.get(t);const e=su(t);return e!==t&&(ti.set(t,e),Yi.set(e,t)),e}const ni=t=>Yi.get(t);function iu(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),a=qe(o);return s&&o.addEventListener("upgradeneeded",l=>{s(qe(o.result),l.oldVersion,l.newVersion,qe(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const ru=["get","getKey","getAll","getAllKeys","count"],ou=["put","add","delete","clear"],si=new Map;function Zr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(si.get(e))return si.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=ou.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||ru.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),i&&l.done]))[0]};return si.set(e,r),r}tu(t=>({...t,get:(e,n,s)=>Zr(e,n)||t.get(e,n,s),has:(e,n)=>!!Zr(e,n)||t.has(e,n)}));/**
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
 */class au{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(lu(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function lu(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ii="@firebase/app",eo="0.10.13";/**
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
 */const Ne=new zi("@firebase/app"),cu="@firebase/app-compat",du="@firebase/analytics-compat",uu="@firebase/analytics",hu="@firebase/app-check-compat",fu="@firebase/app-check",pu="@firebase/auth",mu="@firebase/auth-compat",_u="@firebase/database",gu="@firebase/data-connect",vu="@firebase/database-compat",bu="@firebase/functions",yu="@firebase/functions-compat",wu="@firebase/installations",Iu="@firebase/installations-compat",Eu="@firebase/messaging",Cu="@firebase/messaging-compat",Tu="@firebase/performance",ku="@firebase/performance-compat",Su="@firebase/remote-config",Au="@firebase/remote-config-compat",Ru="@firebase/storage",Nu="@firebase/storage-compat",Pu="@firebase/firestore",Ou="@firebase/vertexai-preview",xu="@firebase/firestore-compat",Mu="firebase",Du="10.14.1";/**
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
 */const Ei="[DEFAULT]",Lu={[Ii]:"fire-core",[cu]:"fire-core-compat",[uu]:"fire-analytics",[du]:"fire-analytics-compat",[fu]:"fire-app-check",[hu]:"fire-app-check-compat",[pu]:"fire-auth",[mu]:"fire-auth-compat",[_u]:"fire-rtdb",[gu]:"fire-data-connect",[vu]:"fire-rtdb-compat",[bu]:"fire-fn",[yu]:"fire-fn-compat",[wu]:"fire-iid",[Iu]:"fire-iid-compat",[Eu]:"fire-fcm",[Cu]:"fire-fcm-compat",[Tu]:"fire-perf",[ku]:"fire-perf-compat",[Su]:"fire-rc",[Au]:"fire-rc-compat",[Ru]:"fire-gcs",[Nu]:"fire-gcs-compat",[Pu]:"fire-fst",[xu]:"fire-fst-compat",[Ou]:"fire-vertex","fire-js":"fire-js",[Mu]:"fire-js-all"};/**
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
 */const ss=new Map,$u=new Map,Ci=new Map;function to(t,e){try{t.container.addComponent(e)}catch(n){Ne.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ot(t){const e=t.name;if(Ci.has(e))return Ne.debug(`There were multiple attempts to register component ${e}.`),!1;Ci.set(e,t);for(const n of ss.values())to(n,t);for(const n of $u.values())to(n,t);return!0}function Qi(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ge(t){return t.settings!==void 0}/**
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
 */const Fu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ze=new Pn("app","Firebase",Fu);/**
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
 */class Uu{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new dt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ze.create("app-deleted",{appName:this._name})}}/**
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
 */const Ht=Du;function Aa(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Ei,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw ze.create("bad-app-name",{appName:String(i)});if(n||(n=Ia()),!n)throw ze.create("no-options");const r=ss.get(i);if(r){if(ns(n,r.options)&&ns(s,r.config))return r;throw ze.create("duplicate-app",{appName:i})}const o=new Gd(i);for(const l of Ci.values())o.addComponent(l);const a=new Uu(n,s,o);return ss.set(i,a),a}function Ra(t=Ei){const e=ss.get(t);if(!e&&t===Ei&&Ia())return Aa();if(!e)throw ze.create("no-app",{appName:t});return e}function Ye(t,e,n){var s;let i=(s=Lu[t])!==null&&s!==void 0?s:t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${i}" with version "${e}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ne.warn(a.join(" "));return}Ot(new dt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Vu="firebase-heartbeat-database",Bu=1,mn="firebase-heartbeat-store";let ii=null;function Na(){return ii||(ii=iu(Vu,Bu,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(mn)}catch(n){console.warn(n)}}}}).catch(t=>{throw ze.create("idb-open",{originalErrorMessage:t.message})})),ii}async function Wu(t){try{const n=(await Na()).transaction(mn),s=await n.objectStore(mn).get(Pa(t));return await n.done,s}catch(e){if(e instanceof st)Ne.warn(e.message);else{const n=ze.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ne.warn(n.message)}}}async function no(t,e){try{const s=(await Na()).transaction(mn,"readwrite");await s.objectStore(mn).put(e,Pa(t)),await s.done}catch(n){if(n instanceof st)Ne.warn(n.message);else{const s=ze.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Ne.warn(s.message)}}}function Pa(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Hu=1024,ju=30*24*60*60*1e3;class Gu{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new qu(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=so();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=ju}),this._storage.overwrite(this._heartbeatsCache))}catch(s){Ne.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=so(),{heartbeatsToSend:s,unsentEntries:i}=Ku(this._heartbeatsCache.heartbeats),r=Zn(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return Ne.warn(n),""}}}function so(){return new Date().toISOString().substring(0,10)}function Ku(t,e=Hu){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),io(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),io(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class qu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Nd()?Pd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Wu(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return no(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return no(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function io(t){return Zn(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function zu(t){Ot(new dt("platform-logger",e=>new au(e),"PRIVATE")),Ot(new dt("heartbeat",e=>new Gu(e),"PRIVATE")),Ye(Ii,eo,t),Ye(Ii,eo,"esm2017"),Ye("fire-js","")}zu("");var Yu="firebase",Qu="10.14.1";/**
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
 */Ye(Yu,Qu,"app");function Ji(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(t);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(t,s[i])&&(n[s[i]]=t[s[i]]);return n}function Oa(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ju=Oa,xa=new Pn("auth","Firebase",Oa());/**
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
 */const is=new zi("@firebase/auth");function Xu(t,...e){is.logLevel<=x.WARN&&is.warn(`Auth (${Ht}): ${t}`,...e)}function zn(t,...e){is.logLevel<=x.ERROR&&is.error(`Auth (${Ht}): ${t}`,...e)}/**
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
 */function Pe(t,...e){throw Xi(t,...e)}function we(t,...e){return Xi(t,...e)}function Ma(t,e,n){const s=Object.assign(Object.assign({},Ju()),{[e]:n});return new Pn("auth","Firebase",s).create(e,{appName:t.name})}function lt(t){return Ma(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Xi(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return xa.create(t,...e)}function w(t,e,...n){if(!t)throw Xi(e,...n)}function Ce(t){const e="INTERNAL ASSERTION FAILED: "+t;throw zn(e),new Error(e)}function Oe(t,e){t||Ce(e)}/**
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
 */function Ti(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Zu(){return ro()==="http:"||ro()==="https:"}function ro(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function eh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Zu()||Sd()||"connection"in navigator)?navigator.onLine:!0}function th(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class On{constructor(e,n){this.shortDelay=e,this.longDelay=n,Oe(n>e,"Short delay should be less than long delay!"),this.isMobile=qi()||Ca()}get(){return eh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Zi(t,e){Oe(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Da{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ce("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ce("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ce("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const nh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const sh=new On(3e4,6e4);function er(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function jt(t,e,n,s,i={}){return La(t,i,async()=>{let r={},o={};s&&(e==="GET"?o=s:r={body:JSON.stringify(s)});const a=Wt(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:l},r);return kd()||(c.referrerPolicy="no-referrer"),Da.fetch()($a(t,t.config.apiHost,n,a),c)})}async function La(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},nh),e);try{const i=new rh(t),r=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw jn(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw jn(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw jn(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw jn(t,"user-disabled",o);const d=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Ma(t,d,c);Pe(t,d)}}catch(i){if(i instanceof st)throw i;Pe(t,"network-request-failed",{message:String(i)})}}async function ih(t,e,n,s,i={}){const r=await jt(t,e,n,s,i);return"mfaPendingCredential"in r&&Pe(t,"multi-factor-auth-required",{_serverResponse:r}),r}function $a(t,e,n,s){const i=`${e}${n}?${s}`;return t.config.emulator?Zi(t.config,i):`${t.config.apiScheme}://${i}`}class rh{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(we(this.auth,"network-request-failed")),sh.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function jn(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const i=we(t,e,s);return i.customData._tokenResponse=n,i}/**
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
 */async function oh(t,e){return jt(t,"POST","/v1/accounts:delete",e)}async function Fa(t,e){return jt(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function an(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ah(t,e=!1){const n=se(t),s=await n.getIdToken(e),i=tr(s);w(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:s,authTime:an(ri(i.auth_time)),issuedAtTime:an(ri(i.iat)),expirationTime:an(ri(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function ri(t){return Number(t)*1e3}function tr(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return zn("JWT malformed, contained fewer than 3 sections"),null;try{const i=es(n);return i?JSON.parse(i):(zn("Failed to decode base64 JWT payload"),null)}catch(i){return zn("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function oo(t){const e=tr(t);return w(e,"internal-error"),w(typeof e.exp<"u","internal-error"),w(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function _n(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof st&&lh(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function lh({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class ch{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ki{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=an(this.lastLoginAt),this.creationTime=an(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function rs(t){var e;const n=t.auth,s=await t.getIdToken(),i=await _n(t,Fa(n,{idToken:s}));w(i==null?void 0:i.users.length,n,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Ua(r.providerUserInfo):[],a=uh(t.providerData,o),l=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new ki(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(t,u)}async function dh(t){const e=se(t);await rs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function uh(t,e){return[...t.filter(s=>!e.some(i=>i.providerId===s.providerId)),...e]}function Ua(t){return t.map(e=>{var{providerId:n}=e,s=Ji(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
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
 */async function hh(t,e){const n=await La(t,{},async()=>{const s=Wt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=t.config,o=$a(t,i,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Da.fetch()(o,{method:"POST",headers:a,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function fh(t,e){return jt(t,"POST","/v2/accounts:revokeToken",er(t,e))}/**
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
 */class St{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){w(e.idToken,"internal-error"),w(typeof e.idToken<"u","internal-error"),w(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):oo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){w(e.length!==0,"internal-error");const n=oo(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(w(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:i,expiresIn:r}=await hh(e,n);this.updateTokensAndExpiration(s,i,Number(r))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:i,expirationTime:r}=n,o=new St;return s&&(w(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),i&&(w(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(w(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new St,this.toJSON())}_performRefresh(){return Ce("not implemented")}}/**
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
 */function Ue(t,e){w(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Te{constructor(e){var{uid:n,auth:s,stsTokenManager:i}=e,r=Ji(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ch(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ki(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await _n(this,this.stsTokenManager.getToken(this.auth,e));return w(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ah(this,e)}reload(){return dh(this)}_assign(e){this!==e&&(w(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Te(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){w(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await rs(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(lt(this.auth));const e=await this.getIdToken();return await _n(this,oh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,i,r,o,a,l,c,d;const u=(s=n.displayName)!==null&&s!==void 0?s:void 0,f=(i=n.email)!==null&&i!==void 0?i:void 0,m=(r=n.phoneNumber)!==null&&r!==void 0?r:void 0,_=(o=n.photoURL)!==null&&o!==void 0?o:void 0,y=(a=n.tenantId)!==null&&a!==void 0?a:void 0,S=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,Q=(c=n.createdAt)!==null&&c!==void 0?c:void 0,te=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:ue,emailVerified:Fe,isAnonymous:W,providerData:Yt,stsTokenManager:Hn}=n;w(ue&&Hn,e,"internal-error");const Zs=St.fromJSON(this.name,Hn);w(typeof ue=="string",e,"internal-error"),Ue(u,e.name),Ue(f,e.name),w(typeof Fe=="boolean",e,"internal-error"),w(typeof W=="boolean",e,"internal-error"),Ue(m,e.name),Ue(_,e.name),Ue(y,e.name),Ue(S,e.name),Ue(Q,e.name),Ue(te,e.name);const P=new Te({uid:ue,auth:e,email:f,emailVerified:Fe,displayName:u,isAnonymous:W,photoURL:_,phoneNumber:m,tenantId:y,stsTokenManager:Zs,createdAt:Q,lastLoginAt:te});return Yt&&Array.isArray(Yt)&&(P.providerData=Yt.map(G=>Object.assign({},G))),S&&(P._redirectEventId=S),P}static async _fromIdTokenResponse(e,n,s=!1){const i=new St;i.updateFromServerResponse(n);const r=new Te({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:s});return await rs(r),r}static async _fromGetAccountInfoResponse(e,n,s){const i=n.users[0];w(i.localId!==void 0,"internal-error");const r=i.providerUserInfo!==void 0?Ua(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(r!=null&&r.length),a=new St;a.updateFromIdToken(s);const l=new Te({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new ki(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
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
 */const ao=new Map;function ke(t){Oe(t instanceof Function,"Expected a class definition");let e=ao.get(t);return e?(Oe(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ao.set(t,e),e)}/**
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
 */class Va{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Va.type="NONE";const lo=Va;/**
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
 */function Yn(t,e,n){return`firebase:${t}:${e}:${n}`}class At{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:i,name:r}=this.auth;this.fullUserKey=Yn(this.userKey,i.apiKey,r),this.fullPersistenceKey=Yn("persistence",i.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Te._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new At(ke(lo),e,s);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=i[0]||ke(lo);const o=Yn(s,e.config.apiKey,e.name);let a=null;for(const c of n)try{const d=await c._get(o);if(d){const u=Te._fromJSON(e,d);c!==r&&(a=u),r=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new At(r,e,s):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new At(r,e,s))}}/**
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
 */function co(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ja(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ba(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ka(e))return"Blackberry";if(qa(e))return"Webos";if(Wa(e))return"Safari";if((e.includes("chrome/")||Ha(e))&&!e.includes("edge/"))return"Chrome";if(Ga(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Ba(t=oe()){return/firefox\//i.test(t)}function Wa(t=oe()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ha(t=oe()){return/crios\//i.test(t)}function ja(t=oe()){return/iemobile/i.test(t)}function Ga(t=oe()){return/android/i.test(t)}function Ka(t=oe()){return/blackberry/i.test(t)}function qa(t=oe()){return/webos/i.test(t)}function nr(t=oe()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ph(t=oe()){var e;return nr(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function mh(){return Ad()&&document.documentMode===10}function za(t=oe()){return nr(t)||Ga(t)||qa(t)||Ka(t)||/windows phone/i.test(t)||ja(t)}/**
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
 */function Ya(t,e=[]){let n;switch(t){case"Browser":n=co(oe());break;case"Worker":n=`${co(oe())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ht}/${s}`}/**
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
 */class _h{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});s.onAbort=n,this.queue.push(s);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function gh(t,e={}){return jt(t,"GET","/v2/passwordPolicy",er(t,e))}/**
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
 */const vh=6;class bh{constructor(e){var n,s,i,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:vh,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,s,i,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(s=l.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let i=0;i<e.length;i++)s=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class yh{constructor(e,n,s,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new uo(this),this.idTokenSubscription=new uo(this),this.beforeStateQueue=new _h(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=xa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ke(n)),this._initializationPromise=this.queue(async()=>{var s,i;if(!this._deleted&&(this.persistenceManager=await At.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Fa(this,{idToken:e}),s=await Te._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Ge(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let i=s,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(i=l.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return w(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await rs(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=th()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(lt(this));const n=e?se(e):null;return n&&w(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&w(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(lt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(lt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ke(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await gh(this),n=new bh(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Pn("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await fh(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ke(e)||this._popupRedirectResolver;w(n,this,"argument-error"),this.redirectPersistenceManager=await At.create(this,[ke(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,i){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(w(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,s,i);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return w(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ya(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Xu(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function sr(t){return se(t)}class uo{constructor(e){this.auth=e,this.observer=null,this.addObserver=Fd(n=>this.observer=n)}get next(){return w(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ir={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function wh(t){ir=t}function Ih(t){return ir.loadJS(t)}function Eh(){return ir.gapiScript}function Ch(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Th(t,e){const n=Qi(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),r=n.getOptions();if(ns(r,e??{}))return i;Pe(i,"already-initialized")}return n.initialize({options:e})}function kh(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(ke);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function Sh(t,e,n){const s=sr(t);w(s._canInitEmulator,s,"emulator-config-failed"),w(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const i=!1,r=Qa(e),{host:o,port:a}=Ah(e),l=a===null?"":`:${a}`;s.config.emulator={url:`${r}//${o}${l}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),Rh()}function Qa(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Ah(t){const e=Qa(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const r=i[1];return{host:r,port:ho(s.substr(r.length+1))}}else{const[r,o]=s.split(":");return{host:r,port:ho(o)}}}function ho(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Rh(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Ja{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ce("not implemented")}_getIdTokenResponse(e){return Ce("not implemented")}_linkToIdToken(e,n){return Ce("not implemented")}_getReauthenticationResolver(e){return Ce("not implemented")}}/**
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
 */async function Rt(t,e){return ih(t,"POST","/v1/accounts:signInWithIdp",er(t,e))}/**
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
 */const Nh="http://localhost";class ut extends Ja{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ut(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Pe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:i}=n,r=Ji(n,["providerId","signInMethod"]);if(!s||!i)return null;const o=new ut(s,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Rt(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Rt(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Rt(e,n)}buildRequest(){const e={requestUri:Nh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Wt(n)}return e}}/**
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
 */class Xa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class xn extends Xa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Be extends xn{constructor(){super("facebook.com")}static credential(e){return ut._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Be.credential(e.oauthAccessToken)}catch{return null}}}Be.FACEBOOK_SIGN_IN_METHOD="facebook.com";Be.PROVIDER_ID="facebook.com";/**
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
 */class We extends xn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ut._fromParams({providerId:We.PROVIDER_ID,signInMethod:We.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return We.credentialFromTaggedObject(e)}static credentialFromError(e){return We.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return We.credential(n,s)}catch{return null}}}We.GOOGLE_SIGN_IN_METHOD="google.com";We.PROVIDER_ID="google.com";/**
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
 */class He extends xn{constructor(){super("github.com")}static credential(e){return ut._fromParams({providerId:He.PROVIDER_ID,signInMethod:He.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return He.credentialFromTaggedObject(e)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return He.credential(e.oauthAccessToken)}catch{return null}}}He.GITHUB_SIGN_IN_METHOD="github.com";He.PROVIDER_ID="github.com";/**
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
 */class je extends xn{constructor(){super("twitter.com")}static credential(e,n){return ut._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return je.credential(n,s)}catch{return null}}}je.TWITTER_SIGN_IN_METHOD="twitter.com";je.PROVIDER_ID="twitter.com";/**
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
 */class xt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,i=!1){const r=await Te._fromIdTokenResponse(e,s,i),o=fo(s);return new xt({user:r,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const i=fo(s);return new xt({user:e,providerId:i,_tokenResponse:s,operationType:n})}}function fo(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class os extends st{constructor(e,n,s,i){var r;super(n.code,n.message),this.operationType=s,this.user=i,Object.setPrototypeOf(this,os.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,i){return new os(e,n,s,i)}}function Za(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?os._fromErrorAndOperation(t,r,e,s):r})}async function Ph(t,e,n=!1){const s=await _n(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return xt._forOperation(t,"link",s)}/**
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
 */async function Oh(t,e,n=!1){const{auth:s}=t;if(Ge(s.app))return Promise.reject(lt(s));const i="reauthenticate";try{const r=await _n(t,Za(s,i,e,t),n);w(r.idToken,s,"internal-error");const o=tr(r.idToken);w(o,s,"internal-error");const{sub:a}=o;return w(t.uid===a,s,"user-mismatch"),xt._forOperation(t,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Pe(s,"user-mismatch"),r}}/**
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
 */async function xh(t,e,n=!1){if(Ge(t.app))return Promise.reject(lt(t));const s="signIn",i=await Za(t,s,e),r=await xt._fromIdTokenResponse(t,s,i);return n||await t._updateCurrentUser(r.user),r}function Mh(t,e,n,s){return se(t).onIdTokenChanged(e,n,s)}function Dh(t,e,n){return se(t).beforeAuthStateChanged(e,n)}function Lh(t,e,n,s){return se(t).onAuthStateChanged(e,n,s)}const as="__sak";/**
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
 */class el{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(as,"1"),this.storage.removeItem(as),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const $h=1e3,Fh=10;class tl extends el{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=za(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),i=this.localCache[n];s!==i&&e(n,i,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const s=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},r=this.storage.getItem(s);mh()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Fh):i()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},$h)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}tl.type="LOCAL";const Uh=tl;/**
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
 */class nl extends el{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}nl.type="SESSION";const sl=nl;/**
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
 */function Vh(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Os{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const s=new Os(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:i,data:r}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:i});const a=Array.from(o).map(async c=>c(n.origin,r)),l=await Vh(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:i,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Os.receivers=[];/**
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
 */function rr(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Bh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=rr("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},s);o={messageChannel:i,onMessage(u){const f=u;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(f.data.response);break;default:clearTimeout(d),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Ie(){return window}function Wh(t){Ie().location.href=t}/**
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
 */function il(){return typeof Ie().WorkerGlobalScope<"u"&&typeof Ie().importScripts=="function"}async function Hh(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function jh(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Gh(){return il()?self:null}/**
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
 */const rl="firebaseLocalStorageDb",Kh=1,ls="firebaseLocalStorage",ol="fbase_key";class Mn{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function xs(t,e){return t.transaction([ls],e?"readwrite":"readonly").objectStore(ls)}function qh(){const t=indexedDB.deleteDatabase(rl);return new Mn(t).toPromise()}function Si(){const t=indexedDB.open(rl,Kh);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(ls,{keyPath:ol})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(ls)?e(s):(s.close(),await qh(),e(await Si()))})})}async function po(t,e,n){const s=xs(t,!0).put({[ol]:e,value:n});return new Mn(s).toPromise()}async function zh(t,e){const n=xs(t,!1).get(e),s=await new Mn(n).toPromise();return s===void 0?null:s.value}function mo(t,e){const n=xs(t,!0).delete(e);return new Mn(n).toPromise()}const Yh=800,Qh=3;class al{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Si(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>Qh)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return il()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Os._getInstance(Gh()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Hh(),!this.activeServiceWorker)return;this.sender=new Bh(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||jh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Si();return await po(e,as,"1"),await mo(e,as),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>po(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>zh(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>mo(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=xs(i,!1).getAll();return new Mn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:i,value:r}of e)s.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!s.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Yh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}al.type="LOCAL";const Jh=al;new On(3e4,6e4);/**
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
 */function Xh(t,e){return e?ke(e):(w(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class or extends Ja{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Rt(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Rt(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Rt(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Zh(t){return xh(t.auth,new or(t),t.bypassAuthState)}function ef(t){const{auth:e,user:n}=t;return w(n,e,"internal-error"),Oh(n,new or(t),t.bypassAuthState)}async function tf(t){const{auth:e,user:n}=t;return w(n,e,"internal-error"),Ph(n,new or(t),t.bypassAuthState)}/**
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
 */class ll{constructor(e,n,s,i,r=!1){this.auth=e,this.resolver=s,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:i,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:s,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Zh;case"linkViaPopup":case"linkViaRedirect":return tf;case"reauthViaPopup":case"reauthViaRedirect":return ef;default:Pe(this.auth,"internal-error")}}resolve(e){Oe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Oe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const nf=new On(2e3,1e4);class Tt extends ll{constructor(e,n,s,i,r){super(e,n,i,r),this.provider=s,this.authWindow=null,this.pollId=null,Tt.currentPopupAction&&Tt.currentPopupAction.cancel(),Tt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return w(e,this.auth,"internal-error"),e}async onExecution(){Oe(this.filter.length===1,"Popup operations only handle one event");const e=rr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(we(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(we(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Tt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(we(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,nf.get())};e()}}Tt.currentPopupAction=null;/**
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
 */const sf="pendingRedirect",Qn=new Map;class rf extends ll{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Qn.get(this.auth._key());if(!e){try{const s=await of(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Qn.set(this.auth._key(),e)}return this.bypassAuthState||Qn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function of(t,e){const n=cf(e),s=lf(t);if(!await s._isAvailable())return!1;const i=await s._get(n)==="true";return await s._remove(n),i}function af(t,e){Qn.set(t._key(),e)}function lf(t){return ke(t._redirectPersistence)}function cf(t){return Yn(sf,t.config.apiKey,t.name)}async function df(t,e,n=!1){if(Ge(t.app))return Promise.reject(lt(t));const s=sr(t),i=Xh(s,e),o=await new rf(s,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
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
 */const uf=10*60*1e3;class hf{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ff(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!cl(e)){const i=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(we(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=uf&&this.cachedEventUids.clear(),this.cachedEventUids.has(_o(e))}saveEventToCache(e){this.cachedEventUids.add(_o(e)),this.lastProcessedEventTime=Date.now()}}function _o(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function cl({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ff(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return cl(t);default:return!1}}/**
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
 */async function pf(t,e={}){return jt(t,"GET","/v1/projects",e)}/**
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
 */const mf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_f=/^https?/;async function gf(t){if(t.config.emulator)return;const{authorizedDomains:e}=await pf(t);for(const n of e)try{if(vf(n))return}catch{}Pe(t,"unauthorized-domain")}function vf(t){const e=Ti(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!_f.test(n))return!1;if(mf.test(t))return s===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}/**
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
 */const bf=new On(3e4,6e4);function go(){const t=Ie().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function yf(t){return new Promise((e,n)=>{var s,i,r;function o(){go(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{go(),n(we(t,"network-request-failed"))},timeout:bf.get()})}if(!((i=(s=Ie().gapi)===null||s===void 0?void 0:s.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((r=Ie().gapi)===null||r===void 0)&&r.load)o();else{const a=Ch("iframefcb");return Ie()[a]=()=>{gapi.load?o():n(we(t,"network-request-failed"))},Ih(`${Eh()}?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw Jn=null,e})}let Jn=null;function wf(t){return Jn=Jn||yf(t),Jn}/**
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
 */const If=new On(5e3,15e3),Ef="__/auth/iframe",Cf="emulator/auth/iframe",Tf={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},kf=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Sf(t){const e=t.config;w(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Zi(e,Cf):`https://${t.config.authDomain}/${Ef}`,s={apiKey:e.apiKey,appName:t.name,v:Ht},i=kf.get(t.config.apiHost);i&&(s.eid=i);const r=t._getFrameworks();return r.length&&(s.fw=r.join(",")),`${n}?${Wt(s).slice(1)}`}async function Af(t){const e=await wf(t),n=Ie().gapi;return w(n,t,"internal-error"),e.open({where:document.body,url:Sf(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Tf,dontclear:!0},s=>new Promise(async(i,r)=>{await s.restyle({setHideOnLeave:!1});const o=we(t,"network-request-failed"),a=Ie().setTimeout(()=>{r(o)},If.get());function l(){Ie().clearTimeout(a),i(s)}s.ping(l).then(l,()=>{r(o)})}))}/**
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
 */const Rf={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Nf=500,Pf=600,Of="_blank",xf="http://localhost";class vo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Mf(t,e,n,s=Nf,i=Pf){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Rf),{width:s.toString(),height:i.toString(),top:r,left:o}),c=oe().toLowerCase();n&&(a=Ha(c)?Of:n),Ba(c)&&(e=e||xf,l.scrollbars="yes");const d=Object.entries(l).reduce((f,[m,_])=>`${f}${m}=${_},`,"");if(ph(c)&&a!=="_self")return Df(e||"",a),new vo(null);const u=window.open(e||"",a,d);w(u,t,"popup-blocked");try{u.focus()}catch{}return new vo(u)}function Df(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const Lf="__/auth/handler",$f="emulator/auth/handler",Ff=encodeURIComponent("fac");async function bo(t,e,n,s,i,r){w(t.config.authDomain,t,"auth-domain-config-required"),w(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Ht,eventId:i};if(e instanceof Xa){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",bi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries({}))o[d]=u}if(e instanceof xn){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await t._getAppCheckToken(),c=l?`#${Ff}=${encodeURIComponent(l)}`:"";return`${Uf(t)}?${Wt(a).slice(1)}${c}`}function Uf({config:t}){return t.emulator?Zi(t,$f):`https://${t.authDomain}/${Lf}`}/**
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
 */const oi="webStorageSupport";class Vf{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sl,this._completeRedirectFn=df,this._overrideRedirectResult=af}async _openPopup(e,n,s,i){var r;Oe((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await bo(e,n,s,Ti(),i);return Mf(e,o,rr())}async _openRedirect(e,n,s,i){await this._originValidation(e);const r=await bo(e,n,s,Ti(),i);return Wh(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:r}=this.eventManagers[n];return i?Promise.resolve(i):(Oe(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await Af(e),s=new hf(e);return n.register("authEvent",i=>(w(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:s.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(oi,{type:oi},i=>{var r;const o=(r=i==null?void 0:i[0])===null||r===void 0?void 0:r[oi];o!==void 0&&n(!!o),Pe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=gf(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return za()||Wa()||nr()}}const Bf=Vf;var yo="@firebase/auth",wo="1.7.9";/**
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
 */class Wf{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){w(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Hf(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function jf(t){Ot(new dt("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;w(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ya(t)},c=new yh(s,i,r,l);return kh(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Ot(new dt("auth-internal",e=>{const n=sr(e.getProvider("auth").getImmediate());return(s=>new Wf(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ye(yo,wo,Hf(t)),Ye(yo,wo,"esm2017")}/**
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
 */const Gf=5*60,Kf=Ea("authIdTokenMaxAge")||Gf;let Io=null;const qf=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>Kf)return;const i=n==null?void 0:n.token;Io!==i&&(Io=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function zf(t=Ra()){const e=Qi(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Th(t,{popupRedirectResolver:Bf,persistence:[Jh,Uh,sl]}),s=Ea("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(s,location.origin);if(location.origin===r.origin){const o=qf(r.toString());Dh(n,o,()=>o(n.currentUser)),Mh(n,a=>o(a))}}const i=wa("auth");return i&&Sh(n,`http://${i}`),n}function Yf(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}wh({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=i=>{const r=we("internal-error");r.customData=i,n(r)},s.type="text/javascript",s.charset="UTF-8",Yf().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});jf("Browser");var Eo={};const Co="@firebase/database",To="1.0.8";/**
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
 */let dl="";function Qf(t){dl=t}/**
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
 */class Jf{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),q(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:pn(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class Xf{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return be(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const ul=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Jf(e)}}catch{}return new Xf},at=ul("localStorage"),Zf=ul("sessionStorage");/**
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
 */const Nt=new zi("@firebase/database"),hl=function(){let t=1;return function(){return t++}}(),fl=function(t){const e=Bd(t),n=new $d;n.update(e);const s=n.digest();return Gi.encodeByteArray(s)},Dn=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Dn.apply(null,s):typeof s=="object"?e+=q(s):e+=s,e+=" "}return e};let ln=null,ko=!0;const ep=function(t,e){g(!0,"Can't turn on custom loggers persistently."),Nt.logLevel=x.VERBOSE,ln=Nt.log.bind(Nt)},J=function(...t){if(ko===!0&&(ko=!1,ln===null&&Zf.get("logging_enabled")===!0&&ep()),ln){const e=Dn.apply(null,t);ln(e)}},Ln=function(t){return function(...e){J(t,...e)}},Ai=function(...t){const e="FIREBASE INTERNAL ERROR: "+Dn(...t);Nt.error(e)},xe=function(...t){const e=`FIREBASE FATAL ERROR: ${Dn(...t)}`;throw Nt.error(e),new Error(e)},re=function(...t){const e="FIREBASE WARNING: "+Dn(...t);Nt.warn(e)},tp=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&re("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ar=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},np=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ht="[MIN_NAME]",Ze="[MAX_NAME]",gt=function(t,e){if(t===e)return 0;if(t===ht||e===Ze)return-1;if(e===ht||t===Ze)return 1;{const n=So(t),s=So(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},sp=function(t,e){return t===e?0:t<e?-1:1},Xt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+q(e))},lr=function(t){if(typeof t!="object"||t===null)return q(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=q(e[s]),n+=":",n+=lr(t[e[s]]);return n+="}",n},pl=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function Z(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ml=function(t){g(!ar(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,a,l;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let f=parseInt(d.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),u=u+f}return u.toLowerCase()},ip=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},rp=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function op(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const ap=new RegExp("^-?(0*)\\d{1,10}$"),lp=-2147483648,cp=2147483647,So=function(t){if(ap.test(t)){const e=Number(t);if(e>=lp&&e<=cp)return e}return null},Gt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw re("Exception was thrown by user callback.",n),e},Math.floor(0))}},dp=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},cn=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class up{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){re(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class hp{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(J("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',re(e)}}class Xn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Xn.OWNER="owner";/**
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
 */const cr="5",_l="v",gl="s",vl="r",bl="f",yl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,wl="ls",Il="p",Ri="ac",El="websocket",Cl="long_polling";/**
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
 */class Tl{constructor(e,n,s,i,r=!1,o="",a=!1,l=!1){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=at.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&at.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function fp(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function kl(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let s;if(e===El)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Cl)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);fp(t)&&(n.ns=t.namespace);const i=[];return Z(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class pp{constructor(){this.counters_={}}incrementCounter(e,n=1){be(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return vd(this.counters_)}}/**
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
 */const ai={},li={};function dr(t){const e=t.toString();return ai[e]||(ai[e]=new pp),ai[e]}function mp(t,e){const n=t.toString();return li[n]||(li[n]=e()),li[n]}/**
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
 */class _p{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Gt(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Ao="start",gp="close",vp="pLPCommand",bp="pRTLPCB",Sl="id",Al="pw",Rl="ser",yp="cb",wp="seg",Ip="ts",Ep="d",Cp="dframe",Nl=1870,Pl=30,Tp=Nl-Pl,kp=25e3,Sp=3e4;class kt{constructor(e,n,s,i,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ln(e),this.stats_=dr(n),this.urlFn=l=>(this.appCheckToken&&(l[Ri]=this.appCheckToken),kl(n,Cl,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new _p(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Sp)),np(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ur((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ao)this.id=a,this.password=l;else if(o===gp)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Ao]="t",s[Rl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[yp]=this.scriptTagHolder.uniqueCallbackIdentifier),s[_l]=cr,this.transportSessionId&&(s[gl]=this.transportSessionId),this.lastSessionId&&(s[wl]=this.lastSessionId),this.applicationId&&(s[Il]=this.applicationId),this.appCheckToken&&(s[Ri]=this.appCheckToken),typeof location<"u"&&location.hostname&&yl.test(location.hostname)&&(s[vl]=bl);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){kt.forceAllow_=!0}static forceDisallow(){kt.forceDisallow_=!0}static isAvailable(){return kt.forceAllow_?!0:!kt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!ip()&&!rp()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=ba(n),i=pl(s,Tp);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[Cp]="t",s[Sl]=e,s[Al]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=q(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class ur{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=hl(),window[vp+this.uniqueCallbackIdentifier]=e,window[bp+this.uniqueCallbackIdentifier]=n,this.myIFrame=ur.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){J("frame writing exception"),a.stack&&J(a.stack),J(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||J("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Sl]=this.myID,e[Al]=this.myPW,e[Rl]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Pl+s.length<=Nl;){const o=this.pendingSegs.shift();s=s+"&"+wp+i+"="+o.seg+"&"+Ip+i+"="+o.ts+"&"+Ep+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(kp)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{J("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const Ap=16384,Rp=45e3;let cs=null;typeof MozWebSocket<"u"?cs=MozWebSocket:typeof WebSocket<"u"&&(cs=WebSocket);class _e{constructor(e,n,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ln(this.connId),this.stats_=dr(n),this.connURL=_e.connectionURL_(n,o,a,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[_l]=cr,typeof location<"u"&&location.hostname&&yl.test(location.hostname)&&(o[vl]=bl),n&&(o[gl]=n),s&&(o[wl]=s),i&&(o[Ri]=i),r&&(o[Il]=r),kl(e,El,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,at.set("previous_websocket_failure",!0);try{let s;Rd(),this.mySock=new cs(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){_e.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&cs!==null&&!_e.forceDisallow_}static previouslyFailed(){return at.isInMemoryStorage||at.get("previous_websocket_failure")===!0}markConnectionHealthy(){at.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=pn(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=pl(n,Ap);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Rp))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}_e.responsesRequiredToBeHealthy=2;_e.healthyTimeout=3e4;/**
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
 */class gn{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[kt,_e]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=_e&&_e.isAvailable();let s=n&&!_e.previouslyFailed();if(e.webSocketOnly&&(n||re("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[_e];else{const i=this.transports_=[];for(const r of gn.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);gn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}gn.globalTransportInitialized_=!1;/**
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
 */const Np=6e4,Pp=5e3,Op=10*1024,xp=100*1024,ci="t",Ro="d",Mp="s",No="r",Dp="e",Po="o",Oo="a",xo="n",Mo="p",Lp="h";class $p{constructor(e,n,s,i,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ln("c:"+this.id+":"),this.transportManager_=new gn(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=cn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>xp?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Op?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ci in e){const n=e[ci];n===Oo?this.upgradeIfSecondaryHealthy_():n===No?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Po&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Xt("t",e),s=Xt("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Mo,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Oo,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:xo,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Xt("t",e),s=Xt("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Xt(ci,e);if(Ro in e){const s=e[Ro];if(n===Lp){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===xo){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Mp?this.onConnectionShutdown_(s):n===No?this.onReset_(s):n===Dp?Ai("Server Error: "+s):n===Po?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ai("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),cr!==s&&re("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),cn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Np))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):cn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Pp))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Mo,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(at.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Ol{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class xl{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class ds extends xl{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!qi()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ds}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Do=32,Lo=768;class M{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function A(){return new M("")}function E(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function et(t){return t.pieces_.length-t.pieceNum_}function L(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new M(t.pieces_,e)}function hr(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Fp(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function vn(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Ml(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new M(e,0)}function j(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof M)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new M(n,0)}function T(t){return t.pieceNum_>=t.pieces_.length}function ie(t,e){const n=E(t),s=E(e);if(n===null)return e;if(n===s)return ie(L(t),L(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Up(t,e){const n=vn(t,0),s=vn(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=gt(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function fr(t,e){if(et(t)!==et(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function pe(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(et(t)>et(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class Vp{constructor(e,n){this.errorPrefix_=n,this.parts_=vn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Ps(this.parts_[s]);Dl(this)}}function Bp(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Ps(e),Dl(t)}function Wp(t){const e=t.parts_.pop();t.byteLength_-=Ps(e),t.parts_.length>0&&(t.byteLength_-=1)}function Dl(t){if(t.byteLength_>Lo)throw new Error(t.errorPrefix_+"has a key path longer than "+Lo+" bytes ("+t.byteLength_+").");if(t.parts_.length>Do)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Do+") or object contains a cycle "+ot(t))}function ot(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class pr extends xl{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}static getInstance(){return new pr}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Zt=1e3,Hp=60*5*1e3,$o=30*1e3,jp=1.3,Gp=3e4,Kp="server_kill",Fo=3;class Ae extends Ol{constructor(e,n,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ae.nextPersistentConnectionId_++,this.log_=Ln("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Zt,this.maxReconnectDelay_=Hp,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");pr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ds.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(q(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new Bt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Ae.warnOnListenWarnings_(l,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&be(e,"w")){const s=ct(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();re(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ld(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=$o)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Dd(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+q(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Ai("Unrecognized action received from server: "+q(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Zt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Zt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Gp&&(this.reconnectDelay_=Zt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*jp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ae.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,f]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?J("getToken() completed but was canceled"):(J("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=f&&f.token,a=new $p(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,m=>{re(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(Kp)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&re(u),l())}}}interrupt(e){J("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){J("Resuming connection for reason: "+e),delete this.interruptReasons_[e],bi(this.interruptReasons_)&&(this.reconnectDelay_=Zt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>lr(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new M(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){J("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Fo&&(this.reconnectDelay_=$o,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){J("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Fo&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+dl.replace(/\./g,"-")]=1,qi()?e["framework.cordova"]=1:Ca()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ds.getInstance().currentlyOnline();return bi(this.interruptReasons_)&&e}}Ae.nextPersistentConnectionId_=0;Ae.nextConnectionId_=0;/**
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
 */class C{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new C(e,n)}}/**
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
 */class Ms{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new C(ht,e),i=new C(ht,n);return this.compare(s,i)!==0}minPost(){return C.MIN}}/**
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
 */let Gn;class Ll extends Ms{static get __EMPTY_NODE(){return Gn}static set __EMPTY_NODE(e){Gn=e}compare(e,n){return gt(e.name,n.name)}isDefinedOn(e){throw Vt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return C.MIN}maxPost(){return new C(Ze,Gn)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new C(e,Gn)}toString(){return".key"}}const Qe=new Ll;/**
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
 */class Kn{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Y{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??Y.RED,this.left=i??le.EMPTY_NODE,this.right=r??le.EMPTY_NODE}copy(e,n,s,i,r){return new Y(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return le.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return le.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Y.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Y.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Y.RED=!0;Y.BLACK=!1;class qp{copy(e,n,s,i,r){return this}insert(e,n,s){return new Y(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class le{constructor(e,n=le.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new le(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Y.BLACK,null,null))}remove(e){return new le(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Y.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Kn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Kn(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Kn(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Kn(this.root_,null,this.comparator_,!0,e)}}le.EMPTY_NODE=new qp;/**
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
 */function zp(t,e){return gt(t.name,e.name)}function mr(t,e){return gt(t,e)}/**
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
 */let Ni;function Yp(t){Ni=t}const $l=function(t){return typeof t=="number"?"number:"+ml(t):"string:"+t},Fl=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&be(e,".sv"),"Priority must be a string or number.")}else g(t===Ni||t.isEmpty(),"priority of unexpected type.");g(t===Ni||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Uo;class z{constructor(e,n=z.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Fl(this.priorityNode_)}static set __childrenNodeConstructor(e){Uo=e}static get __childrenNodeConstructor(){return Uo}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new z(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:z.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return T(e)?this:E(e)===".priority"?this.priorityNode_:z.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:z.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=E(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||et(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,z.__childrenNodeConstructor.EMPTY_NODE.updateChild(L(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+$l(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ml(this.value_):e+=this.value_,this.lazyHash_=fl(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===z.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof z.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=z.VALUE_TYPE_ORDER.indexOf(n),r=z.VALUE_TYPE_ORDER.indexOf(s);return g(i>=0,"Unknown leaf type: "+n),g(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}z.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Ul,Vl;function Qp(t){Ul=t}function Jp(t){Vl=t}class Xp extends Ms{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?gt(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return C.MIN}maxPost(){return new C(Ze,new z("[PRIORITY-POST]",Vl))}makePost(e,n){const s=Ul(e);return new C(n,new z("[PRIORITY-POST]",s))}toString(){return".priority"}}const B=new Xp;/**
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
 */const Zp=Math.log(2);class em{constructor(e){const n=r=>parseInt(Math.log(r)/Zp,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const us=function(t,e,n,s){t.sort(e);const i=function(l,c){const d=c-l;let u,f;if(d===0)return null;if(d===1)return u=t[l],f=n?n(u):u,new Y(f,u.node,Y.BLACK,null,null);{const m=parseInt(d/2,10)+l,_=i(l,m),y=i(m+1,c);return u=t[m],f=n?n(u):u,new Y(f,u.node,Y.BLACK,_,y)}},r=function(l){let c=null,d=null,u=t.length;const f=function(_,y){const S=u-_,Q=u;u-=_;const te=i(S+1,Q),ue=t[S],Fe=n?n(ue):ue;m(new Y(Fe,ue.node,y,null,te))},m=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const y=l.nextBitIsOne(),S=Math.pow(2,l.count-(_+1));y?f(S,Y.BLACK):(f(S,Y.BLACK),f(S,Y.RED))}return d},o=new em(t.length),a=r(o);return new le(s||e,a)};/**
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
 */let di;const Et={};class Se{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return g(Et&&B,"ChildrenNode.ts has not been loaded"),di=di||new Se({".priority":Et},{".priority":B}),di}get(e){const n=ct(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof le?n:null}hasIndex(e){return be(this.indexSet_,e.toString())}addIndex(e,n){g(e!==Qe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(C.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=us(s,e.getCompare()):a=Et;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const d=Object.assign({},this.indexes_);return d[l]=a,new Se(d,c)}addToIndexes(e,n){const s=ts(this.indexes_,(i,r)=>{const o=ct(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),i===Et)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(C.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),us(a,o.getCompare())}else return Et;else{const a=n.get(e.name);let l=i;return a&&(l=l.remove(new C(e.name,a))),l.insert(e,e.node)}});return new Se(s,this.indexSet_)}removeFromIndexes(e,n){const s=ts(this.indexes_,i=>{if(i===Et)return i;{const r=n.get(e.name);return r?i.remove(new C(e.name,r)):i}});return new Se(s,this.indexSet_)}}/**
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
 */let en;class b{constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Fl(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return en||(en=new b(new le(mr),null,Se.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||en}updatePriority(e){return this.children_.isEmpty()?this:new b(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?en:n}}getChild(e){const n=E(e);return n===null?this:this.getImmediateChild(n).getChild(L(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new C(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?en:this.priorityNode_;return new b(i,o,r)}}updateChild(e,n){const s=E(e);if(s===null)return n;{g(E(e)!==".priority"||et(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(L(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(B,(o,a)=>{n[o]=a.val(e),s++,r&&b.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+$l(this.getPriority().val())+":"),this.forEachChild(B,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":fl(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new C(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new C(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new C(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,C.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,C.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===$n?-1:0}withIndex(e){if(e===Qe||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new b(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Qe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(B),i=n.getIterator(B);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Qe?null:this.indexMap_.get(e.toString())}}b.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class tm extends b{constructor(){super(new le(mr),b.EMPTY_NODE,Se.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return b.EMPTY_NODE}isEmpty(){return!1}}const $n=new tm;Object.defineProperties(C,{MIN:{value:new C(ht,b.EMPTY_NODE)},MAX:{value:new C(Ze,$n)}});Ll.__EMPTY_NODE=b.EMPTY_NODE;z.__childrenNodeConstructor=b;Yp($n);Jp($n);/**
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
 */const nm=!0;function K(t,e=null){if(t===null)return b.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new z(n,K(e))}if(!(t instanceof Array)&&nm){const n=[];let s=!1;if(Z(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=K(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),n.push(new C(o,l)))}}),n.length===0)return b.EMPTY_NODE;const r=us(n,zp,o=>o.name,mr);if(s){const o=us(n,B.getCompare());return new b(r,K(e),new Se({".priority":o},{".priority":B}))}else return new b(r,K(e),Se.Default)}else{let n=b.EMPTY_NODE;return Z(t,(s,i)=>{if(be(t,s)&&s.substring(0,1)!=="."){const r=K(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(K(e))}}Qp(K);/**
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
 */class Bl extends Ms{constructor(e){super(),this.indexPath_=e,g(!T(e)&&E(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?gt(e.name,n.name):r}makePost(e,n){const s=K(e),i=b.EMPTY_NODE.updateChild(this.indexPath_,s);return new C(n,i)}maxPost(){const e=b.EMPTY_NODE.updateChild(this.indexPath_,$n);return new C(Ze,e)}toString(){return vn(this.indexPath_,0).join("/")}}/**
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
 */class sm extends Ms{compare(e,n){const s=e.node.compareTo(n.node);return s===0?gt(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return C.MIN}maxPost(){return C.MAX}makePost(e,n){const s=K(e);return new C(n,s)}toString(){return".value"}}const Wl=new sm;/**
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
 */function Hl(t){return{type:"value",snapshotNode:t}}function Mt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function bn(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function yn(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function im(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class _r{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(bn(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Mt(n,s)):o.trackChildChange(yn(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(B,(i,r)=>{n.hasChild(i)||s.trackChildChange(bn(i,r))}),n.isLeafNode()||n.forEachChild(B,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(yn(i,r,o))}else s.trackChildChange(Mt(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?b.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class wn{constructor(e){this.indexedFilter_=new _r(e.getIndex()),this.index_=e.getIndex(),this.startPost_=wn.getStartPost_(e),this.endPost_=wn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new C(n,s))||(s=b.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=b.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(b.EMPTY_NODE);const r=this;return n.forEachChild(B,(o,a)=>{r.matches(new C(o,a))||(i=i.updateImmediateChild(o,b.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class rm{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new wn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new C(n,s))||(s=b.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=b.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=b.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(b.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,b.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(f,m)=>u(m,f)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const l=new C(n,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const u=a.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const m=f==null?1:o(f,l);if(d&&!s.isEmpty()&&m>=0)return r!=null&&r.trackChildChange(yn(n,s,u)),a.updateImmediateChild(n,s);{r!=null&&r.trackChildChange(bn(n,u));const y=a.updateImmediateChild(n,b.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r!=null&&r.trackChildChange(Mt(f.name,f.node)),y.updateImmediateChild(f.name,f.node)):y}}else return s.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(bn(c.name,c.node)),r.trackChildChange(Mt(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(c.name,b.EMPTY_NODE)):e}}/**
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
 */class gr{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=B}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ht}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ze}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===B}copy(){const e=new gr;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function om(t){return t.loadsAllData()?new _r(t.getIndex()):t.hasLimit()?new rm(t):new wn(t)}function am(t,e){const n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="r",n}function lm(t,e){const n=t.copy();return n.index_=e,n}function Vo(t){const e={};if(t.isDefault())return e;let n;if(t.index_===B?n="$priority":t.index_===Wl?n="$value":t.index_===Qe?n="$key":(g(t.index_ instanceof Bl,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=q(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=q(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+q(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=q(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+q(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Bo(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==B&&(e.i=t.index_.toString()),e}/**
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
 */class hs extends Ol{constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Ln("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=hs.getListenId_(e,s),a={};this.listens_[o]=a;const l=Vo(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),ct(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const s=hs.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Vo(e._queryParams),s=e._path.toString(),i=new Bt;return this.restRequest_(s+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Wt(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=pn(a.responseText)}catch{re("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&re("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class cm{constructor(){this.rootNode_=b.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function fs(){return{value:null,children:new Map}}function jl(t,e,n){if(T(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=E(e);t.children.has(s)||t.children.set(s,fs());const i=t.children.get(s);e=L(e),jl(i,e,n)}}function Pi(t,e,n){t.value!==null?n(e,t.value):dm(t,(s,i)=>{const r=new M(e.toString()+"/"+s);Pi(i,r,n)})}function dm(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
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
 */class um{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&Z(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
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
 */const Wo=10*1e3,hm=30*1e3,fm=5*60*1e3;class pm{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new um(e);const s=Wo+(hm-Wo)*Math.random();cn(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;Z(e,(i,r)=>{r>0&&be(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),cn(this.reportStats_.bind(this),Math.floor(Math.random()*2*fm))}}/**
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
 */var ge;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ge||(ge={}));function vr(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function br(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function yr(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class ps{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=ge.ACK_USER_WRITE,this.source=vr()}operationForChild(e){if(T(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new M(e));return new ps(A(),n,this.revert)}}else return g(E(this.path)===e,"operationForChild called for unrelated child."),new ps(L(this.path),this.affectedTree,this.revert)}}/**
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
 */class In{constructor(e,n){this.source=e,this.path=n,this.type=ge.LISTEN_COMPLETE}operationForChild(e){return T(this.path)?new In(this.source,A()):new In(this.source,L(this.path))}}/**
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
 */class ft{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=ge.OVERWRITE}operationForChild(e){return T(this.path)?new ft(this.source,A(),this.snap.getImmediateChild(e)):new ft(this.source,L(this.path),this.snap)}}/**
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
 */class Dt{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=ge.MERGE}operationForChild(e){if(T(this.path)){const n=this.children.subtree(new M(e));return n.isEmpty()?null:n.value?new ft(this.source,A(),n.value):new Dt(this.source,A(),n)}else return g(E(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Dt(this.source,L(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class tt{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(T(e))return this.isFullyInitialized()&&!this.filtered_;const n=E(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class mm{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function _m(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(im(o.childName,o.snapshotNode))}),tn(t,i,"child_removed",e,s,n),tn(t,i,"child_added",e,s,n),tn(t,i,"child_moved",r,s,n),tn(t,i,"child_changed",e,s,n),tn(t,i,"value",e,s,n),i}function tn(t,e,n,s,i,r){const o=s.filter(a=>a.type===n);o.sort((a,l)=>vm(t,a,l)),o.forEach(a=>{const l=gm(t,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function gm(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function vm(t,e,n){if(e.childName==null||n.childName==null)throw Vt("Should only compare child_ events.");const s=new C(e.childName,e.snapshotNode),i=new C(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
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
 */function Ds(t,e){return{eventCache:t,serverCache:e}}function dn(t,e,n,s){return Ds(new tt(e,n,s),t.serverCache)}function Gl(t,e,n,s){return Ds(t.eventCache,new tt(e,n,s))}function ms(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function pt(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let ui;const bm=()=>(ui||(ui=new le(sp)),ui);class D{constructor(e,n=bm()){this.value=e,this.children=n}static fromObject(e){let n=new D(null);return Z(e,(s,i)=>{n=n.set(new M(s),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:A(),value:this.value};if(T(e))return null;{const s=E(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(L(e),n);return r!=null?{path:j(new M(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(T(e))return this;{const n=E(e),s=this.children.get(n);return s!==null?s.subtree(L(e)):new D(null)}}set(e,n){if(T(e))return new D(n,this.children);{const s=E(e),r=(this.children.get(s)||new D(null)).set(L(e),n),o=this.children.insert(s,r);return new D(this.value,o)}}remove(e){if(T(e))return this.children.isEmpty()?new D(null):new D(null,this.children);{const n=E(e),s=this.children.get(n);if(s){const i=s.remove(L(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new D(null):new D(this.value,r)}else return this}}get(e){if(T(e))return this.value;{const n=E(e),s=this.children.get(n);return s?s.get(L(e)):null}}setTree(e,n){if(T(e))return n;{const s=E(e),r=(this.children.get(s)||new D(null)).setTree(L(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new D(this.value,o)}}fold(e){return this.fold_(A(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(j(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,A(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(T(e))return null;{const r=E(e),o=this.children.get(r);return o?o.findOnPath_(L(e),j(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,A(),n)}foreachOnPath_(e,n,s){if(T(e))return this;{this.value&&s(n,this.value);const i=E(e),r=this.children.get(i);return r?r.foreachOnPath_(L(e),j(n,i),s):new D(null)}}foreach(e){this.foreach_(A(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(j(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
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
 */class ve{constructor(e){this.writeTree_=e}static empty(){return new ve(new D(null))}}function un(t,e,n){if(T(e))return new ve(new D(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=ie(i,e);return r=r.updateChild(o,n),new ve(t.writeTree_.set(i,r))}else{const i=new D(n),r=t.writeTree_.setTree(e,i);return new ve(r)}}}function Oi(t,e,n){let s=t;return Z(n,(i,r)=>{s=un(s,j(e,i),r)}),s}function Ho(t,e){if(T(e))return ve.empty();{const n=t.writeTree_.setTree(e,new D(null));return new ve(n)}}function xi(t,e){return vt(t,e)!=null}function vt(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ie(n.path,e)):null}function jo(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(B,(s,i)=>{e.push(new C(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new C(s,i.value))}),e}function Je(t,e){if(T(e))return t;{const n=vt(t,e);return n!=null?new ve(new D(n)):new ve(t.writeTree_.subtree(e))}}function Mi(t){return t.writeTree_.isEmpty()}function Lt(t,e){return Kl(A(),t.writeTree_,e)}function Kl(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=Kl(j(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(j(t,".priority"),s)),n}}/**
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
 */function Ls(t,e){return Ql(e,t)}function ym(t,e,n,s,i){g(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=un(t.visibleWrites,e,n)),t.lastWriteId=s}function wm(t,e,n,s){g(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Oi(t.visibleWrites,e,n),t.lastWriteId=s}function Im(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function Em(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Cm(a,s.path)?i=!1:pe(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return Tm(t),!0;if(s.snap)t.visibleWrites=Ho(t.visibleWrites,s.path);else{const a=s.children;Z(a,l=>{t.visibleWrites=Ho(t.visibleWrites,j(s.path,l))})}return!0}else return!1}function Cm(t,e){if(t.snap)return pe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&pe(j(t.path,n),e))return!0;return!1}function Tm(t){t.visibleWrites=ql(t.allWrites,km,A()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function km(t){return t.visible}function ql(t,e,n){let s=ve.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let a;if(r.snap)pe(n,o)?(a=ie(n,o),s=un(s,a,r.snap)):pe(o,n)&&(a=ie(o,n),s=un(s,A(),r.snap.getChild(a)));else if(r.children){if(pe(n,o))a=ie(n,o),s=Oi(s,a,r.children);else if(pe(o,n))if(a=ie(o,n),T(a))s=Oi(s,A(),r.children);else{const l=ct(r.children,E(a));if(l){const c=l.getChild(L(a));s=un(s,A(),c)}}}else throw Vt("WriteRecord should have .snap or .children")}}return s}function zl(t,e,n,s,i){if(!s&&!i){const r=vt(t.visibleWrites,e);if(r!=null)return r;{const o=Je(t.visibleWrites,e);if(Mi(o))return n;if(n==null&&!xi(o,A()))return null;{const a=n||b.EMPTY_NODE;return Lt(o,a)}}}else{const r=Je(t.visibleWrites,e);if(!i&&Mi(r))return n;if(!i&&n==null&&!xi(r,A()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(pe(c.path,e)||pe(e,c.path))},a=ql(t.allWrites,o,e),l=n||b.EMPTY_NODE;return Lt(a,l)}}}function Sm(t,e,n){let s=b.EMPTY_NODE;const i=vt(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(B,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=Je(t.visibleWrites,e);return n.forEachChild(B,(o,a)=>{const l=Lt(Je(r,new M(o)),a);s=s.updateImmediateChild(o,l)}),jo(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=Je(t.visibleWrites,e);return jo(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Am(t,e,n,s,i){g(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=j(e,n);if(xi(t.visibleWrites,r))return null;{const o=Je(t.visibleWrites,r);return Mi(o)?i.getChild(n):Lt(o,i.getChild(n))}}function Rm(t,e,n,s){const i=j(e,n),r=vt(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=Je(t.visibleWrites,i);return Lt(o,s.getNode().getImmediateChild(n))}else return null}function Nm(t,e){return vt(t.visibleWrites,e)}function Pm(t,e,n,s,i,r,o){let a;const l=Je(t.visibleWrites,e),c=vt(l,A());if(c!=null)a=c;else if(n!=null)a=Lt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),f=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let m=f.getNext();for(;m&&d.length<i;)u(m,s)!==0&&d.push(m),m=f.getNext();return d}else return[]}function Om(){return{visibleWrites:ve.empty(),allWrites:[],lastWriteId:-1}}function _s(t,e,n,s){return zl(t.writeTree,t.treePath,e,n,s)}function wr(t,e){return Sm(t.writeTree,t.treePath,e)}function Go(t,e,n,s){return Am(t.writeTree,t.treePath,e,n,s)}function gs(t,e){return Nm(t.writeTree,j(t.treePath,e))}function xm(t,e,n,s,i,r){return Pm(t.writeTree,t.treePath,e,n,s,i,r)}function Ir(t,e,n){return Rm(t.writeTree,t.treePath,e,n)}function Yl(t,e){return Ql(j(t.treePath,e),t.writeTree)}function Ql(t,e){return{treePath:t,writeTree:e}}/**
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
 */class Mm{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,yn(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,bn(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Mt(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,yn(s,e.snapshotNode,i.oldSnap));else throw Vt("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Dm{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Jl=new Dm;class Er{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new tt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ir(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:pt(this.viewCache_),r=xm(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function Lm(t){return{filter:t}}function $m(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Fm(t,e,n,s,i){const r=new Mm;let o,a;if(n.type===ge.OVERWRITE){const c=n;c.source.fromUser?o=Di(t,e,c.path,c.snap,s,i,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!T(c.path),o=vs(t,e,c.path,c.snap,s,i,a,r))}else if(n.type===ge.MERGE){const c=n;c.source.fromUser?o=Vm(t,e,c.path,c.children,s,i,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Li(t,e,c.path,c.children,s,i,a,r))}else if(n.type===ge.ACK_USER_WRITE){const c=n;c.revert?o=Hm(t,e,c.path,s,i,r):o=Bm(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===ge.LISTEN_COMPLETE)o=Wm(t,e,n.path,s,r);else throw Vt("Unknown operation type: "+n.type);const l=r.getChanges();return Um(e,o,l),{viewCache:o,changes:l}}function Um(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=ms(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(Hl(ms(e)))}}function Xl(t,e,n,s,i,r){const o=e.eventCache;if(gs(s,n)!=null)return e;{let a,l;if(T(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=pt(e),d=c instanceof b?c:b.EMPTY_NODE,u=wr(s,d);a=t.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=_s(s,pt(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=E(n);if(c===".priority"){g(et(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=Go(s,n,d,l);u!=null?a=t.filter.updatePriority(d,u):a=o.getNode()}else{const d=L(n);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=Go(s,n,o.getNode(),l);f!=null?u=o.getNode().getImmediateChild(c).updateChild(d,f):u=o.getNode().getImmediateChild(c)}else u=Ir(s,c,e.serverCache);u!=null?a=t.filter.updateChild(o.getNode(),c,u,d,i,r):a=o.getNode()}}return dn(e,a,o.isFullyInitialized()||T(n),t.filter.filtersNodes())}}function vs(t,e,n,s,i,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(T(n))c=d.updateFullNode(l.getNode(),s,null);else if(d.filtersNodes()&&!l.isFiltered()){const m=l.getNode().updateChild(n,s);c=d.updateFullNode(l.getNode(),m,null)}else{const m=E(n);if(!l.isCompleteForPath(n)&&et(n)>1)return e;const _=L(n),S=l.getNode().getImmediateChild(m).updateChild(_,s);m===".priority"?c=d.updatePriority(l.getNode(),S):c=d.updateChild(l.getNode(),m,S,_,Jl,null)}const u=Gl(e,c,l.isFullyInitialized()||T(n),d.filtersNodes()),f=new Er(i,u,r);return Xl(t,u,n,i,f,a)}function Di(t,e,n,s,i,r,o){const a=e.eventCache;let l,c;const d=new Er(i,e,r);if(T(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),l=dn(e,c,!0,t.filter.filtersNodes());else{const u=E(n);if(u===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),l=dn(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=L(n),m=a.getNode().getImmediateChild(u);let _;if(T(f))_=s;else{const y=d.getCompleteChild(u);y!=null?hr(f)===".priority"&&y.getChild(Ml(f)).isEmpty()?_=y:_=y.updateChild(f,s):_=b.EMPTY_NODE}if(m.equals(_))l=e;else{const y=t.filter.updateChild(a.getNode(),u,_,f,d,o);l=dn(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function Ko(t,e){return t.eventCache.isCompleteForChild(e)}function Vm(t,e,n,s,i,r,o){let a=e;return s.foreach((l,c)=>{const d=j(n,l);Ko(e,E(d))&&(a=Di(t,a,d,c,i,r,o))}),s.foreach((l,c)=>{const d=j(n,l);Ko(e,E(d))||(a=Di(t,a,d,c,i,r,o))}),a}function qo(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Li(t,e,n,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;T(n)?c=s:c=new D(null).setTree(n,s);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,f)=>{if(d.hasChild(u)){const m=e.serverCache.getNode().getImmediateChild(u),_=qo(t,m,f);l=vs(t,l,new M(u),_,i,r,o,a)}}),c.children.inorderTraversal((u,f)=>{const m=!e.serverCache.isCompleteForChild(u)&&f.value===null;if(!d.hasChild(u)&&!m){const _=e.serverCache.getNode().getImmediateChild(u),y=qo(t,_,f);l=vs(t,l,new M(u),y,i,r,o,a)}}),l}function Bm(t,e,n,s,i,r,o){if(gs(i,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(T(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return vs(t,e,n,l.getNode().getChild(n),i,r,a,o);if(T(n)){let c=new D(null);return l.getNode().forEachChild(Qe,(d,u)=>{c=c.set(new M(d),u)}),Li(t,e,n,c,i,r,a,o)}else return e}else{let c=new D(null);return s.foreach((d,u)=>{const f=j(n,d);l.isCompleteForPath(f)&&(c=c.set(d,l.getNode().getChild(f)))}),Li(t,e,n,c,i,r,a,o)}}function Wm(t,e,n,s,i){const r=e.serverCache,o=Gl(e,r.getNode(),r.isFullyInitialized()||T(n),r.isFiltered());return Xl(t,o,n,s,Jl,i)}function Hm(t,e,n,s,i,r){let o;if(gs(s,n)!=null)return e;{const a=new Er(s,e,i),l=e.eventCache.getNode();let c;if(T(n)||E(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=_s(s,pt(e));else{const u=e.serverCache.getNode();g(u instanceof b,"serverChildren would be complete if leaf node"),d=wr(s,u)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=E(n);let u=Ir(s,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=t.filter.updateChild(l,d,u,L(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,b.EMPTY_NODE,L(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=_s(s,pt(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||gs(s,A())!=null,dn(e,c,o,t.filter.filtersNodes())}}/**
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
 */class jm{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new _r(s.getIndex()),r=om(s);this.processor_=Lm(r);const o=n.serverCache,a=n.eventCache,l=i.updateFullNode(b.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(b.EMPTY_NODE,a.getNode(),null),d=new tt(l,o.isFullyInitialized(),i.filtersNodes()),u=new tt(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Ds(u,d),this.eventGenerator_=new mm(this.query_)}get query(){return this.query_}}function Gm(t){return t.viewCache_.serverCache.getNode()}function Km(t){return ms(t.viewCache_)}function qm(t,e){const n=pt(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!T(e)&&!n.getImmediateChild(E(e)).isEmpty())?n.getChild(e):null}function zo(t){return t.eventRegistrations_.length===0}function zm(t,e){t.eventRegistrations_.push(e)}function Yo(t,e,n){const s=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function Qo(t,e,n,s){e.type===ge.MERGE&&e.source.queryId!==null&&(g(pt(t.viewCache_),"We should always have a full cache before handling merges"),g(ms(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=Fm(t.processor_,i,e,n,s);return $m(t.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Zl(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Ym(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(B,(r,o)=>{s.push(Mt(r,o))}),n.isFullyInitialized()&&s.push(Hl(n.getNode())),Zl(t,s,n.getNode(),e)}function Zl(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return _m(t.eventGenerator_,e,n,i)}/**
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
 */let bs;class ec{constructor(){this.views=new Map}}function Qm(t){g(!bs,"__referenceConstructor has already been defined"),bs=t}function Jm(){return g(bs,"Reference.ts has not been loaded"),bs}function Xm(t){return t.views.size===0}function Cr(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return g(r!=null,"SyncTree gave us an op for an invalid query."),Qo(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(Qo(o,e,n,s));return r}}function tc(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=_s(n,i?s:null),l=!1;a?l=!0:s instanceof b?(a=wr(n,s),l=!1):(a=b.EMPTY_NODE,l=!1);const c=Ds(new tt(a,l,!1),new tt(s,i,!1));return new jm(e,c)}return o}function Zm(t,e,n,s,i,r){const o=tc(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),zm(o,n),Ym(o,n)}function e_(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const a=nt(t);if(i==="default")for(const[l,c]of t.views.entries())o=o.concat(Yo(c,n,s)),zo(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(i);l&&(o=o.concat(Yo(l,n,s)),zo(l)&&(t.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!nt(t)&&r.push(new(Jm())(e._repo,e._path)),{removed:r,events:o}}function nc(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Xe(t,e){let n=null;for(const s of t.views.values())n=n||qm(s,e);return n}function sc(t,e){if(e._queryParams.loadsAllData())return $s(t);{const s=e._queryIdentifier;return t.views.get(s)}}function ic(t,e){return sc(t,e)!=null}function nt(t){return $s(t)!=null}function $s(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let ys;function t_(t){g(!ys,"__referenceConstructor has already been defined"),ys=t}function n_(){return g(ys,"Reference.ts has not been loaded"),ys}let s_=1;class Jo{constructor(e){this.listenProvider_=e,this.syncPointTree_=new D(null),this.pendingWriteTree_=Om(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Tr(t,e,n,s,i){return ym(t.pendingWriteTree_,e,n,s,i),i?Kt(t,new ft(vr(),e,n)):[]}function i_(t,e,n,s){wm(t.pendingWriteTree_,e,n,s);const i=D.fromObject(n);return Kt(t,new Dt(vr(),e,i))}function Ke(t,e,n=!1){const s=Im(t.pendingWriteTree_,e);if(Em(t.pendingWriteTree_,e)){let r=new D(null);return s.snap!=null?r=r.set(A(),!0):Z(s.children,o=>{r=r.set(new M(o),!0)}),Kt(t,new ps(s.path,r,n))}else return[]}function Fn(t,e,n){return Kt(t,new ft(br(),e,n))}function r_(t,e,n){const s=D.fromObject(n);return Kt(t,new Dt(br(),e,s))}function o_(t,e){return Kt(t,new In(br(),e))}function a_(t,e,n){const s=kr(t,n);if(s){const i=Sr(s),r=i.path,o=i.queryId,a=ie(r,e),l=new In(yr(o),a);return Ar(t,r,l)}else return[]}function ws(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||ic(o,e))){const l=e_(o,e,n,s);Xm(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,u=t.syncPointTree_.findOnPath(r,(f,m)=>nt(m));if(d&&!u){const f=t.syncPointTree_.subtree(r);if(!f.isEmpty()){const m=d_(f);for(let _=0;_<m.length;++_){const y=m[_],S=y.query,Q=lc(t,y);t.listenProvider_.startListening(hn(S),En(t,S),Q.hashFn,Q.onComplete)}}}!u&&c.length>0&&!s&&(d?t.listenProvider_.stopListening(hn(e),null):c.forEach(f=>{const m=t.queryToTagMap.get(Us(f));t.listenProvider_.stopListening(hn(f),m)}))}u_(t,c)}return a}function rc(t,e,n,s){const i=kr(t,s);if(i!=null){const r=Sr(i),o=r.path,a=r.queryId,l=ie(o,e),c=new ft(yr(a),l,n);return Ar(t,o,c)}else return[]}function l_(t,e,n,s){const i=kr(t,s);if(i){const r=Sr(i),o=r.path,a=r.queryId,l=ie(o,e),c=D.fromObject(n),d=new Dt(yr(a),l,c);return Ar(t,o,d)}else return[]}function $i(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,m)=>{const _=ie(f,i);r=r||Xe(m,_),o=o||nt(m)});let a=t.syncPointTree_.get(i);a?(o=o||nt(a),r=r||Xe(a,A())):(a=new ec,t.syncPointTree_=t.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=b.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((m,_)=>{const y=Xe(_,A());y&&(r=r.updateImmediateChild(m,y))}));const c=ic(a,e);if(!c&&!e._queryParams.loadsAllData()){const f=Us(e);g(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const m=h_();t.queryToTagMap.set(f,m),t.tagToQueryMap.set(m,f)}const d=Ls(t.pendingWriteTree_,i);let u=Zm(a,e,n,d,r,l);if(!c&&!o&&!s){const f=sc(a,e);u=u.concat(f_(t,e,f))}return u}function Fs(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=ie(o,e),c=Xe(a,l);if(c)return c});return zl(i,e,r,n,!0)}function c_(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(c,d)=>{const u=ie(c,n);s=s||Xe(d,u)});let i=t.syncPointTree_.get(n);i?s=s||Xe(i,A()):(i=new ec,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new tt(s,!0,!1):null,a=Ls(t.pendingWriteTree_,e._path),l=tc(i,e,a,r?o.getNode():b.EMPTY_NODE,r);return Km(l)}function Kt(t,e){return oc(e,t.syncPointTree_,null,Ls(t.pendingWriteTree_,A()))}function oc(t,e,n,s){if(T(t.path))return ac(t,e,n,s);{const i=e.get(A());n==null&&i!=null&&(n=Xe(i,A()));let r=[];const o=E(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=Yl(s,o);r=r.concat(oc(a,l,c,d))}return i&&(r=r.concat(Cr(i,t,s,n))),r}}function ac(t,e,n,s){const i=e.get(A());n==null&&i!=null&&(n=Xe(i,A()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=Yl(s,o),d=t.operationForChild(o);d&&(r=r.concat(ac(d,a,l,c)))}),i&&(r=r.concat(Cr(i,t,s,n))),r}function lc(t,e){const n=e.query,s=En(t,n);return{hashFn:()=>(Gm(e)||b.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?a_(t,n._path,s):o_(t,n._path);{const r=op(i,n);return ws(t,n,null,r)}}}}function En(t,e){const n=Us(e);return t.queryToTagMap.get(n)}function Us(t){return t._path.toString()+"$"+t._queryIdentifier}function kr(t,e){return t.tagToQueryMap.get(e)}function Sr(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new M(t.substr(0,e))}}function Ar(t,e,n){const s=t.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const i=Ls(t.pendingWriteTree_,e);return Cr(s,n,i,null)}function d_(t){return t.fold((e,n,s)=>{if(n&&nt(n))return[$s(n)];{let i=[];return n&&(i=nc(n)),Z(s,(r,o)=>{i=i.concat(o)}),i}})}function hn(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(n_())(t._repo,t._path):t}function u_(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=Us(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function h_(){return s_++}function f_(t,e,n){const s=e._path,i=En(t,e),r=lc(t,n),o=t.listenProvider_.startListening(hn(e),i,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(s);if(i)g(!nt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!T(c)&&d&&nt(d))return[$s(d).query];{let f=[];return d&&(f=f.concat(nc(d).map(m=>m.query))),Z(u,(m,_)=>{f=f.concat(_)}),f}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(hn(d),En(t,d))}}return o}/**
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
 */class Rr{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Rr(n)}node(){return this.node_}}class Nr{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=j(this.path_,e);return new Nr(this.syncTree_,n)}node(){return Fs(this.syncTree_,this.path_)}}const p_=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Xo=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return m_(t[".sv"],e,n);if(typeof t[".sv"]=="object")return __(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},m_=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},__=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const i=e.node();if(g(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},cc=function(t,e,n,s){return Or(e,new Nr(n,t),s)},Pr=function(t,e,n){return Or(t,new Rr(e),n)};function Or(t,e,n){const s=t.getPriority().val(),i=Xo(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Xo(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new z(a,K(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new z(i))),o.forEachChild(B,(a,l)=>{const c=Or(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class xr{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function Vs(t,e){let n=e instanceof M?e:new M(e),s=t,i=E(n);for(;i!==null;){const r=ct(s.node.children,i)||{children:{},childCount:0};s=new xr(i,s,r),n=L(n),i=E(n)}return s}function bt(t){return t.node.value}function Mr(t,e){t.node.value=e,Fi(t)}function dc(t){return t.node.childCount>0}function g_(t){return bt(t)===void 0&&!dc(t)}function Bs(t,e){Z(t.node.children,(n,s)=>{e(new xr(n,t,s))})}function uc(t,e,n,s){n&&e(t),Bs(t,i=>{uc(i,e,!0)})}function v_(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Un(t){return new M(t.parent===null?t.name:Un(t.parent)+"/"+t.name)}function Fi(t){t.parent!==null&&b_(t.parent,t.name,t)}function b_(t,e,n){const s=g_(n),i=be(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,Fi(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,Fi(t))}/**
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
 */const y_=/[\[\].#$\/\u0000-\u001F\u007F]/,w_=/[\[\].#$\u0000-\u001F\u007F]/,hi=10*1024*1024,Dr=function(t){return typeof t=="string"&&t.length!==0&&!y_.test(t)},hc=function(t){return typeof t=="string"&&t.length!==0&&!w_.test(t)},I_=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),hc(t)},Is=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!ar(t)||t&&typeof t=="object"&&be(t,".sv")},fc=function(t,e,n,s){s&&e===void 0||Vn(Ns(t,"value"),e,n)},Vn=function(t,e,n){const s=n instanceof M?new Vp(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ot(s));if(typeof e=="function")throw new Error(t+"contains a function "+ot(s)+" with contents = "+e.toString());if(ar(e))throw new Error(t+"contains "+e.toString()+" "+ot(s));if(typeof e=="string"&&e.length>hi/3&&Ps(e)>hi)throw new Error(t+"contains a string greater than "+hi+" utf8 bytes "+ot(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(Z(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Dr(o)))throw new Error(t+" contains an invalid key ("+o+") "+ot(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Bp(s,o),Vn(t,a,s),Wp(s)}),i&&r)throw new Error(t+' contains ".value" child '+ot(s)+" in addition to actual children.")}},E_=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=vn(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Dr(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Up);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&pe(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},C_=function(t,e,n,s){const i=Ns(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];Z(e,(o,a)=>{const l=new M(o);if(Vn(i,a,j(n,l)),hr(l)===".priority"&&!Is(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),E_(i,r)},pc=function(t,e,n,s){if(!hc(n))throw new Error(Ns(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},T_=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),pc(t,e,n)},Lr=function(t,e){if(E(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},k_=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Dr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!I_(n))throw new Error(Ns(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class S_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ws(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!fr(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function mc(t,e,n){Ws(t,n),_c(t,s=>fr(s,e))}function he(t,e,n){Ws(t,n),_c(t,s=>pe(s,e)||pe(e,s))}function _c(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(A_(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function A_(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();ln&&J("event: "+n.toString()),Gt(s)}}}/**
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
 */const R_="repo_interrupt",N_=25;class P_{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new S_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=fs(),this.transactionQueueTree_=new xr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function O_(t,e,n){if(t.stats_=dr(t.repoInfo_),t.forceRestClient_||dp())t.server_=new hs(t.repoInfo_,(s,i,r,o)=>{Zo(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>ea(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{q(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new Ae(t.repoInfo_,e,(s,i,r,o)=>{Zo(t,s,i,r,o)},s=>{ea(t,s)},s=>{x_(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=mp(t.repoInfo_,()=>new pm(t.stats_,t.server_)),t.infoData_=new cm,t.infoSyncTree_=new Jo({startListening:(s,i,r,o)=>{let a=[];const l=t.infoData_.getNode(s._path);return l.isEmpty()||(a=Fn(t.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),$r(t,"connected",!1),t.serverSyncTree_=new Jo({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);he(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function gc(t){const n=t.infoData_.getNode(new M(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Bn(t){return p_({timestamp:gc(t)})}function Zo(t,e,n,s,i){t.dataUpdateCount++;const r=new M(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const l=ts(n,c=>K(c));o=l_(t.serverSyncTree_,r,l,i)}else{const l=K(n);o=rc(t.serverSyncTree_,r,l,i)}else if(s){const l=ts(n,c=>K(c));o=r_(t.serverSyncTree_,r,l)}else{const l=K(n);o=Fn(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=$t(t,r)),he(t.eventQueue_,a,o)}function ea(t,e){$r(t,"connected",e),e===!1&&$_(t)}function x_(t,e){Z(e,(n,s)=>{$r(t,n,s)})}function $r(t,e,n){const s=new M("/.info/"+e),i=K(n);t.infoData_.updateSnapshot(s,i);const r=Fn(t.infoSyncTree_,s,i);he(t.eventQueue_,s,r)}function Hs(t){return t.nextWriteId_++}function M_(t,e,n){const s=c_(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=K(i).withIndex(e._queryParams.getIndex());$i(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Fn(t.serverSyncTree_,e._path,r);else{const a=En(t.serverSyncTree_,e);o=rc(t.serverSyncTree_,e._path,r,a)}return he(t.eventQueue_,e._path,o),ws(t.serverSyncTree_,e,n,null,!0),r},i=>(qt(t,"get for query "+q(e)+" failed: "+i),Promise.reject(new Error(i))))}function D_(t,e,n,s,i){qt(t,"set",{path:e.toString(),value:n,priority:s});const r=Bn(t),o=K(n,s),a=Fs(t.serverSyncTree_,e),l=Pr(o,a,r),c=Hs(t),d=Tr(t.serverSyncTree_,e,l,c,!0);Ws(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(f,m)=>{const _=f==="ok";_||re("set at "+e+" failed: "+f);const y=Ke(t.serverSyncTree_,c,!_);he(t.eventQueue_,e,y),Ui(t,i,f,m)});const u=Ur(t,e);$t(t,u),he(t.eventQueue_,u,[])}function L_(t,e,n,s){qt(t,"update",{path:e.toString(),value:n});let i=!0;const r=Bn(t),o={};if(Z(n,(a,l)=>{i=!1,o[a]=cc(j(e,a),K(l),t.serverSyncTree_,r)}),i)J("update() called with empty data.  Don't do anything."),Ui(t,s,"ok",void 0);else{const a=Hs(t),l=i_(t.serverSyncTree_,e,o,a);Ws(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,d)=>{const u=c==="ok";u||re("update at "+e+" failed: "+c);const f=Ke(t.serverSyncTree_,a,!u),m=f.length>0?$t(t,e):e;he(t.eventQueue_,m,f),Ui(t,s,c,d)}),Z(n,c=>{const d=Ur(t,j(e,c));$t(t,d)}),he(t.eventQueue_,e,[])}}function $_(t){qt(t,"onDisconnectEvents");const e=Bn(t),n=fs();Pi(t.onDisconnect_,A(),(i,r)=>{const o=cc(i,r,t.serverSyncTree_,e);jl(n,i,o)});let s=[];Pi(n,A(),(i,r)=>{s=s.concat(Fn(t.serverSyncTree_,i,r));const o=Ur(t,i);$t(t,o)}),t.onDisconnect_=fs(),he(t.eventQueue_,A(),s)}function F_(t,e,n){let s;E(e._path)===".info"?s=$i(t.infoSyncTree_,e,n):s=$i(t.serverSyncTree_,e,n),mc(t.eventQueue_,e._path,s)}function U_(t,e,n){let s;E(e._path)===".info"?s=ws(t.infoSyncTree_,e,n):s=ws(t.serverSyncTree_,e,n),mc(t.eventQueue_,e._path,s)}function V_(t){t.persistentConnection_&&t.persistentConnection_.interrupt(R_)}function qt(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),J(n,...e)}function Ui(t,e,n,s){e&&Gt(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function B_(t,e,n,s,i,r){qt(t,"transaction on "+e);const o={path:e,update:n,onComplete:s,status:null,order:hl(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Fr(t,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Vn("transaction failed: Data returned ",l,o.path),o.status=0;const c=Vs(t.transactionQueueTree_,e),d=bt(c)||[];d.push(o),Mr(c,d);let u;typeof l=="object"&&l!==null&&be(l,".priority")?(u=ct(l,".priority"),g(Is(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Fs(t.serverSyncTree_,e)||b.EMPTY_NODE).getPriority().val();const f=Bn(t),m=K(l,u),_=Pr(m,a,f);o.currentOutputSnapshotRaw=m,o.currentOutputSnapshotResolved=_,o.currentWriteId=Hs(t);const y=Tr(t.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);he(t.eventQueue_,e,y),js(t,t.transactionQueueTree_)}}function Fr(t,e,n){return Fs(t.serverSyncTree_,e,n)||b.EMPTY_NODE}function js(t,e=t.transactionQueueTree_){if(e||Gs(t,e),bt(e)){const n=bc(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&W_(t,Un(e),n)}else dc(e)&&Bs(e,n=>{js(t,n)})}function W_(t,e,n){const s=n.map(c=>c.currentWriteId),i=Fr(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const d=n[c];g(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=ie(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{qt(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let f=0;f<n.length;f++)n[f].status=2,d=d.concat(Ke(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&u.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Gs(t,Vs(t.transactionQueueTree_,e)),js(t,t.transactionQueueTree_),he(t.eventQueue_,e,d);for(let f=0;f<u.length;f++)Gt(u[f])}else{if(c==="datastale")for(let u=0;u<n.length;u++)n[u].status===3?n[u].status=4:n[u].status=0;else{re("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<n.length;u++)n[u].status=4,n[u].abortReason=c}$t(t,e)}},o)}function $t(t,e){const n=vc(t,e),s=Un(n),i=bc(t,n);return H_(t,i,s),s}function H_(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=ie(n,l.path);let d=!1,u;if(g(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,i=i.concat(Ke(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=N_)d=!0,u="maxretry",i=i.concat(Ke(t.serverSyncTree_,l.currentWriteId,!0));else{const f=Fr(t,l.path,o);l.currentInputSnapshot=f;const m=e[a].update(f.val());if(m!==void 0){Vn("transaction failed: Data returned ",m,l.path);let _=K(m);typeof m=="object"&&m!=null&&be(m,".priority")||(_=_.updatePriority(f.getPriority()));const S=l.currentWriteId,Q=Bn(t),te=Pr(_,f,Q);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=te,l.currentWriteId=Hs(t),o.splice(o.indexOf(S),1),i=i.concat(Tr(t.serverSyncTree_,l.path,te,l.currentWriteId,l.applyLocally)),i=i.concat(Ke(t.serverSyncTree_,S,!0))}else d=!0,u="nodata",i=i.concat(Ke(t.serverSyncTree_,l.currentWriteId,!0))}he(t.eventQueue_,n,i),i=[],d&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}Gs(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)Gt(s[a]);js(t,t.transactionQueueTree_)}function vc(t,e){let n,s=t.transactionQueueTree_;for(n=E(e);n!==null&&bt(s)===void 0;)s=Vs(s,n),e=L(e),n=E(e);return s}function bc(t,e){const n=[];return yc(t,e,n),n.sort((s,i)=>s.order-i.order),n}function yc(t,e,n){const s=bt(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Bs(e,i=>{yc(t,i,n)})}function Gs(t,e){const n=bt(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,Mr(e,n.length>0?n:void 0)}Bs(e,s=>{Gs(t,s)})}function Ur(t,e){const n=Un(vc(t,e)),s=Vs(t.transactionQueueTree_,e);return v_(s,i=>{fi(t,i)}),fi(t,s),uc(s,i=>{fi(t,i)}),n}function fi(t,e){const n=bt(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Ke(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Mr(e,void 0):n.length=r+1,he(t.eventQueue_,Un(e),i);for(let o=0;o<s.length;o++)Gt(s[o])}}/**
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
 */function j_(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function G_(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):re(`Invalid query segment '${n}' in query '${t}'`)}return e}const ta=function(t,e){const n=K_(t),s=n.namespace;n.domain==="firebase.com"&&xe(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&xe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||tp();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Tl(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new M(n.pathString)}},K_=function(t){let e="",n="",s="",i="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let u=t.indexOf("?");u===-1&&(u=t.length),e=t.substring(0,Math.min(d,u)),d<u&&(i=j_(t.substring(d,u)));const f=G_(t.substring(Math.min(t.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const m=e.slice(0,c);if(m.toLowerCase()==="localhost")n="localhost";else if(m.split(".").length<=2)n=m;else{const _=e.indexOf(".");s=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=s}"ns"in f&&(r=f.ns)}return{host:e,port:l,domain:n,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
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
 */const na="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",q_=function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=na.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=na.charAt(e[i]);return g(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class z_{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+q(this.snapshot.exportVal())}}class Y_{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class wc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Wn{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return T(this._path)?null:hr(this._path)}get ref(){return new Ee(this._repo,this._path)}get _queryIdentifier(){const e=Bo(this._queryParams),n=lr(e);return n==="{}"?"default":n}get _queryObject(){return Bo(this._queryParams)}isEqual(e){if(e=se(e),!(e instanceof Wn))return!1;const n=this._repo===e._repo,s=fr(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Fp(this._path)}}function Q_(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function J_(t){let e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===Qe){const s="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){if(t.getIndexStartName()!==ht)throw new Error(s);if(typeof e!="string")throw new Error(i)}if(t.hasEnd()){if(t.getIndexEndName()!==Ze)throw new Error(s);if(typeof n!="string")throw new Error(i)}}else if(t.getIndex()===B){if(e!=null&&!Is(e)||n!=null&&!Is(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(g(t.getIndex()instanceof Bl||t.getIndex()===Wl,"unknown index type."),e!=null&&typeof e=="object"||n!=null&&typeof n=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class Ee extends Wn{constructor(e,n){super(e,n,new gr,!1)}get parent(){const e=Ml(this._path);return e===null?null:new Ee(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ft{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new M(e),s=Cn(this.ref,e);return new Ft(this._node.getChild(n),s,B)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Ft(i,Cn(this.ref,s),B)))}hasChild(e){const n=new M(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function yt(t,e){return t=se(t),t._checkNotDeleted("ref"),e!==void 0?Cn(t._root,e):t._root}function Cn(t,e){return t=se(t),E(t._path)===null?T_("child","path",e):pc("child","path",e),new Ee(t._repo,j(t._path,e))}function Ic(t,e){t=se(t),Lr("push",t._path),fc("push",e,t._path,!0);const n=gc(t._repo),s=q_(n),i=Cn(t,s),r=Cn(t,s);let o;return e!=null?o=X_(r,e).then(()=>r):o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function X_(t,e){t=se(t),Lr("set",t._path),fc("set",e,t._path,!1);const n=new Bt;return D_(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function $(t,e){C_("update",e,t._path);const n=new Bt;return L_(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function nn(t){t=se(t);const e=new wc(()=>{}),n=new Ks(e);return M_(t._repo,t,n).then(s=>new Ft(s,new Ee(t._repo,t._path),t._queryParams.getIndex()))}class Ks{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new z_("value",this,new Ft(e.snapshotNode,new Ee(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Y_(this,e,n):null}matches(e){return e instanceof Ks?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Z_(t,e,n,s,i){const r=new wc(n,void 0),o=new Ks(r);return F_(t._repo,t,o),()=>U_(t._repo,t,o)}function eg(t,e,n,s){return Z_(t,"value",e)}class Ec{}class tg extends Ec{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Wn(e._repo,e._path,am(e._queryParams,this._limit),e._orderByCalled)}}function sa(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new tg(t)}class ng extends Ec{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){Q_(e,"orderByKey");const n=lm(e._queryParams,Qe);return J_(n),new Wn(e._repo,e._path,n,!0)}}function ia(){return new ng}function ra(t,...e){let n=se(t);for(const s of e)n=s._apply(n);return n}Qm(Ee);t_(Ee);/**
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
 */const sg="FIREBASE_DATABASE_EMULATOR_HOST",Vi={};let ig=!1;function rg(t,e,n,s){t.repoInfo_=new Tl(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),s&&(t.authTokenProvider_=s)}function og(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||xe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),J("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=ta(r,i),a=o.repoInfo,l;typeof process<"u"&&Eo&&(l=Eo[sg]),l?(r=`http://${l}?ns=${a.namespace}`,o=ta(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new hp(t.name,t.options,e);k_("Invalid Firebase Database URL",o),T(o.path)||xe("Database URL must point to the root of a Firebase Database (not including a child path).");const d=lg(a,t,c,new up(t.name,n));return new cg(d,t)}function ag(t,e){const n=Vi[e];(!n||n[t.key]!==t)&&xe(`Database ${e}(${t.repoInfo_}) has already been deleted.`),V_(t),delete n[t.key]}function lg(t,e,n,s){let i=Vi[e.name];i||(i={},Vi[e.name]=i);let r=i[t.toURLString()];return r&&xe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new P_(t,ig,n,s),i[t.toURLString()]=r,r}class cg{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(O_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ee(this._repo,A())),this._rootInternal}_delete(){return this._rootInternal!==null&&(ag(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&xe("Cannot call "+e+" on a deleted database.")}}function dg(t=Ra(),e){const n=Qi(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Cd("database");s&&ug(n,...s)}return n}function ug(t,e,n,s={}){t=se(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&xe("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let r;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&xe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Xn(Xn.OWNER);else if(s.mockUserToken){const o=typeof s.mockUserToken=="string"?s.mockUserToken:Td(s.mockUserToken,t.app.options.projectId);r=new Xn(o)}rg(i,e,n,r)}/**
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
 */function hg(t){Qf(Ht),Ot(new dt("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return og(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),Ye(Co,To,t),Ye(Co,To,"esm2017")}/**
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
 */class fg{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function ce(t,e,n){var s;if(t=se(t),Lr("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const i=(s=void 0)!==null&&s!==void 0?s:!0,r=new Bt,o=(l,c,d)=>{let u=null;l?r.reject(l):(u=new Ft(d,new Ee(t._repo,t._path),B),r.resolve(new fg(c,u)))},a=eg(t,()=>{});return B_(t._repo,t._path,e,o,a,i),r.promise}Ae.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Ae.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};hg();const Bi={apiKey:"AIzaSyARFa-vzKVmIdxP5xDRXVzasL2ui94eZ-w",authDomain:"market-6e66a.firebaseapp.com",databaseURL:"https://market-6e66a-default-rtdb.firebaseio.com",projectId:"market-6e66a",storageBucket:"market-6e66a.firebasestorage.app",messagingSenderId:"402312269082",appId:"1:402312269082:web:cf304afc54057ea162b0a3"},pg=!!Bi.apiKey&&!!Bi.databaseURL;let sn=null,oa=null,aa=null;function Le(){return sn||(sn=Aa(Bi),oa=zf(sn),aa=dg(sn)),{app:sn,auth:oa,db:aa}}function mg(){const{auth:t}=Le();return new Promise(e=>{let n=!1;const s=Lh(t,i=>{n||(n=!0,s(),e(i||null))},()=>e(null));setTimeout(()=>{n||(n=!0,e(t.currentUser||null))},4e3)})}const _g="../STONK-Home/index.html",pi=2600;function gg(t){return String(t||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"")}function vg(){return/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)||location.protocol==="file:"}function bg(t){const e=gg(t);return _g+(e?`?room=${encodeURIComponent(e)}`:"")}function yg({title:t="STONK Home에서 입장해 주세요",message:e="",roomCode:n="",auto:s=!0}={}){var l;const i=bg(n),r=document.getElementById("stonk-home-gate");r&&r.remove();const o=document.createElement("div");o.id="stonk-home-gate",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),Object.assign(o.style,{position:"fixed",inset:"0",zIndex:"99999",display:"grid",placeItems:"center",padding:"24px",background:"radial-gradient(120% 90% at 50% -10%, rgba(139,108,255,0.22), transparent 60%), rgba(5,6,10,0.94)",backdropFilter:"blur(8px)",color:"#f4f7ff",fontFamily:"Pretendard, Inter, 'Noto Sans KR', system-ui, sans-serif"});const a=s&&!vg();if(o.innerHTML=`
    <div style="width:min(460px,100%);text-align:center;padding:32px 26px;border:1px solid rgba(255,255,255,0.14);border-radius:18px;background:rgba(14,16,24,0.92);box-shadow:0 24px 70px rgba(0,0,0,0.5),0 0 60px rgba(139,108,255,0.16)">
      <div style="font-size:13px;font-weight:900;letter-spacing:2px;color:#8b6cff;margin-bottom:8px">STONK UNIVERSE</div>
      <h2 style="margin:0 0 10px;font-size:1.5rem">${t}</h2>
      <p style="margin:0 0 18px;color:#aab2c8;font-size:0.95rem;line-height:1.5">${e||"로그인 · 방 선택 · 닉네임 설정은 STONK Home에서 진행합니다."}</p>
      <a data-home-go href="${i}" style="display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 26px;border-radius:14px;font-weight:900;text-decoration:none;color:#0a0a12;background:linear-gradient(135deg,#a99bff,#8b6cff);box-shadow:0 10px 30px rgba(139,108,255,0.4)">STONK Home으로 이동</a>
      ${n?`<div style="margin-top:14px;font-size:0.82rem;color:#8a93a8">방 코드 <b style="color:#41e0ff;letter-spacing:2px">${n}</b> 유지</div>`:""}
      ${a?`<div style="margin-top:12px;font-size:0.8rem;color:#8a93a8"><span data-gate-count>${Math.ceil(pi/1e3)}</span>초 후 자동 이동…</div>`:'<div style="margin-top:12px;font-size:0.78rem;color:#5f6678">개발 모드: 자동 이동 없음</div>'}
    </div>
  `,document.body.appendChild(o),(l=o.querySelector("[data-home-go]"))==null||l.addEventListener("click",c=>{c.preventDefault(),location.href=i}),a){let c=Math.ceil(pi/1e3);const d=o.querySelector("[data-gate-count]"),u=setInterval(()=>{c-=1,d&&(d.textContent=String(Math.max(0,c))),c<=0&&clearInterval(u)},1e3);setTimeout(()=>{location.href=i},pi)}return o}const it="MAIN",Tn=.002,kn=.01,Cc=60*60*1e3,Sn=60,Tc={d1:{id:"d1",label:"1일 정기예금",ms:24*3600*1e3,rate:.005,desc:"24시간 · 이자 0.5%"},d3:{id:"d3",label:"3일 정기예금",ms:72*3600*1e3,rate:.018,desc:"72시간 · 이자 1.8%"}},kc={S:5e7,A:3e7,B:15e6,C:7e6,D:3e6,F:0},Sc={arcade:{id:"arcade",title:"Arcade 손실 완화 보험",premium:3e6,ms:24*3600*1e3,desc:"24시간 · 아케이드 큰 손실 시 일부 완화(예정)"},gacha:{id:"gacha",title:"Gacha 폭망 보호권",premium:5e6,ms:24*3600*1e3,desc:"24시간 · 가챠 과소비 경고 강화"},loan:{id:"loan",title:"대출 유예권",premium:2e6,ms:24*3600*1e3,desc:"24시간 · 대출 위험도를 한 단계 완화 표시(신용등급과는 별개)"}},Ac={stable:{id:"stable",title:"안정형 펀드",ms:6*3600*1e3,min:-.01,max:.02,risk:"낮음"},growth:{id:"growth",title:"성장형 펀드",ms:12*3600*1e3,min:-.05,max:.08,risk:"중간"},ipo:{id:"ipo",title:"IPO 청약 상품",ms:24*3600*1e3,min:-.2,max:.35,risk:"높음"},lever:{id:"lever",title:"레버리지 펀드",ms:24*3600*1e3,min:-.4,max:.6,risk:"매우 높음"}},An=["NORMAL","SILVER","GOLD","PLATINUM","BLACK"],Rc={NORMAL:0,SILVER:30,GOLD:55,PLATINUM:78,BLACK:92},Es=.003,Nc="GOLD",Pc={NORMAL:0,SILVER:.03,GOLD:.05,PLATINUM:.08,BLACK:.1},Oc={NORMAL:0,SILVER:0,GOLD:.003,PLATINUM:.0035,BLACK:.004};function xc(t){return Pc[t]||0}function Cs(t){return Oc[t]||0}function Me(t){return Math.max(0,An.indexOf(t||"NORMAL"))}const Mc={pbond:{id:"pbond",title:"PLATINUM 안정 채권",ms:24*3600*1e3,min:-.02,max:.04,risk:"낮음",requiredVipTier:"PLATINUM"},bsecret:{id:"bsecret",title:"BLACK 시크릿 펀드",ms:48*3600*1e3,min:-.15,max:.2,risk:"매우 높음",requiredVipTier:"BLACK"}},Dc=12*3600*1e3,Lc=3,mt={BASIC:{id:"BASIC",title:"BASIC Card",limit:5e6,minGrade:"B",minVip:"NORMAL",insExtra:0,perk:"기본 게임머니 신용카드"},GOLD:{id:"GOLD",title:"GOLD Card",limit:2e7,minGrade:"A",minVip:"GOLD",insExtra:.02,perk:"보험 할인 +2% · 결제 알림 강화"},PLATINUM:{id:"PLATINUM",title:"PLATINUM Card",limit:5e7,minGrade:"S",minVip:"PLATINUM",insExtra:0,perk:"카드 이용 시 VIP 점수 소폭 +"},BLACK:{id:"BLACK",title:"BLACK Card",limit:1e8,minGrade:"S",minVip:"BLACK",insExtra:0,perk:"BLACK 전용 디자인 · 프리미엄 효과"}},$c=["BASIC","GOLD","PLATINUM","BLACK"],wg={F:0,D:1,C:2,B:3,A:4,S:5};function Rn(t){return wg[t]||0}const qs={lowrate:{id:"lowrate",type:"lowrate",title:"저금리 데이",desc:"예금·대출 이자가 소폭 낮아집니다."},highrate:{id:"highrate",type:"highrate",title:"고금리 데이",desc:"예금·대출 이자가 소폭 높아지고 대출 경고가 강해집니다."},boom:{id:"boom",type:"boom",title:"투자 호황",desc:"신규 투자상품의 기대 상단이 소폭 올라갑니다."},bust:{id:"bust",type:"bust",title:"투자 침체",desc:"신규 투자상품의 손실 가능성이 커지고 경고가 강해집니다."},insurance:{id:"insurance",type:"insurance",title:"보험 우대 기간",desc:"보험 가입비가 추가 5% 할인됩니다(총 할인 최대 20%)."},cashback:{id:"cashback",type:"cashback",title:"카드 캐시백 이벤트",desc:"카드 납부 시 VIP 점수가 소폭 증가합니다."},vipweek:{id:"vipweek",type:"vipweek",title:"VIP 우대 기간",desc:"VIP 점수 획득과 VIP 금고 이자가 소폭 증가합니다."},caution:{id:"caution",type:"caution",title:"금융 경계주의보",desc:"대출·카드 고액 사용 경고가 강화됩니다. (보상 없음)"}},Wi=Object.keys(qs);function wt(t){const e={depositMult:1,loanMult:1,insExtraDisc:0,investMinAdd:0,investMaxAdd:0,vipVaultAdd:0,vipGainMult:1,cardCashbackVip:0,warnBoost:!1};if(t&&t.custom&&t.effects&&typeof t.effects=="object"){const s=t.effects,i=(r,o,a,l)=>(r=Number(r),Number.isFinite(r)?Math.max(o,Math.min(a,r)):l);return e.depositMult=i(s.depositRateMultiplier,.5,1.5,1),e.loanMult=i(s.loanRateMultiplier,.5,1.5,1),e.insExtraDisc=i(s.insuranceExtraDiscount,0,.1,0),e.investMinAdd=i(s.investMinDelta,-.1,.1,0),e.investMaxAdd=i(s.investMaxDelta,-.1,.1,0),e.vipGainMult=i(s.vipScoreMultiplier,1,2,1),e.vipVaultAdd=i(s.vipVaultBonusRate,0,.001,0),e.cardCashbackVip=Math.round(i(s.cardPayVipBonus,0,5,0)),e.warnBoost=!!s.warnBoost,e}const n=t&&t.type;return n==="lowrate"?(e.depositMult=.7,e.loanMult=.7):n==="highrate"?(e.depositMult=1.3,e.loanMult=1.3,e.warnBoost=!0):n==="boom"?e.investMaxAdd=.03:n==="bust"?(e.investMinAdd=-.05,e.warnBoost=!0):n==="insurance"?e.insExtraDisc=.05:n==="cashback"?e.cardCashbackVip=1:n==="vipweek"?(e.vipVaultAdd=5e-4,e.vipGainMult=1.2):n==="caution"&&(e.warnBoost=!0),e}function Fc(t){let e=2166136261;const n="bankevt:"+String(t);for(let i=0;i<n.length;i++)e^=n.charCodeAt(i),e=Math.imul(e,16777619);const s=Wi[(e>>>0)%Wi.length];return Object.assign({},qs[s],{seed:n,manual:!1})}function Uc(t){const e=new Date((t||Date.now())+324e5);return`${e.getUTCFullYear()}-${e.getUTCMonth()+1}-${e.getUTCDate()}`}let De=null;function Vc(t){De=t||null}function R(t){const e=Number(t);return Number.isFinite(e)?e:0}function h(t){return Math.trunc(R(t))}function ee(t){return t=Math.round(R(t)),Math.max(0,Math.min(100,t))}function me(t){return t=ee(t),t>=90?"S":t>=75?"A":t>=55?"B":t>=35?"C":t>=15?"D":"F"}function Bc(t){return kc[t]??0}function N(t){return h(t).toLocaleString("ko-KR")+"원"}const Ig=t=>yt(Le().db,`rooms/${it}/players/${t}`),de=t=>yt(Le().db,`rooms/${it}/players/${t}/cash`),V=t=>yt(Le().db,`rooms/${it}/bank/${t}`),Wc=t=>yt(Le().db,`rooms/${it}/bank/${t}/tx`),Ts=t=>yt(Le().db,`rooms/${it}/bank/${t}/messages`),Eg=()=>yt(Le().db,`rooms/${it}/bankEvents/current`);function Hc(t){return{enabled:!1,cardTier:"",cardLimit:0,usedAmount:0,billingAmount:0,dueAt:0,lastBilledAt:0,lastOverdueProcessedAt:0,overdue:!1,overdueCount:0,suspended:!1,autoPayEnabled:!1,autoPayMode:"off",autoPayLastProcessedAt:0,createdAt:t||Date.now(),updatedAt:t||Date.now()}}function jc(t,e){const n=t&&typeof t=="object"?t:{};return{enabled:!!n.enabled,cardTier:n.cardTier||"",cardLimit:Math.max(0,h(n.cardLimit)),usedAmount:Math.max(0,h(n.usedAmount)),billingAmount:Math.max(0,h(n.billingAmount)),dueAt:h(n.dueAt),lastBilledAt:h(n.lastBilledAt),lastOverdueProcessedAt:h(n.lastOverdueProcessedAt),overdue:!!n.overdue,overdueCount:Math.max(0,h(n.overdueCount)),suspended:!!n.suspended,autoPayEnabled:!!n.autoPayEnabled,autoPayMode:n.autoPayMode||(n.autoPayEnabled?"full":"off"),autoPayLastProcessedAt:h(n.autoPayLastProcessedAt),createdAt:h(n.createdAt)||e,updatedAt:e}}function Cg(t){const e=Math.max(h(t&&t.billingAmount),h(t&&t.usedAmount));return e<=0?0:Math.min(e,Math.max(Math.floor(e*.1),1e6))}function Tg(t){const e=wt(De);return{free:{base:Tn,now:Tn*e.depositMult},loan:{base:kn,now:kn*e.loanMult},vipVault:{base:Cs(t&&t.vipTier||"NORMAL")||Es,now:(Cs(t&&t.vipTier||"NORMAL")||Es)+e.vipVaultAdd},eventActive:!!(De&&(e.depositMult!==1||e.loanMult!==1||e.vipVaultAdd>0||e.insExtraDisc>0||e.investMinAdd||e.investMaxAdd||e.vipGainMult!==1||e.cardCashbackVip>0)),ef:e}}function Gc(t){return{balance:0,fixed:{},loanPrincipal:0,loanInterest:0,creditScore:Sn,creditGrade:me(Sn),insurances:{},investments:{},vipScore:0,vipTier:"NORMAL",vipVaultBalance:0,card:Hc(t),lastInterestSettledAt:t,lastVipSettledAt:t,createdAt:t,updatedAt:t}}function kg(t,e){const n=Gc(e),s=t&&typeof t=="object"?t:{};return{nickname:s.nickname||"",balance:Math.max(0,h(s.balance)),fixed:s.fixed&&typeof s.fixed=="object"?s.fixed:{},loanPrincipal:Math.max(0,h(s.loanPrincipal)),loanInterest:Math.max(0,h(s.loanInterest)),creditScore:ee(s.creditScore!=null?s.creditScore:Sn),creditGrade:s.creditGrade||me(s.creditScore!=null?s.creditScore:Sn),insurances:s.insurances&&typeof s.insurances=="object"?s.insurances:{},investments:s.investments&&typeof s.investments=="object"?s.investments:{},vipScore:ee(s.vipScore),vipTier:s.vipTier||"NORMAL",vipVaultBalance:Math.max(0,h(s.vipVaultBalance)),card:jc(s.card,e),lastInterestSettledAt:h(s.lastInterestSettledAt)||n.lastInterestSettledAt,lastVipSettledAt:h(s.lastVipSettledAt)||n.lastVipSettledAt,createdAt:h(s.createdAt)||e,updatedAt:e}}function X(t){return{nickname:t.nickname||"",balance:Math.max(0,h(t.balance)),fixed:t.fixed||{},loanPrincipal:Math.max(0,h(t.loanPrincipal)),loanInterest:Math.max(0,h(t.loanInterest)),creditScore:ee(t.creditScore),creditGrade:me(t.creditScore),insurances:t.insurances||{},investments:t.investments||{},vipScore:ee(t.vipScore),vipTier:t.vipTier||"NORMAL",vipVaultBalance:Math.max(0,h(t.vipVaultBalance)),card:jc(t.card,Date.now()),lastInterestSettledAt:h(t.lastInterestSettledAt),lastVipSettledAt:h(t.lastVipSettledAt)||h(t.lastInterestSettledAt),createdAt:h(t.createdAt),updatedAt:Date.now()}}function Vr(t,e){const n=h(t.lastInterestSettledAt)||e,s=Math.max(0,e-n),i=s/864e5,r=wt(De),o=Tn*r.depositMult,a=kn*r.loanMult,l=i>0?Math.floor(R(t.balance)*o*i):0,c=i>0?Math.floor(R(t.loanPrincipal)*a*i):0,d=h(t.lastVipSettledAt)||n,u=Math.max(0,e-d)/864e5,f=(Cs(t.vipTier)||Es)+r.vipVaultAdd,m=u>0?Math.floor(R(t.vipVaultBalance)*f*u):0,_={...t};return(l>0||c>0)&&(_.balance=Math.max(0,h(t.balance)+l),_.loanInterest=Math.max(0,h(t.loanInterest)+c),_.lastInterestSettledAt=e),m>0&&(_.vipVaultBalance=Math.max(0,h(t.vipVaultBalance)+m),_.lastVipSettledAt=e),{bank:_,freeInt:l,loanInt:c,vipInt:m,elapsed:s}}function zt(t){return Object.values(t.fixed||{}).reduce((e,n)=>e+h(n&&n.amount),0)}function Br(t){const e=Date.now();return Object.values(t.investments||{}).reduce((n,s)=>!s||s.status==="settled"?n:n+(e>=R(s.maturesAt)?h(Ys(s).amount):h(s.principal)),0)}function zs(t,e){return h(t)+h(e.balance)+zt(e)+h(e.vipVaultBalance)+Br(e)-h(e.loanPrincipal)-h(e.loanInterest)}function Sg(t,e,n){let s=ee(t);const i=zs(e,n),r=h(n.loanPrincipal)+h(n.loanInterest);return h(n.loanPrincipal)===0&&(s+=1),i<0&&(s-=5),r>h(e)+h(n.balance)+zt(n)&&(s-=3),ee(s)}function O(t,e,n,s,i,r){return{type:t,title:e,amount:h(n),beforeCash:h(s),afterCash:h(i),memo:r||"",createdAt:Date.now()}}async function F(t,e){await Ic(Wc(t),e)}function Wr(t){return{type:t.type||"system",title:t.title||"",body:t.body||"",amount:h(t.amount),relatedId:t.relatedId||"",read:!1,actionLabel:t.actionLabel||"",actionUrl:t.actionUrl||"",createdAt:Date.now()}}async function $e(t,e){await Ic(Ts(t),Wr(e))}async function Ag(t,e){await $(yt(Le().db,`rooms/${it}/bank/${t}/messages/${e}`),{read:!0})}async function Rg(t,e){const n={};(e||[]).forEach(s=>{s&&!s.read&&s.id&&(n[`${s.id}/read`]=!0)}),Object.keys(n).length&&await $(Ts(t),n)}function Kc(t){return(t||[]).filter(e=>e&&!e.read).length}async function Hr(t){Le();const e=Date.now(),[n,s,i,r,o]=await Promise.all([nn(Ig(t)),nn(V(t)),nn(ra(Wc(t),ia(),sa(20))),nn(ra(Ts(t),ia(),sa(60))),nn(Eg())]),a=n.val()||{},l=h(a.cash),c=a.nickname||s.val()&&s.val().nickname||"플레이어",d=qc(o.val(),e);Vc(d);let u=kg(s.val(),e);const f=!s.exists(),m=u.vipTier;u.nickname||(u.nickname=c);const _=Vr(u,e);let y=!1;const S=_.freeInt>0||_.loanInt>0||_.vipInt>0;f?(u=Re(u,l),await $(V(t),X(u))):_.elapsed>=Cc&&S?(u=_.bank,u.creditScore=Sg(u.creditScore,l,u),u=Re(u,l),await $(V(t),X(u)),_.freeInt>0&&await F(t,O("interest","자유예금 이자",_.freeInt,l,l,"")),_.loanInt>0&&await F(t,O("loanInterest","대출 이자",-_.loanInt,l,l,"")),_.vipInt>0&&await F(t,O("vipInterest","VIP 금고 이자",_.vipInt,l,l,"")),y=!0):(u=_.bank,u=Re(u,l)),u.creditGrade=me(u.creditScore);const Q=i.exists()?Object.entries(i.val()).map(([P,G])=>({id:P,...G})).sort((P,G)=>R(G.createdAt)-R(P.createdAt)):[];let te=r.exists()?Object.entries(r.val()).map(([P,G])=>({id:P,...G})).sort((P,G)=>R(G.createdAt)-R(P.createdAt)):[];const ue=Ng(u,e),Fe=ue.msgs.slice();if(ue.changed){ue.creditDelta&&(u.creditScore=ee(u.creditScore+ue.creditDelta),u.creditGrade=me(u.creditScore)),await $(V(t),X(u));for(const P of ue.tx)await F(t,P)}const W=u.card;if(W&&W.enabled&&W.autoPayEnabled&&h(W.dueAt)>0&&e>=h(W.dueAt)&&h(W.autoPayLastProcessedAt)<h(W.dueAt)){const P=h(W.dueAt),G=Math.max(h(W.billingAmount),h(W.usedAmount));G>0&&(h(l)>=G?(await ce(de(t),ae=>{const It=ae==null?h(l):h(ae);if(!(It<G))return It-G})).committed&&(W.usedAmount=0,W.billingAmount=0,W.overdue=!1,W.dueAt=0,W.lastBilledAt=0,W.lastOverdueProcessedAt=0,W.suspended=!1,W.autoPayLastProcessedAt=e,u.creditScore=ee(u.creditScore+1),u.creditGrade=me(u.creditScore),await $(V(t),X(u)),await F(t,O("card_pay","카드 자동납부",-G,l,l-G,"전액 자동납부")),Fe.push({type:"card",title:"카드 자동납부 완료",body:`결제일에 청구액 ${N(G)}이 자동으로 납부되었습니다.`,relatedId:"cardautopay-"+P})):(W.autoPayLastProcessedAt=P,await $(V(t),{"card/autoPayLastProcessedAt":P}),Fe.push({type:"card",title:"카드 자동납부 실패",body:`현금 부족으로 자동납부에 실패했습니다. 청구액 ${N(G)}을 수동 납부해 주세요.`,relatedId:"cardautofail-"+P})))}te=await Pg(t,u,m,te,e,Fe);try{if(te.length>50){const P=te.slice().sort((ae,It)=>R(It.createdAt)-R(ae.createdAt)),G=new Set(P.slice(0,50).map(ae=>ae.id)),Qt=P.filter(ae=>ae.id&&!G.has(ae.id)&&ae.read&&!String(ae.id).startsWith("local-"));if(Qt.length){const ae={};Qt.forEach(Jt=>{ae[Jt.id]=null}),await $(Ts(t),ae),console.info("[bank] 오래된 알림 정리:",Qt.length);const It=new Set(Qt.map(Jt=>Jt.id));te=te.filter(Jt=>!It.has(Jt.id))}}}catch(P){console.warn("[bank] 알림 정리 실패:",P)}const Yt=Object.values(u.fixed||{}).filter(P=>e>=R(P.maturesAt)).length,Hn=Object.values(u.investments||{}).filter(P=>P&&P.status!=="settled"&&e>=R(P.maturesAt)).length,Zs={freeInt:_.freeInt,loanInt:_.loanInt,vipInt:_.vipInt,maturedFixed:Yt,maturedInvest:Hn,applied:y};return{uid:t,cash:l,nickname:c,bank:u,tx:Q,msgs:te,unread:Kc(te),feed:Zs,event:d,settledNow:y}}function qc(t,e){return e=e||Date.now(),t&&t.manual&&(!t.expiresAt||R(t.expiresAt)>e)&&t.type?Object.assign({},qs[t.type]||{},t):Fc(Uc(e))}function Ng(t,e){const n={changed:!1,creditDelta:0,msgs:[],tx:[]},s=t.card;if(!s||!s.enabled)return n;if(h(s.usedAmount)>0&&h(s.dueAt)>0&&e>=h(s.dueAt)&&(h(s.lastBilledAt)<h(s.dueAt)&&(s.billingAmount=h(s.usedAmount),s.lastBilledAt=h(s.dueAt),n.changed=!0,n.msgs.push({type:"card",title:"카드 결제일 도착",body:`STONK Card 청구액 ${N(s.billingAmount)}(게임머니) 납부가 필요합니다.`,relatedId:"cardbill-"+s.dueAt,actionLabel:"카드 탭에서 납부"}),n.tx.push(O("card_bill","카드 청구",s.billingAmount,0,0,"결제일 도래"))),h(s.billingAmount)>0&&e>=h(s.dueAt)+Dc&&h(s.lastOverdueProcessedAt)<h(s.dueAt))){s.overdue=!0,s.overdueCount=h(s.overdueCount)+1,s.lastOverdueProcessedAt=h(s.dueAt),n.creditDelta-=5,n.changed=!0;let i=`STONK Card 청구액 ${N(s.billingAmount)} 미납으로 신용점수가 하락했습니다.`;s.overdueCount>=Lc&&(s.suspended=!0,i+=" 미납 누적으로 카드가 정지되었습니다.",n.msgs.push({type:"card",title:"카드 사용 정지",body:"미납 누적으로 STONK Card 사용이 정지되었습니다. 전액 납부 후 복구할 수 있습니다.",relatedId:"cardsusp-"+s.dueAt}),n.tx.push(O("card_suspend","카드 사용 정지",0,0,0,`미납 ${s.overdueCount}회`))),n.msgs.push({type:"card",title:"카드 미납 발생",body:i,relatedId:"cardover-"+s.dueAt}),n.tx.push(O("card_overdue","카드 미납",0,0,0,`청구 ${N(s.billingAmount)} 미납 · 신용 -5`))}return n}async function Pg(t,e,n,s,i,r){const o=new Set((s||[]).map(d=>d.relatedId).filter(Boolean)),a=[],l=async d=>{if(d.relatedId&&o.has(d.relatedId))return;d.relatedId&&o.add(d.relatedId);const u=Wr(d);await $e(t,d),a.push({id:"local-"+Math.random().toString(36).slice(2),...u})};for(const d of r||[])await l(d);const c={};for(const d of Object.values(e.insurances||{}))d&&d.status==="active"&&R(d.expiresAt)<=i&&(d.status="expired",c[`insurances/${d.id}/status`]="expired",await l({type:"insurance",title:"보험 만료",body:`${d.title}이(가) 만료되었습니다.`,relatedId:"insexp-"+d.id}));Object.keys(c).length&&await $(V(t),c);for(const d of Object.values(e.fixed||{}))d&&i>=R(d.maturesAt)&&await l({type:"fixed",title:"정기예금 만기 도착",body:`${d.title||d.label} 수령이 가능합니다.`,relatedId:"fixmat-"+d.id,actionLabel:"예금 탭에서 수령",actionUrl:""});for(const d of Object.values(e.investments||{}))if(d&&d.status!=="settled"&&i>=R(d.maturesAt)){const u=Ys(d);await l({type:"investment",title:"투자상품 만기 도착",body:`${d.title} 만기 · 예상 ${(u.rate*100).toFixed(1)}%. 수령이 가능합니다.`,relatedId:"invmat-"+d.id})}return Me(e.vipTier)>Me(n)&&(await l({type:"vip",title:"VIP 등급 상승",body:`${Pt(e.vipTier)} 등급으로 승급했습니다.${e.vipTier==="GOLD"?" VIP 금고가 해금되었습니다.":""}`,relatedId:"viptier-"+e.vipTier}),await F(t,O("vip_tier_up","VIP 등급 상승",0,0,0,`${Pt(n)} → ${Pt(e.vipTier)}`))),a.length?[...a,...s||[]].sort((d,u)=>R(u.createdAt)-R(d.createdAt)):s}async function fe(t,e,n){const s=Date.now(),i=Vr(e,s);return(i.freeInt>0||i.loanInt>0)&&(i.freeInt>0&&await F(t,O("interest","자유예금 이자",i.freeInt,n,n,"")),i.loanInt>0&&await F(t,O("loanInterest","대출 이자",-i.loanInt,n,n,""))),i.bank}function ks(t,e,n){return t.creditScore=ee(t.creditScore+e),t.creditGrade=me(t.creditScore),t}async function zc(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");let s=await fe(t,{...n.bank},n.cash),i=0;const r=h(n.cash),o=await ce(de(t),c=>{const d=c==null?r:h(c);if(i=Math.min(e,d),!(i<=0))return d-i});if(!o.committed||i<=0)throw new Error("보유 현금이 없습니다.");const a=h((o.snapshot&&o.snapshot.val())??n.cash)+i,l=a-i;return s.balance=Math.max(0,h(s.balance)+i),await $(V(t),X(s)),await F(t,O("deposit","자유예금 입금",i,a,l,"")),i<e?`입금 완료 (가용 현금 ${N(i)})`:"입금 완료"}async function Yc(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");if(e>h(n.bank.balance))throw new Error("예금 잔액이 부족합니다.");let s=await fe(t,{...n.bank},n.cash);e>h(s.balance)&&(e=h(s.balance)),s.balance=Math.max(0,h(s.balance)-e),await $(V(t),X(s));const i=h(n.cash);return await ce(de(t),r=>h(r)+e),await F(t,O("withdraw","자유예금 출금",e,i,i+e,"")),"출금 완료"}async function Qc(t,e,n,s){const i=Tc[e];if(!i)throw new Error("상품을 선택하세요.");if(n=h(n),n<=0)throw new Error("금액을 확인하세요.");if(n>h(s.cash))throw new Error("보유 현금이 부족합니다.");let r=await fe(t,{...s.bank},s.cash);const o=h(s.cash);if(!(await ce(de(t),u=>{const f=u==null?o:h(u);if(!(f<n))return f-n})).committed)throw new Error("보유 현금이 부족합니다.");const l=Date.now(),c="f"+l.toString(36);r.fixed=r.fixed||{},r.fixed[c]={id:c,product:e,label:i.label,amount:n,rate:i.rate,startedAt:l,maturesAt:l+i.ms},await $(V(t),X(r));const d=h(s.cash);return await F(t,O("fixedOpen",`${i.label} 가입`,n,d,d-n,"")),`${i.label} 가입 완료`}async function Jc(t,e,n){let s=await fe(t,{...n.bank},n.cash);const i=s.fixed&&s.fixed[e];if(!i)throw new Error("정기예금을 찾을 수 없습니다.");const r=h(i.amount);delete s.fixed[e],await $(V(t),X(s));const o=h(n.cash);return await ce(de(t),a=>h(a)+r),await F(t,O("fixedCancel",`${i.label} 중도해지 (이자 미지급)`,r,o,o+r,"만기 전 해지")),"중도해지 — 원금만 반환되었습니다."}async function Xc(t,e,n){let s=await fe(t,{...n.bank},n.cash);const i=s.fixed&&s.fixed[e];if(!i)throw new Error("정기예금을 찾을 수 없습니다.");if(Date.now()<h(i.maturesAt))throw new Error("아직 만기가 되지 않았습니다.");const r=h(i.amount),o=Math.floor(r*R(i.rate)),a=r+o;delete s.fixed[e],s=ks(s,1,n.cash),await $(V(t),X(s));const l=h(n.cash);return await ce(de(t),c=>h(c)+a),await F(t,O("fixedClaim",`${i.label} 만기수령 (원금+이자)`,a,l,l+a,`이자 ${N(o)}`)),await $e(t,{type:"fixed",title:"정기예금 수령 완료",body:`${i.label} ${N(a)}을(를) 수령했습니다. (이자 ${N(o)})`,amount:a,relatedId:"fixclaim-"+e}),`만기 수령 완료 (+${N(o)} 이자)`}async function Zc(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");let s=await fe(t,{...n.bank},n.cash);const i=me(s.creditScore),r=Bc(i),o=h(s.loanPrincipal);if(r<=0)throw new Error("현재 신용등급(F)으로는 대출이 불가합니다.");if(o+e>r)throw new Error(`대출 한도 초과 (한도 ${N(r)}, 현재 잔액 ${N(o)})`);s.loanPrincipal=o+e;const a=Qs(s).find(c=>c.type==="loan");s=ks(s,a?-1:-3,n.cash),a&&(s.insurances[a.id].status="used",s.insurances[a.id].usedAt=Date.now()),await $(V(t),X(s));const l=h(n.cash);return await ce(de(t),c=>h(c)+e),await F(t,O("loan","대출 실행",e,l,l+e,`잔액 ${N(s.loanPrincipal)}${a?" · 유예권 적용":""}`)),a&&(await F(t,O("insurance_used","대출 유예권 적용",0,l,l,"신용점수 하락 완화(-3 → -1)")),await $e(t,{type:"insurance",title:"대출 유예권 사용됨",body:"대출 실행 시 신용점수 하락이 완화되었습니다.",relatedId:"insused-"+a.id})),`대출 완료 (+${N(e)})${a?" · 유예권으로 신용 하락 완화":""}`}async function Hi(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");if(e>h(n.cash))throw new Error("보유 현금이 부족합니다.");let s=await fe(t,{...n.bank},n.cash);const i=h(s.loanPrincipal)+h(s.loanInterest);if(i<=0)throw new Error("상환할 대출이 없습니다.");const r=Math.min(e,i),o=h(n.cash);if(!(await ce(de(t),m=>{const _=m==null?o:h(m);if(!(_<r))return _-r})).committed)throw new Error("보유 현금이 부족합니다.");let l=r;const c=Math.min(l,h(s.loanInterest));s.loanInterest=Math.max(0,h(s.loanInterest)-c),l-=c;const d=Math.min(l,h(s.loanPrincipal));s.loanPrincipal=Math.max(0,h(s.loanPrincipal)-d);const u=s.loanPrincipal<=0;u?(s.loanInterest=0,s=ks(s,5,n.cash)):s=ks(s,1,n.cash),await $(V(t),X(s));const f=h(n.cash);return await F(t,O("repay",u?"대출 전액 상환":"대출 상환",-r,f,f-r,`이자 ${N(c)} · 원금 ${N(d)}`)),u?"전액 상환 완료 🎉":`상환 완료 (이자 ${N(c)} · 원금 ${N(d)})`}function ed(t){t=ee(t);let e="NORMAL";for(const n of An)t>=Rc[n]&&(e=n);return e}function Pt(t){return{NORMAL:"일반",SILVER:"실버",GOLD:"골드",PLATINUM:"플래티넘",BLACK:"블랙"}[t]||"일반"}function Re(t,e){const n={...t},s=h(t.balance)+zt(t)+h(t.vipVaultBalance),i=zs(e,t);let r=0;return r+=Math.min(40,Math.floor(s/25e5)),r+=Math.min(25,Math.floor(Math.max(0,i)/4e6)),r+=Object.keys(t.fixed||{}).length?8:0,r+=Object.keys(t.investments||{}).length?8:0,r+=Object.keys(t.insurances||{}).length?5:0,r+=h(t.loanPrincipal)===0?6:0,r+=Math.min(8,ee(t.creditScore)>=75?8:0),r=Math.round(r*wt(De).vipGainMult),n.vipScore=ee(r),n.vipTier=ed(n.vipScore),n}function Og(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function la(t){let e=(Og(String(t))||1)>>>0;return e^=e<<13,e>>>=0,e^=e>>17,e^=e<<5,e>>>=0,e%1e5/1e5}function jr(t){return Ac[t]||Mc[t]||null}function Ys(t){const e=jr(t.productType)||{},n={min:t.expectedMinRate!=null?R(t.expectedMinRate):R(e.min),max:t.expectedMaxRate!=null?R(t.expectedMaxRate):R(e.max)},s=la(t.seed),i=la(t.seed+"x"),r=(s+i)/2,o=.45,a=n.min+(n.max-n.min)*(r*(1-o)+o*.5+(r-.5)*o),l=Math.max(n.min,Math.min(n.max,a)),c=h(t.principal),d=Math.max(0,Math.round(c*(1+l)));return{rate:l,amount:d,profit:d-c}}function td(t){return t>=.25?["대박","win"]:t>=.05?["성공","ok"]:t>-.02?["보합","flat"]:t>-.2?["손실","lose"]:["폭락","crash"]}function xg(t,e){if(zs(t,e)<0)return{key:"severe",label:"심각",tone:"danger"};const s=h(e.loanPrincipal)+h(e.loanInterest);if(s<=0)return{key:"safe",label:"안전",tone:"ok"};const i=h(t)+h(e.balance)+zt(e)+h(e.vipVaultBalance)+Br(e),r=i>0?s/i:1;let o=r<.3?{key:"ok",label:"관리 가능",tone:"ok"}:r<.7?{key:"warn",label:"주의",tone:"warn"}:{key:"high",label:"위험",tone:"danger"};return Qs(e).some(a=>a.type==="loan")&&(o.key==="high"?o={key:"warn",label:"주의",tone:"warn"}:o.key==="warn"&&(o={key:"ok",label:"관리 가능",tone:"ok"}),o.eased=!0),o.ratio=r,o}function Mg(t,e){const n=h(e.balance)+zt(e)+h(e.vipVaultBalance);if(n<=0)return{label:"미이용",tone:"muted"};const s=[];return Object.keys(e.fixed||{}).length&&s.push("장기 예치 중"),n>h(t)&&s.push("보수적 운용"),s.unshift("안정 자산 보유"),{label:s.join(" · "),tone:"ok"}}function nd(t,e){return t&&t.status!=="expired"&&R(t.expiresAt)>(e||Date.now())}function Qs(t,e){return e=e||Date.now(),Object.values(t.insurances||{}).filter(n=>nd(n,e))}async function Dg(t,e,n){const s=Sc[e];if(!s)throw new Error("보험 상품을 선택하세요.");let i=await fe(t,{...n.bank},n.cash);const r=Date.now();if(Qs(i,r).some(S=>S.type===e))throw new Error("이미 가입 중인 보험입니다.");const o=n.bank.vipTier||"NORMAL",a=wt(De),l=n.bank.card&&n.bank.card.enabled&&mt[n.bank.card.cardTier]?mt[n.bank.card.cardTier].insExtra:0,c=Math.min(.2,xc(o)+a.insExtraDisc+l),d=Math.max(1,Math.floor(s.premium*(1-c)));if(d>h(n.cash))throw new Error("보유 현금이 부족합니다.");const u=h(n.cash);if(!(await ce(de(t),S=>{const Q=S==null?u:h(S);if(!(Q<d))return Q-d})).committed)throw new Error("보유 현금이 부족합니다.");const m="ins"+r.toString(36);i.insurances=i.insurances||{},i.insurances[m]={id:m,type:e,title:s.title,premium:d,basePremium:s.premium,status:"active",startedAt:r,expiresAt:r+s.ms,usedAt:0,createdAt:r},i=Re(i,n.cash),await $(V(t),X(i));const _=h(n.cash),y=c>0?`할인 ${Math.round(c*100)}% 적용${a.insExtraDisc>0?" (보험 우대 이벤트 포함)":""}`:"";return await F(t,O("insurance_buy",`${s.title} 가입`,-d,_,_-d,y)),await $e(t,{type:"insurance",title:"보험 가입 완료",body:`${s.title}에 가입했습니다.${y?" ("+y+")":""}`,amount:-d,relatedId:"insbuy-"+m}),`${s.title} 가입 완료${c>0?` · ${Math.round(c*100)}% 할인`:""}`}async function Lg(t,e,n,s){const i=jr(e);if(!i)throw new Error("투자상품을 선택하세요.");if(i.requiredVipTier&&Me(s.bank.vipTier)<Me(i.requiredVipTier))throw new Error(`${Pt(i.requiredVipTier)} 등급부터 가입 가능한 상품입니다.`);if(n=h(n),n<=0)throw new Error("금액을 확인하세요.");if(n>h(s.cash))throw new Error("보유 현금이 부족합니다.");let r=await fe(t,{...s.bank},s.cash);const o=h(s.cash);if(!(await ce(de(t),S=>{const Q=S==null?o:h(S);if(!(Q<n))return Q-n})).committed)throw new Error("보유 현금이 부족합니다.");const l=Date.now(),c="inv"+l.toString(36),d=t+":"+c+":"+l,u=wt(De),f=R(i.min)+u.investMinAdd,m=R(i.max)+u.investMaxAdd;r.investments=r.investments||{},r.investments[c]={id:c,productType:e,title:i.title,principal:n,expectedMinRate:f,expectedMaxRate:m,status:"active",seed:d,startedAt:l,maturesAt:l+i.ms,resultRate:null,resultAmount:null,settledAt:0,createdAt:l},r=Re(r,s.cash),await $(V(t),X(r));const _=h(s.cash),y=u.investMinAdd||u.investMaxAdd?` · ${De.title} 반영`:"";return await F(t,O("investment_buy",`${i.title} 가입`,-n,_,_-n,`위험도 ${i.risk}${y}`)),`${i.title} 가입 완료${y}`}async function $g(t,e,n){let s=await fe(t,{...n.bank},n.cash);const i=s.investments&&s.investments[e];if(!i)throw new Error("투자상품을 찾을 수 없습니다.");if(Date.now()<R(i.maturesAt))throw new Error("아직 만기가 되지 않았습니다.");if(i.status==="settled")throw new Error("이미 정산된 상품입니다.");const r=Ys(i);delete s.investments[e],s=Re(s,n.cash),await $(V(t),X(s));const o=h(n.cash);await ce(de(t),l=>h(l)+r.amount);const[a]=td(r.rate);return await F(t,O("investment_settle",`${i.title} 정산 · ${a}`,r.amount,o,o+r.amount,`${(r.rate*100).toFixed(1)}%`)),await $e(t,{type:"investment",title:"투자 정산 완료",body:`${i.title} 정산: ${N(r.amount)} 수령 (${(r.rate*100).toFixed(1)}%, ${a})`,amount:r.amount,relatedId:"invsettle-"+e}),`${a}! ${r.profit>=0?"+":"−"}${N(Math.abs(r.profit))} (${(r.rate*100).toFixed(1)}%)`}function sd(t){return An.indexOf(t.vipTier||"NORMAL")>=An.indexOf(Nc)}async function Fg(t,e,n){if(!sd(n.bank))throw new Error("VIP 금고는 GOLD 등급부터 이용 가능합니다.");if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");let s=await fe(t,{...n.bank},n.cash),i=0;const r=h(n.cash);if(!(await ce(de(t),l=>{const c=l==null?r:h(l);if(i=Math.min(e,c),!(i<=0))return c-i})).committed||i<=0)throw new Error("보유 현금이 없습니다.");s.vipVaultBalance=Math.max(0,h(s.vipVaultBalance)+i),s=Re(s,n.cash),await $(V(t),X(s));const a=h(n.cash);return await F(t,O("vip_deposit","VIP 금고 입금",i,a,a-i,"")),i<e?`VIP 금고 입금 (가용 ${N(i)})`:"VIP 금고 입금 완료"}async function Ug(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");if(e>h(n.bank.vipVaultBalance))throw new Error("VIP 금고 잔액이 부족합니다.");let s=await fe(t,{...n.bank},n.cash);e>h(s.vipVaultBalance)&&(e=h(s.vipVaultBalance)),s.vipVaultBalance=Math.max(0,h(s.vipVaultBalance)-e),s=Re(s,n.cash),await $(V(t),X(s));const i=h(n.cash);return await ce(de(t),r=>h(r)+e),await F(t,O("vip_withdraw","VIP 금고 출금",e,i,i+e,"")),"VIP 금고 출금 완료"}function Vg(t){const e=me(t.creditScore),n=t.vipTier||"NORMAL";let s="";for(const i of $c){const r=mt[i];(Rn(e)>=Rn(r.minGrade)||Me(n)>=Me(r.minVip))&&(s=i)}return s}function Gr(t,e){const n=mt[e];if(!n)return!1;const s=me(t.creditScore);return Rn(s)>=Rn(n.minGrade)||Me(t.vipTier||"NORMAL")>=Me(n.minVip)}function Bg(t){return Math.max(0,h(t&&t.cardLimit)-h(t&&t.usedAmount))}async function Wg(t,e,n){const s={...n.bank};if(s.card&&s.card.enabled)throw new Error("이미 카드를 발급했습니다. 업그레이드를 이용하세요.");const i=mt[e];if(!i)throw new Error("카드 등급을 선택하세요.");if(!Gr(s,e))throw new Error(`${i.title} 발급 조건(신용 ${i.minGrade}↑ 또는 VIP ${Pt(i.minVip)}↑)을 충족하지 않습니다.`);const r=Date.now(),o=Object.assign(Hc(r),{enabled:!0,cardTier:e,cardLimit:i.limit});return await $(V(t),{card:o}),await F(t,O("card_issue",`${i.title} 발급`,0,h(n.cash),h(n.cash),`한도 ${N(i.limit)}`)),await $e(t,{type:"card",title:"STONK Card 발급 완료",body:`${i.title}(게임머니 신용카드)가 발급되었습니다. 한도 ${N(i.limit)}.`,relatedId:"cardissue-"+r}),`${i.title} 발급 완료`}async function Hg(t,e,n){const s={...n.bank};if(!s.card||!s.card.enabled)throw new Error("먼저 카드를 발급하세요.");const i=mt[e];if(!i)throw new Error("카드 등급을 선택하세요.");if(!Gr(s,e))throw new Error(`${i.title} 조건을 충족하지 않습니다.`);if(h(s.card.billingAmount)>0||s.card.overdue)throw new Error("미납 청구액이 있으면 업그레이드할 수 없습니다.");return await $(V(t),{"card/cardTier":e,"card/cardLimit":i.limit,"card/updatedAt":Date.now()}),await F(t,O("card_upgrade",`${i.title} 전환`,0,h(n.cash),h(n.cash),`한도 ${N(i.limit)}`)),await $e(t,{type:"card",title:"카드 등급 변경",body:`${i.title}로 변경되었습니다. 한도 ${N(i.limit)}.`,relatedId:"cardup-"+Date.now()}),`${i.title}로 변경 완료`}async function jg(t,e,n){let s=await fe(t,{...n.bank},n.cash);const i=s.card;if(!i||!i.enabled)throw new Error("카드가 없습니다.");const r=Math.max(h(i.billingAmount),h(i.usedAmount));if(r<=0)throw new Error("납부할 청구액이 없습니다.");let o=Math.min(Math.max(0,h(e)),r);if(o<=0)throw new Error("금액을 확인하세요.");if(o>h(n.cash))throw new Error("보유 현금이 부족합니다.");const a=h(n.cash);if(!(await ce(de(t),f=>{const m=f==null?a:h(f);if(!(m<o))return m-o})).committed)throw new Error("보유 현금이 부족합니다.");i.usedAmount=Math.max(0,h(i.usedAmount)-o),i.billingAmount=Math.max(0,h(i.billingAmount)-o);let c=!1;i.usedAmount<=0?(i.usedAmount=0,i.billingAmount=0,i.overdue=!1,i.dueAt=0,i.lastBilledAt=0,i.lastOverdueProcessedAt=0,i.suspended=!1,s.creditScore=ee(s.creditScore+1),c=!0):i.billingAmount<=0&&(i.overdue=!1);const d=wt(De);d.cardCashbackVip>0&&(s.vipScore=ee(s.vipScore+d.cardCashbackVip)),s=Re(s,n.cash),s.creditGrade=me(s.creditScore),await $(V(t),X(s));const u=h(n.cash);return await F(t,O("card_pay","카드 납부",-o,u,u-o,c?"전액 납부 완료":`일부 납부 · 잔여 ${N(i.usedAmount)}`)),await $e(t,{type:"card",title:"카드 납부 완료",body:`${N(o)} 납부되었습니다.${c?" 청구액을 모두 정리했습니다.":` 남은 청구 ${N(i.usedAmount)}.`}${d.cardCashbackVip>0?" (캐시백 이벤트: VIP+1)":""}`,amount:-o,relatedId:"cardpay-"+Date.now()}),c?"카드 전액 납부 완료":`카드 납부 완료 (잔여 ${N(i.usedAmount)})`}async function Gg(t,e){const s={...e.bank}.card;if(!s||!s.enabled)throw new Error("카드가 없습니다.");if(!s.suspended)throw new Error("정지 상태가 아닙니다.");if(h(s.usedAmount)>0||h(s.billingAmount)>0||s.overdue)throw new Error("미납 청구액을 먼저 정리하세요.");return await $(V(t),{"card/suspended":!1,"card/overdueCount":0,"card/updatedAt":Date.now()}),await F(t,O("card_restore","카드 사용 복구",0,h(e.cash),h(e.cash),"정지 해제")),await $e(t,{type:"card",title:"카드 사용 복구",body:"STONK Card 사용이 복구되었습니다.",relatedId:"cardrestore-"+Date.now()}),"카드 사용이 복구되었습니다"}async function Kg(t,e,n,s){const i=s.bank&&s.bank.card;if(!i||!i.enabled)throw new Error("먼저 카드를 발급하세요.");const r=e?"full":"off";return await $(V(t),{"card/autoPayEnabled":!!e,"card/autoPayMode":r,"card/updatedAt":Date.now()}),await F(t,O("card_restore",e?"카드 자동납부 켜짐":"카드 자동납부 꺼짐",0,h(s.cash),h(s.cash),`모드 ${r}`)),e?"자동납부가 켜졌습니다(전액 자동납부).":"자동납부가 꺼졌습니다."}const qg=Object.freeze(Object.defineProperty({__proto__:null,BANK_EVENTS:qs,BANK_EVENT_IDS:Wi,CARD_GRACE_MS:Dc,CARD_SUSPEND_OVERDUE:Lc,CARD_TIERS:mt,CARD_TIER_ORDER:$c,FIXED_PRODUCTS:Tc,FREE_RATE_DAY:Tn,INIT_CREDIT:Sn,INSURANCE_PRODUCTS:Sc,INVESTMENT_PRODUCTS:Ac,LOAN_LIMIT_BY_GRADE:kc,LOAN_RATE_DAY:kn,MIN_AUTOSETTLE_MS:Cc,ROOM:it,VIP_DISCOUNT:Pc,VIP_INVESTMENT_PRODUCTS:Mc,VIP_TIERS:An,VIP_TIER_MIN:Rc,VIP_VAULT_MIN_TIER:Nc,VIP_VAULT_RATE_BY_TIER:Oc,VIP_VAULT_RATE_DAY:Es,activeInsurances:Qs,buyInsurance:Dg,buyInvestment:Lg,cancelFixed:Jc,cardCanIssue:Gr,cardEligibleTier:Vg,cardMinPay:Cg,cardRemaining:Bg,claimFixed:Xc,claimInvestment:$g,clampScore:ee,computeSeedEvent:Fc,dateKeyKST:Uc,defaultBank:Gc,depositFree:zc,depositStability:Mg,depositVip:Fg,eventEffects:wt,fixedTotal:zt,gradeFromScore:me,gradeRank:Rn,insuranceActive:nd,int:h,investLabel:td,investOutcome:Ys,investProduct:jr,investmentsValue:Br,issueCard:Wg,loadState:Hr,loanLimit:Bc,loanRisk:xg,markAllMessagesRead:Rg,markMessageRead:Ag,msgItem:Wr,netWorth:zs,num:R,openFixed:Qc,payCard:jg,rateInfo:Tg,repayLoan:Hi,resolveEvent:qc,restoreCard:Gg,setActiveEvent:Vc,setAutoPay:Kg,settleInterest:Vr,takeLoan:Zc,txItem:O,unreadCount:Kc,upgradeCard:Hg,vipDiscount:xc,vipRank:Me,vipTierFromScore:ed,vipTierLabel:Pt,vipVaultRate:Cs,vipVaultUnlocked:sd,withdrawFree:Yc,withdrawVip:Ug,won:N},Symbol.toStringTag,{value:"Module"})),{won:v,int:I,num:U,fixedTotal:id,netWorth:rd,gradeFromScore:Js,loanLimit:Kr,FIXED_PRODUCTS:zg,INSURANCE_PRODUCTS:od,INVESTMENT_PRODUCTS:Yg,VIP_INVESTMENT_PRODUCTS:Qg,investmentsValue:Jg,investOutcome:ad,investLabel:Xg,loanRisk:Zg,depositStability:ev,activeInsurances:tv,insuranceActive:mi,buyInsurance:nv,buyInvestment:sv,claimInvestment:iv,vipTierLabel:_t,vipVaultUnlocked:fn,depositVip:rv,withdrawVip:ov,VIP_VAULT_RATE_DAY:av,vipDiscount:lv,vipVaultRate:cv,vipRank:Ss,markMessageRead:dv,markAllMessagesRead:uv,unreadCount:hv,CARD_TIERS:rn,CARD_TIER_ORDER:_i,cardEligibleTier:ld,cardCanIssue:ca,cardRemaining:fv,issueCard:pv,upgradeCard:mv,payCard:_v,restoreCard:gv,eventEffects:vv,cardMinPay:cd,rateInfo:dd,setAutoPay:bv}=qg,yv="yaV8N60yIiUggaWNpNF2VhkCwxb2",wv="tomem@naver.com",H=document.getElementById("app");let p=null,ud=!1,As="dashboard",on="all",ji="all",gi=!1,da=!1;Iv();async function Iv(){if(!pg){ua("Firebase 설정이 비어 있습니다.");return}Tv();let t=null;try{t=await mg()}catch{}if(!t){yg({message:"STONK Home에서 로그인 후 이용해 주세요. 같은 계정의 자산이 그대로 연결됩니다."}),kv();return}try{ud=t.uid===yv||String(t.email||"").toLowerCase()===wv,p=await Hr(t.uid),Ve(),Uv()}catch(e){console.error("[bank] 로드 실패:",e),ua("은행 데이터를 불러오지 못했습니다: "+(e&&e.message))}}async function Ev(){if(p){try{p=await Hr(p.uid)}catch(t){console.warn(t)}Ve()}}function k(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function Nn(t,e="ok"){const n=document.createElement("div");n.className="bk-toast "+e,n.textContent=t,document.body.appendChild(n),setTimeout(()=>{n.classList.add("hide"),setTimeout(()=>n.remove(),280)},2200)}async function ne(t){if(!gi){gi=!0;try{const e=await t();e&&Nn(e,"ok"),await Ev()}catch(e){Nn(e&&e.message||"오류가 발생했습니다.","err")}finally{gi=!1}}}function ye(t){const e=document.getElementById(t);return e?Math.floor(Number(e.value)||0):0}function hd(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function fd(){const t=document.getElementById("cardPayPreview");if(!t||!p)return;const e=p.bank&&p.bank.card||{},n=Math.max(I(e.billingAmount),I(e.usedAmount)),s=ye("cardPayAmt");if(s<=0){t.textContent="";return}if(s>I(p.cash)){t.textContent="보유 현금을 초과합니다.",t.style.color="var(--red)";return}const i=Math.min(s,n),r=Math.max(0,n-i);t.style.color="",t.textContent=`납부 ${v(i)} → 남은 청구액 ${v(r)}${r<=0?" · 미납/정지 해제 + 신용 회복":""}`}function Cv(t){return t=Math.floor(Number(t)||0),t>=1e7||p&&p.cash>0&&t>=p.cash*.3}function qn(t,e,n){if(!Cv(t))return ne(n);const s=document.createElement("div");s.className="bk-modal-dim",s.innerHTML=`<div class="bk-modal">
    <h3>고액 거래 확인</h3>
    <p class="bk-modal-amt">${v(t)}</p>
    <p class="bk-note">STONK 가상 게임머니 거래입니다. 진행하시겠어요?</p>
    <div class="bk-modal-stage" hidden><span class="bk-spin"></span> <span class="bk-modal-label">${k(e||"처리 중...")}</span></div>
    <div class="bk-modal-btns"><button class="bk-btn" data-mc="cancel" type="button">취소</button><button class="bk-btn primary" data-mc="ok" type="button">확인</button></div>
  </div>`,document.body.appendChild(s);const i=()=>s.remove();s.querySelector('[data-mc="cancel"]').onclick=i,s.addEventListener("click",r=>{r.target===s&&i()}),s.querySelector('[data-mc="ok"]').onclick=()=>{s.querySelector(".bk-modal-btns").hidden=!0,s.querySelector(".bk-modal-stage").hidden=!1,setTimeout(()=>{i(),ne(n)},hd()?0:600)}}function Tv(){H.innerHTML='<div class="bk-center"><div class="bk-spin"></div><p>STONK Bank 연결 중…</p></div>'}function ua(t){H.innerHTML=`<div class="bk-center"><h2>⚠️ 오류</h2><p>${k(t)}</p><a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로</a></div>`}function kv(){H.innerHTML=`<div class="bk-center">
    <div class="bk-logo"><span class="bk-mark">$</span><b>STONK</b> Bank</div>
    <h2>로그인이 필요합니다</h2>
    <p class="muted">STONK Home에서 로그인 후 이용해 주세요.<br>같은 계정의 보유 현금이 그대로 연결됩니다.</p>
    <a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로 이동</a>
  </div>`}function pd(t){return`<span class="bk-grade g-${t}">${t}</span>`}function Ve(){if(!p)return;const t=p.bank,e=I(t.balance)+id(t),n=rd(p.cash,t),s=Js(t.creditScore);H.className=t.vipTier==="BLACK"?"is-black":"",H.innerHTML=`
    <header class="bk-header">
      <a class="bk-brand" href="#" data-home title="STONK Bank 메인"><span class="bk-mark">$</span><b>STONK</b> Bank</a>
      <div class="bk-nav">
        <a href="../STONK-Home/index.html">홈</a>
        <a href="../STONK-Battle/index.html">주식시장</a>
        <a href="../STONK-Board/index.html">주식소식</a>
        <a href="../STONK-Wiki/index.html">주식정보</a>
        <a href="../STONK-Arcade/index.html">아케이드</a>
        <a href="../STONK-Gacha/index.html">가챠</a>
        ${ud?'<a href="../STONK-Admin/market-admin.html">관리자</a>':""}
      </div>
      <div class="bk-user">
        <button class="bk-bell" type="button" data-tab="messages" title="알림/우편함" aria-label="알림">🔔${p.unread>0?`<span class="bk-bell-dot">${p.unread>99?"99+":p.unread}</span>`:""}</button>
        <span class="bk-nick">${k(p.nickname)}</span>${Rs(t.vipTier)}${pd(s)}
      </div>
    </header>

    <section class="bk-summary">
      <div class="bk-sum-card net"><span>순자산</span><b class="${n<0?"minus":""}">${v(n)}</b></div>
      <div class="bk-sum-card cash"><span>보유 현금</span><b>${v(p.cash)}</b></div>
      <div class="bk-sum-card dep"><span>총 예금</span><b>${v(e)}</b></div>
      <div class="bk-sum-card loan"><span>대출 잔액</span><b class="${I(t.loanPrincipal)>0?"warn":""}">${v(t.loanPrincipal)}</b></div>
    </section>

    <nav class="bk-tabs">
      ${["dashboard:대시보드","deposit:예금","loan:대출","card:카드","insurance:보험","invest:투자","vip:VIP","messages:알림","history:거래내역"].map(i=>{const[r,o]=i.split(":");return`<button class="bk-tab ${As===r?"active":""}" data-tab="${r}">${o}</button>`}).join("")}
    </nav>

    <main class="bk-main">${Sv(As)}</main>
    <footer class="bk-footer">모든 금액은 STONK 가상 게임머니입니다. 실제 화폐·투자와 무관합니다.</footer>
  `,sb()}function Sv(t){return t==="deposit"?Kv():t==="loan"?qv():t==="insurance"?Xv():t==="invest"?Zv():t==="vip"?tb():t==="card"?xv():t==="messages"?Fv():t==="history"?Yv():Bv()}function ha(){const t=p.event;return t?`<div class="bk-event-banner ev-${k(t.type)}">
    <span class="bk-event-ico">📰</span>
    <div><b>오늘의 금융 이벤트 · ${k(t.title)}</b><small>${k(t.desc)} <i class="muted">(게임머니 금융 이벤트)</i></small></div>
  </div>`:""}function Av(){const t=p.event;if(!t)return"";const e=vv(t),n=dd(p.bank),s=[];n.free.now!==n.free.base&&s.push(["자유예금 이자/일",`${(n.free.base*100).toFixed(2)}% → ${(n.free.now*100).toFixed(2)}%`,n.free.now<n.free.base]),n.loan.now!==n.loan.base&&s.push(["대출 이자/일",`${(n.loan.base*100).toFixed(2)}% → ${(n.loan.now*100).toFixed(2)}%`,n.loan.now<n.loan.base]),e.insExtraDisc>0&&s.push(["보험 추가 할인",`+${Math.round(e.insExtraDisc*100)}% (총 최대 20%)`,!0]),(e.investMinAdd||e.investMaxAdd)&&s.push(["신규 투자 기대범위",`${e.investMinAdd?(e.investMinAdd>0?"+":"")+(e.investMinAdd*100).toFixed(0)+"%p 하단 ":""}${e.investMaxAdd?(e.investMaxAdd>0?"+":"")+(e.investMaxAdd*100).toFixed(0)+"%p 상단":""}`.trim(),e.investMaxAdd>0]),e.vipVaultAdd>0&&s.push(["VIP 금고 이자/일",`+${(e.vipVaultAdd*100).toFixed(3)}%`,!0]),e.vipGainMult!==1&&s.push(["VIP 점수 획득",`×${e.vipGainMult.toFixed(1)}`,!0]),e.cardCashbackVip>0&&s.push(["카드 납부 보상",`VIP +${e.cardCashbackVip} (현금 캐시백 없음)`,!0]);const i=t.expiresAt?Math.max(0,U(t.expiresAt)-Date.now()):0;return`<div class="bk-card event-fx ev-${k(t.type)}" style="grid-column:1/-1">
    <h3>📰 오늘의 금융 이벤트 · ${k(t.title)} ${t.expiresAt?`<small class="muted">남은 ${Ut(i)}</small>`:'<small class="muted">날짜 기반</small>'}</h3>
    <p class="bk-note">${k(t.desc||"")} <i class="muted">(게임머니 금융 이벤트)</i></p>
    <div class="bk-grid" style="grid-template-columns:1fr 1fr;gap:8px">
    ${s.length?s.map(r=>`<div class="bk-row"><span>${k(r[0])}</span><b class="${r[2]?"ok":"warn"}">${k(r[1])}</b></div>`).join(""):'<div class="bk-row"><span>효과</span><b class="muted">표시·경고 위주(수익/할인 없음)</b></div>'}
    </div>
  </div>`}function Rv(){const t=dd(p.bank),e=n=>`${(n.base*100).toFixed(2)}%${n.now!==n.base?` → <b class="${n.now<n.base?"ok":"warn"}">${(n.now*100).toFixed(2)}%</b>`:""}`;return`<div class="bk-card">
    <h3>금리 비교 <span class="bk-tag ${t.eventActive?"safe":""}">${t.eventActive?"이벤트 반영":"기본"}</span></h3>
    <div class="bk-row"><span>자유예금 / 일</span><b>${e(t.free)}</b></div>
    <div class="bk-row"><span>대출 / 일</span><b>${e(t.loan)}</b></div>
    <div class="bk-row"><span>VIP 금고 / 일</span><b>${e(t.vipVault)}</b></div>
    <p class="bk-note">현재 금리는 오늘의 금융 이벤트가 반영된 <b>신규 거래 기준</b>입니다. 기존 투자상품 결과는 가입 당시 조건을 유지합니다.</p>
  </div>`}function fa(t){return t=I(t),t<=0?{lv:0,label:"빈 금고"}:t<5e6?{lv:1,label:"소형 금고"}:t<5e7?{lv:2,label:"중형 금고"}:t<1e8?{lv:3,label:"대형 금고"}:{lv:4,label:"프리미엄 금고"}}function Nv(t){const e=fa(t.balance),n=fa(t.vipVaultBalance);return`<div class="bk-card vault-card ${t.vipTier==="BLACK"?"black":""}">
    <h3>금고</h3>
    <div class="vaults">
      <div class="vault lv-${e.lv}"><div class="vault-ico">🔐</div><span>자유예금</span><b>${v(t.balance)}</b><small>${e.label}</small></div>
      <div class="vault lv-${n.lv} ${fn(t)?"":"locked"}"><div class="vault-ico">${fn(t)?"💎":"🔒"}</div><span>VIP 금고</span><b>${v(t.vipVaultBalance)}</b><small>${fn(t)?n.label:"GOLD부터"}</small></div>
    </div>
  </div>`}const Pv={BASIC:"BASIC",GOLD:"GOLD",PLATINUM:"PLATINUM",BLACK:"BLACK"};function Ov(){return p.bank&&p.bank.card||{}}function pa(t){try{if(hd())return;const e=(rn[t]||{}).limit||0,n=document.createElement("div");n.className="bk-flip-dim",n.innerHTML=`<div class="bk-flip"><div class="bk-flip-inner">
      <div class="bk-flip-front"><span>STONK</span></div>
      <div class="bk-flip-back">${qr({enabled:!0,cardTier:t,cardLimit:e,usedAmount:0,billingAmount:0},!0)}</div>
    </div><p>STONK Card 발급 완료 · ${k(t)}</p></div>`,document.body.appendChild(n),requestAnimationFrame(()=>n.classList.add("go")),n.addEventListener("click",()=>n.remove()),setTimeout(()=>n.remove(),1600)}catch{}}function qr(t,e){const n=t.cardTier||"BASIC",s=I(t.usedAmount),i=I(t.cardLimit)||1,r=Math.min(100,Math.round(s/i*100)),o=t.suspended?"suspended":t.overdue?"overdue":r>=80?"near":"";return`<div class="stonk-card tier-${n} ${o} ${e?"compact":""}">
    <div class="sc-top"><span class="sc-brand">STONK</span><span class="sc-tier">${Pv[n]||n}</span></div>
    <div class="sc-num">•••• •••• •••• ${String(1e3+r%9e3).slice(-4)}</div>
    <div class="sc-foot"><span>사용 ${v(s)} / 한도 ${v(t.cardLimit)}</span>${t.suspended?'<b class="sc-flag">정지</b>':t.overdue?'<b class="sc-flag">미납</b>':""}</div>
    <div class="sc-gauge"><span style="width:${r}%"></span></div>
  </div>`}function xv(){const t=Ov(),e=ld(p.bank),n=fv(t),s=Math.max(I(t.billingAmount),I(t.usedAmount)),i=I(t.dueAt)>0?Math.max(0,I(t.dueAt)-Date.now()):0;if(!t.enabled)return`${ha()}
      <div class="bk-grid">
        <div class="bk-card">
          <h3>STONK Card 발급 <span class="bk-tag risk">게임머니 신용카드</span></h3>
          <p class="bk-note">현금이 부족해도 한도 내에서 Gacha·Arcade 결제가 가능한 <b>게임머니 신용 결제 수단</b>입니다. 실제 결제가 아닙니다.</p>
          ${_i.map(c=>{const d=rn[c],u=ca(p.bank,c);return`<label class="bk-product ${u?"":"locked"}"><input type="radio" name="cardTier" value="${c}" ${c===e?"checked":""} ${u?"":"disabled"}/>
              <span><b>${d.title} ${u?'<small class="bk-tag safe">발급 가능</small>':'<small class="bk-tag risk">조건 미달</small>'}</b>
              <small>한도 ${v(d.limit)} · 조건 신용 ${d.minGrade}↑ 또는 VIP ${_t(d.minVip)}↑ · ${k(d.perk)}</small></span></label>`}).join("")}
          <button class="bk-btn primary" data-act="cardIssue" ${e?"":"disabled"}>${e?"카드 발급":"발급 조건 미달"}</button>
        </div>
        <div class="bk-card"><h3>안내</h3><p class="bk-note">카드 사용액은 즉시 차감되지 않고 누적되어 <b>24시간 뒤 청구</b>됩니다. 청구 후 12시간 내 미납 시 신용점수가 하락하고, 미납이 누적되면 카드가 정지됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p></div>
      </div>`;const r=_i[_i.indexOf(t.cardTier)+1],o=r&&ca(p.bank,r)&&!t.overdue&&s<=0,a=cd(t),l=rn[t.cardTier]?rn[t.cardTier].perk:"";return`${ha()}
    <div class="bk-grid">
      <div class="bk-card">
        <h3>내 카드</h3>
        ${qr(t)}
        <div class="bk-row"><span>남은 한도</span><b>${v(n)}</b></div>
        <div class="bk-row"><span>청구 예정/청구액</span><b class="${s>0?"warn":""}">${v(s)}</b></div>
        <div class="bk-row"><span>결제일</span><b>${I(t.dueAt)>0?i>0?"D-"+Ut(i):"도래(납부 필요)":"이용 없음"}</b></div>
        <div class="bk-row"><span>자동납부</span><b>${t.autoPayEnabled?Ct("ON · 전액","ok"):Ct("OFF","muted")}</b></div>
        <div class="bk-row"><span>상태</span><b>${t.suspended?Ct("정지","danger"):t.overdue?Ct("미납","danger"):Ct("정상","ok")}</b></div>
        <div class="bk-quick"><button class="bk-btn ghost" data-act="autoPayToggle">${t.autoPayEnabled?"자동납부 끄기":"자동납부 켜기(전액)"}</button></div>
        <p class="bk-note">${t.autoPayEnabled?"자동납부 ON — 결제일에 현금이 충분하면 청구액이 자동으로 납부됩니다.":"자동납부를 켜면 결제일에 현금이 충분할 때 청구액이 자동 납부됩니다."}</p>
      </div>
      <div class="bk-card">
        <h3>납부</h3>
        <div class="bk-row"><span>남은 청구액</span><b class="${s>0?"warn":""}">${v(s)}</b></div>
        <div class="bk-row"><span>납부 가능 현금</span><b>${v(p.cash)}</b></div>
        <div class="bk-amount"><input id="cardPayAmt" type="number" inputmode="numeric" placeholder="납부 금액" min="1" /><span class="bk-suffix">원</span></div>
        <small class="muted" id="cardPayPreview"></small>
        <div class="bk-quick">
          <button class="bk-btn ghost" data-fill="cardPayAmt:maxpay">전액 ${v(Math.min(s,I(p.cash)))}</button>
          <button class="bk-btn ghost" data-fill="cardPayAmt:minpay">최소 ${v(a)}</button>
        </div>
        <div class="bk-btnrow"><button class="bk-btn primary" data-act="cardPay" ${s>0?"":"disabled"}>납부하기</button>
          ${t.suspended?'<button class="bk-btn" data-act="cardRestore">카드 복구</button>':o?`<button class="bk-btn" data-act="cardUpgrade" data-tier="${r}">${rn[r].title} 업그레이드</button>`:`<button class="bk-btn" disabled>${s>0?"납부 후 업그레이드":"최고 등급"}</button>`}</div>
        <p class="bk-note">최소납부 = max(청구 10%, 100만). <b>전액 납부 시</b> 미납·정지가 해제되고 신용이 소폭 회복됩니다. 혜택: ${k(l)} · 모든 금액은 게임머니입니다.</p>
      </div>
    </div>
    ${Lv()}`}const Mv=[["all","전체"],["use","사용"],["bill","청구"],["pay","납부"],["risk","미납/정지"]],Dv={all:null,use:["card_use","card_issue","card_upgrade"],bill:["card_bill"],pay:["card_pay","card_restore"],risk:["card_overdue","card_suspend"]};function Lv(){const t=(p.tx||[]).filter(i=>String(i.type||"").startsWith("card_")),e=Dv[ji],n=(e?t.filter(i=>e.includes(i.type)):t).slice(0,50),s=(p.bank.card||{}).cardTier||"";return`<div class="bk-card">
    <h3>카드 사용 내역 ${s?`<span class="bk-tag safe">${s}</span>`:""}<small class="muted"> 최근 ${n.length}건</small></h3>
    <div class="bk-filters">${Mv.map(([i,r])=>`<button class="bk-chipbtn ${ji===i?"active":""}" data-cardhist="${i}">${r}</button>`).join("")}</div>
    ${n.length?`<ul class="bk-tx">${n.map(zr).join("")}</ul>`:'<p class="bk-empty">카드 사용 내역이 없습니다.</p>'}
  </div>`}const $v={insurance:"🛡️",investment:"📈",fixed:"🏦",vip:"👑",loan:"⚠️",admin:"🛠️",system:"🔔"};function md(t){const e=$v[t.type]||"🔔";return`<li class="bk-msg ${t.read?"":"unread"}" ${t.id&&!String(t.id).startsWith("local-")?`data-msgread="${k(t.id)}"`:""}>
    <span class="bk-msg-ico">${e}</span>
    <div class="bk-msg-mid"><b>${k(t.title)}</b><small>${k(t.body)}</small><i class="bk-msg-time">${Xs(t.createdAt)}</i></div>
    ${t.actionUrl?`<a class="bk-btn ghost small" href="${k(t.actionUrl)}">${k(t.actionLabel||"이동")}</a>`:""}
    ${t.read?"":'<span class="bk-msg-new">N</span>'}</li>`}function Fv(){const t=(p.msgs||[]).slice(0,30);return`<div class="bk-card">
    <h3>알림 / 우편함 <small class="muted">안읽음 ${p.unread||0} · 최근 ${t.length}건</small>
      ${p.unread>0?'<button class="bk-btn ghost small" data-allread style="float:right">전체 읽음</button>':""}</h3>
    ${t.length?`<ul class="bk-msgs">${t.map(md).join("")}</ul>`:'<p class="bk-empty">받은 알림이 없습니다.</p>'}
    <p class="bk-note">보험 적용·투자/정기 만기·VIP 승급 등 금융 이벤트가 여기에 기록됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p>
  </div>`}function Uv(){if(da||!p||!p.feed)return;da=!0;const t=p.feed,e=[];t.applied&&t.freeInt>0&&e.push(`자유예금 이자 +${v(t.freeInt)} 정산`),t.applied&&t.vipInt>0&&e.push(`VIP 금고 이자 +${v(t.vipInt)} 정산`),t.applied&&t.loanInt>0&&e.push(`대출 이자 +${v(t.loanInt)} 반영`),t.maturedFixed>0&&e.push(`정기예금 만기 ${t.maturedFixed}건`),t.maturedInvest>0&&e.push(`투자 정산 가능 ${t.maturedInvest}건`),e.length&&Nn(e.join(" · "),t.loanInt>0&&!t.freeInt?"warn":"ok")}function Vv(){const t=p.feed;if(!t)return"";const e=[];return t.applied&&t.freeInt>0&&e.push(`<span class="ok">자유예금 이자 +${v(t.freeInt)}</span>`),t.applied&&t.vipInt>0&&e.push(`<span class="ok">VIP 금고 이자 +${v(t.vipInt)}</span>`),t.applied&&t.loanInt>0&&e.push(`<span class="warn">대출 이자 +${v(t.loanInt)}</span>`),t.maturedFixed>0&&e.push(`<span>정기예금 만기 ${t.maturedFixed}건</span>`),t.maturedInvest>0&&e.push(`<span>투자 정산 가능 ${t.maturedInvest}건</span>`),e.length?`<div class="bk-feed">🔔 ${e.join(" · ")}</div>`:""}function Bv(){const t=p.bank,e=Js(t.creditScore),n=ee(t.creditScore),s=rd(p.cash,t),i=Zg(p.cash,t),r=ev(p.cash,t),o=p.feed||{},a=o.applied?I(o.freeInt)+I(o.vipInt):0,l=Object.values(t.investments||{}),c=l.filter(y=>Date.now()>=U(y.maturesAt)).length,d=l.reduce((y,S)=>y+(Date.now()>=U(S.maturesAt)?ad(S).profit:0),0),u=tv(t),f=(p.tx||[]).slice(0,3),m=t.card||{},_=Math.max(I(m.billingAmount),I(m.usedAmount));return`
    ${Vv()}
    <div class="bk-grid">
      ${Av()}
      <div class="bk-card net-hero">
        <h3>순자산</h3>
        <div class="bk-net-big ${s<0?"minus":""}">${v(s)}</div>
        <div class="bk-chips">
          <span class="bk-chip"><i>현금</i>${v(p.cash)}</span>
          <span class="bk-chip"><i>예금</i>${v(I(t.balance)+id(t))}</span>
          <span class="bk-chip"><i>VIP금고</i>${v(t.vipVaultBalance)}</span>
          <span class="bk-chip"><i>투자</i>${v(Jg(t))}</span>
          <span class="bk-chip ${I(t.loanPrincipal)>0?"warn":""}"><i>대출</i>${v(I(t.loanPrincipal)+I(t.loanInterest))}</span>
        </div>
      </div>

      <div class="bk-card credit">
        <h3>신용등급 <span class="bk-tag ${n>=75?"safe":"risk"}">${e}</span></h3>
        <div class="bk-credit"><div class="bk-grade-big g-${e}">${e}</div><div class="bk-score"><div class="bk-score-bar"><span style="width:${n}%"></span></div><small>${n} / 100 · 한도 ${v(Kr(e))}</small></div></div>
        <div class="bk-row"><span>VIP 등급</span><b>${Rs(t.vipTier)} <small class="muted">${t.vipScore}점</small></b></div>
      </div>

      <div class="bk-card">
        <h3>리스크 진단</h3>
        <div class="bk-row"><span>대출 위험도</span><b>${Ct(i.label,i.tone)}${i.eased?' <small class="muted">유예권 적용</small>':""}</b></div>
        <div class="bk-row"><span>예금 안정도</span><b class="${r.tone==="ok"?"ok":"muted"}">${r.label}</b></div>
        <div class="bk-row"><span>오늘 정산 이자</span><b class="${a>0?"ok":"muted"}">${a>0?"+"+v(a):"정산 없음"}</b></div>
        ${i.key==="high"||i.key==="severe"?'<p class="bk-note danger">자산 대비 대출 비중이 높습니다. 상환을 권장합니다.</p>':""}
      </div>

      ${Nv(t)}
      ${Rv()}

      <div class="bk-card">
        <h3>보험 <span class="bk-tag safe">${u.length}건 유효</span></h3>
        ${u.length?u.map(y=>`<div class="bk-row"><span>${k(y.title)}</span><b class="ok">유효</b></div>`).join(""):'<p class="bk-empty">가입한 보험이 없습니다.</p>'}
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
        <div class="bk-row"><span>등급 / 점수</span><b>${Rs(t.vipTier)} ${t.vipScore}점</b></div>
        <div class="bk-row"><span>VIP 금고</span><b>${v(t.vipVaultBalance)} <small class="muted">${fn(t)?"":"· 잠금"}</small></b></div>
        <button class="bk-btn ghost small" data-tab="vip">VIP 보기</button>
      </div>

      <div class="bk-card">
        <h3>알림 <span class="bk-tag ${p.unread>0?"risk":"safe"}">안읽음 ${p.unread||0}</span><button class="bk-btn ghost small" data-tab="messages" style="float:right">전체 보기</button></h3>
        ${(p.msgs||[]).length?`<ul class="bk-msgs mini">${(p.msgs||[]).slice(0,3).map(md).join("")}</ul>`:'<p class="bk-empty">받은 알림이 없습니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>STONK Card <span class="bk-tag ${m.suspended||m.overdue?"risk":m.enabled?"safe":""}">${m.enabled?m.suspended?"정지":m.overdue?"미납":"정상":"미발급"}</span><button class="bk-btn ghost small" data-tab="card" style="float:right">카드</button></h3>
        ${m.enabled?qr(m,!0)+`<div class="bk-row"><span>청구 예정/청구</span><b class="${_>0?"warn":""}">${v(_)}</b></div>`:'<p class="bk-empty">카드를 발급하면 한도 내 게임머니 신용 결제가 가능합니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>Activity Feed <small class="muted">최근 활동</small></h3>
        ${ma().length?`<ul class="bk-activity">${ma().slice(0,8).map(jv).join("")}</ul>`:'<p class="bk-empty">최근 활동이 없습니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>최근 거래 <button class="bk-btn ghost small" data-tab="history" style="float:right">전체 보기</button></h3>
        ${f.length?`<ul class="bk-tx mini">${f.map(zr).join("")}</ul>`:'<p class="bk-empty">거래내역이 없습니다.</p>'}
      </div>
    </div>`}function Ct(t,e){return`<span class="bk-status ${e}">${k(t)}</span>`}function Rs(t){return`<span class="bk-vip v-${t||"NORMAL"}">${k(_t(t))}</span>`}const Wv={deposit:"🏦",withdraw:"🏧",fixedOpen:"📦",fixedCancel:"📦",fixedClaim:"📦",loan:"📝",repay:"✅",interest:"💰",loanInterest:"⚠️",vipInterest:"👑",insurance_buy:"🛡️",insurance_used:"🛡️",investment_buy:"📈",investment_settle:"📊",vip_deposit:"👑",vip_withdraw:"👑",vip_tier_up:"⭐",card_issue:"💳",card_upgrade:"💳",card_use:"💳",card_pay:"✅",card_bill:"🧾",card_overdue:"🚨",card_suspend:"⛔",card_restore:"🔓",admin_adjust:"🛠️"};function Hv(t){const e=I(t.amount);switch(t.type){case"deposit":return`예금 ${v(e)}이 금고에 보관되었습니다.`;case"withdraw":return`예금 ${v(Math.abs(e))}을 인출했습니다.`;case"loan":return`대출 ${v(e)}이 승인되었습니다.`;case"repay":return`대출 ${v(Math.abs(e))}을 상환했습니다.`;case"fixedClaim":return`정기예금 ${v(e)}을 수령했습니다.`;case"investment_settle":return`${t.title}${t.memo?" · "+t.memo:""}`;case"insurance_used":return`${t.title}.`;case"card_issue":return"STONK Card가 발급되었습니다.";case"card_use":return`STONK Card 결제가 승인되었습니다. (${v(e)})`;case"card_pay":return`카드 청구액 ${v(Math.abs(e))}이 납부되었습니다.`;case"card_overdue":return"카드 미납이 발생했습니다.";case"vip_tier_up":return`VIP 등급이 상승했습니다.${t.memo?" ("+t.memo+")":""}`;default:return`${t.title||t.type}${e?" · "+(e>=0?"+":"−")+v(Math.abs(e)):""}`}}function ma(){return(p.tx||[]).slice(0,12)}function jv(t){return`<li class="bk-act"><span class="bk-act-ico">${Wv[t.type]||"•"}</span><span class="bk-act-text">${k(Hv(t))}</span><i class="bk-act-time">${Xs(t.createdAt)}</i></li>`}function Gv(){const t=p.tx||[],e=Object.values(p.bank&&p.bank.insurances||{}),n=e.filter(a=>a.status==="used").length,s=e.filter(a=>a.status==="expired").length;let i=0,r=0,o=0;return t.forEach(a=>{a.type==="insurance_used"&&(/Arcade/.test(a.title||"")?i+=I(a.amount):/Gacha/.test(a.title||"")?r+=1:/유예/.test(a.title||"")&&(o+=1))}),{total:e.length,used:n,expired:s,arcadeRefund:i,gachaDust:r,loanGrace:o}}function Kv(){const t=p.bank,e=Object.values(t.fixed||{}).sort((s,i)=>U(s.maturesAt)-U(i.maturesAt)),n=Date.now();return`
    <div class="bk-grid">
      <div class="bk-card">
        <h3>자유예금 <span class="bk-tag safe">자유 입출금</span></h3>
        <div class="bk-row"><span>예금 잔액</span><b>${v(t.balance)}</b></div>
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
        <p class="bk-note">보유 현금 ${v(p.cash)} · 이자 하루 ${(Tn*100).toFixed(1)}%</p>
      </div>

      <div class="bk-card">
        <h3>정기예금 <span class="bk-tag safe">묶을수록 이자↑</span></h3>
        ${Object.values(zg).map(s=>`
          <label class="bk-product"><input type="radio" name="fixedProd" value="${s.id}" ${s.id==="d1"?"checked":""}/><span><b>${s.label}</b><small>${s.desc}</small></span></label>`).join("")}
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
      ${e.length?`<div class="bk-fixedlist">${e.map(s=>{const i=n>=U(s.maturesAt),r=Math.max(0,U(s.maturesAt)-n),o=Math.floor(I(s.amount)*U(s.rate));return`<div class="bk-fixed ${i?"matured":""}">
          <div><b>${k(s.label)}</b><small>${v(s.amount)} · 이자 ${v(o)} ${i?"· <span class='ok'>만기 완료</span>":"· 남은 시간 "+Ut(r)}</small></div>
          <div class="bk-fixed-act">
            ${i?`<button class="bk-btn primary small" data-claim="${k(s.id)}">수령하기</button>`:`<button class="bk-btn small" data-cancel="${k(s.id)}">중도해지</button>`}
          </div>
        </div>`}).join("")}</div>`:'<p class="bk-empty">가입한 정기예금이 없습니다.</p>'}
    </div>`}function qv(){const t=p.bank,e=Js(t.creditScore),n=Kr(e),s=Math.max(0,n-I(t.loanPrincipal));return`
    <div class="bk-grid">
      <div class="bk-card loanbox">
        <h3>대출 받기 <span class="bk-tag risk">위험</span></h3>
        <div class="bk-row"><span>내 등급 / 한도</span><b>${pd(e)} ${v(n)}</b></div>
        <div class="bk-row"><span>추가 대출 가능</span><b>${v(s)}</b></div>
        <div class="bk-amount">
          <input id="loanAmt" type="number" inputmode="numeric" placeholder="대출 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="loanAmt:maxloan">최대</button></div>
        <button class="bk-btn danger" data-act="loan" ${n<=0?"disabled":""}>대출 받기</button>
        <p class="bk-note danger">이자 하루 ${(kn*100).toFixed(1)}% — 갚지 않으면 빠르게 불어나고 신용등급이 떨어집니다.</p>
      </div>

      <div class="bk-card">
        <h3>상환하기</h3>
        <div class="bk-row"><span>대출 원금</span><b class="${I(t.loanPrincipal)>0?"warn":""}">${v(t.loanPrincipal)}</b></div>
        <div class="bk-row"><span>누적 이자</span><b class="${I(t.loanInterest)>0?"warn":""}">${v(t.loanInterest)}</b></div>
        <div class="bk-row total"><span>상환할 금액</span><b>${v(I(t.loanPrincipal)+I(t.loanInterest))}</b></div>
        <div class="bk-amount">
          <input id="repayAmt" type="number" inputmode="numeric" placeholder="상환 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-btnrow">
          <button class="bk-btn primary" data-act="repay">상환하기</button>
          <button class="bk-btn" data-act="repayAll">전액 상환</button>
        </div>
        <p class="bk-note">상환은 <b>이자부터</b> 갚고 남은 금액으로 원금을 갚습니다. 보유 현금 ${v(p.cash)}</p>
      </div>
    </div>`}const zv={deposit:["입금","in"],withdraw:["출금","out"],fixedOpen:["정기가입","out"],fixedCancel:["중도해지","in"],fixedClaim:["만기수령","in"],loan:["대출","in"],repay:["상환","out"],interest:["예금이자","in"],loanInterest:["대출이자","out"],vipInterest:["VIP이자","in"],insurance_buy:["보험가입","out"],insurance_expired:["보험만료","out"],insurance_used:["보험사용","in"],investment_buy:["투자가입","out"],investment_settle:["투자정산","in"],investment_cancel:["투자해지","in"],vip_deposit:["VIP입금","in"],vip_withdraw:["VIP출금","out"],vip_tier_up:["VIP승급","in"],card_issue:["카드발급","in"],card_upgrade:["카드전환","in"],card_use:["카드결제","out"],card_bill:["카드청구","out"],card_pay:["카드납부","out"],card_overdue:["카드미납","out"],card_suspend:["카드정지","out"],card_restore:["카드복구","in"],admin_adjust:["관리자조정","in"]},_a={all:null,deposit:["deposit","withdraw"],fixed:["fixedOpen","fixedCancel","fixedClaim"],loan:["loan","repay"],interest:["interest","loanInterest","vipInterest"],insurance:["insurance_buy","insurance_expired","insurance_used"],invest:["investment_buy","investment_settle","investment_cancel"],vip:["vip_deposit","vip_withdraw","vip_tier_up"],card:["card_issue","card_upgrade","card_use","card_bill","card_pay","card_overdue","card_suspend","card_restore"]},vi={all:"전체",deposit:"예금",fixed:"정기예금",loan:"대출",interest:"이자",insurance:"보험",invest:"투자",vip:"VIP",card:"카드"};function zr(t){const e=zv[t.type]||[t.type,"in"],n=I(t.amount),s=n>=0?"plus":"minus";return`<li><span class="bk-tx-badge t-${e[1]}">${e[0]}</span>
    <div class="bk-tx-mid"><b>${k(t.title||e[0])}</b><small>${Xs(t.createdAt)}${t.memo?" · "+k(t.memo):""}</small></div>
    <b class="bk-tx-amt ${s}">${n>=0?"+":"−"}${v(Math.abs(n))}</b></li>`}function Yv(){const t=p.tx||[],e=_a[on],n=(e?t.filter(s=>e.includes(s.type)):t).slice(0,50);return`<div class="bk-card">
    <h3>거래내역 <small class="muted">${vi[on]} · ${n.length}건</small></h3>
    <div class="bk-filters">
      ${Object.keys(_a).map(s=>`<button class="bk-chipbtn ${on===s?"active":""}" data-filter="${s}">${vi[s]}</button>`).join("")}
    </div>
    ${n.length?`<ul class="bk-tx">${n.map(zr).join("")}</ul>`:`<p class="bk-empty">${vi[on]} 거래내역이 없습니다.</p>`}
  </div>`}const Qv={arcade:"Arcade에서 100만원 이상 손실 시 1회에 한해 손실액의 10%를 환급합니다. (자동 적용)",gacha:"10회 뽑기에서 Epic 이상이 없거나 Common이 8개 이상일 때 Dust 300을 지급합니다. (자동 적용)",loan:"대출 실행 또는 대출 위험도 하락 시 신용점수 하락을 1회 완화합니다. (자동 적용)"};function Jv(t,e){return t.status==="used"?'<span class="bk-status ok">사용됨</span>':t.status==="expired"||U(t.expiresAt)<=e?'<span class="bk-status muted">만료</span>':'<span class="bk-status warn">활성</span>'}function Xv(){const t=p.bank,e=Date.now(),n=t.vipTier||"NORMAL",s=lv(n),i=Object.values(t.insurances||{}),r=i.filter(o=>o.status==="used").sort((o,a)=>U(a.usedAt)-U(o.usedAt)).slice(0,3);return`
    <div class="bk-grid">
      ${Object.values(od).map(o=>{const a=i.find(c=>c.type===o.id&&mi(c,e)),l=Math.max(1,Math.floor(o.premium*(1-s)));return`<div class="bk-card">
          <h3>${k(o.title)} ${a?'<span class="bk-tag safe">가입중</span>':'<span class="bk-tag risk">게임머니 보호</span>'}</h3>
          <p class="bk-note">${k(Qv[o.id]||o.desc)}</p>
          <div class="bk-row"><span>가입비</span><b>${s>0?`<s class="muted">${v(o.premium)}</s> ${v(l)}`:v(o.premium)}</b></div>
          ${s>0?`<div class="bk-row"><span>VIP 할인</span><b class="ok">${_t(n)} ${Math.round(s*100)}%</b></div>`:""}
          ${a?`<div class="bk-row"><span>만료까지</span><b class="ok">${Ut(Math.max(0,U(a.expiresAt)-e))}</b></div>
               <button class="bk-btn" disabled>가입 중</button>`:`<button class="bk-btn primary" data-buyins="${o.id}">${v(l)} 가입하기</button>`}
        </div>`}).join("")}
    </div>
    <div class="bk-card">
      <h3>보험 통계 <small class="muted">게임머니 보호 기능</small></h3>
      ${(()=>{const o=Gv();return`
        <div class="bk-row"><span>총 가입 / 사용됨 / 만료</span><b>${o.total} / <span class="ok">${o.used}</span> / <span class="muted">${o.expired}</span></b></div>
        <div class="bk-row"><span>Arcade 보험 총 환급액</span><b>${v(o.arcadeRefund)}</b></div>
        <div class="bk-row"><span>Gacha 보호권 지급</span><b>${o.gachaDust}회</b></div>
        <div class="bk-row"><span>대출 유예권 사용</span><b>${o.loanGrace}회</b></div>`})()}
    </div>
    ${r.length?`<div class="bk-card">
      <h3>최근 보험 적용 기록</h3>
      <div class="bk-fixedlist">${r.map(o=>`<div class="bk-fixed matured"><div><b>${k(o.title)}</b><small>${o.usedAt?Xs(o.usedAt)+" 적용됨":"적용됨"}</small></div><span class="bk-status ok">사용됨</span></div>`).join("")}</div>
    </div>`:""}
    <div class="bk-card">
      <h3>내 보험 내역</h3>
      ${i.length?`<div class="bk-fixedlist">${i.sort((o,a)=>U(a.startedAt)-U(o.startedAt)).map(o=>`
        <div class="bk-fixed ${mi(o,e)?"matured":""}">
          <div><b>${k(o.title)}</b><small>${v(o.premium)} · ${mi(o,e)?"만료 "+Ut(Math.max(0,U(o.expiresAt)-e)):o.status==="used"?"보상 적용 완료":"만료됨"}</small></div>
          ${Jv(o,e)}
        </div>`).join("")}</div>`:'<p class="bk-empty">가입 이력이 없습니다.</p>'}
      <p class="bk-note">보험은 손실을 완화/보호하는 <b>게임머니 보호 기능</b>입니다. 무한 증식 수단이 아닙니다.</p>
    </div>`}function Zv(){const t=p.bank,e=Date.now(),n=Object.values(t.investments||{}).sort((s,i)=>U(s.maturesAt)-U(i.maturesAt));return`
    <div class="bk-grid">
      <div class="bk-card">
        <h3>투자상품 가입 <span class="bk-tag risk">원금 손실 가능</span></h3>
        ${[...Object.values(Yg),...Object.values(Qg)].map(s=>{const i=s.requiredVipTier&&Ss(t.vipTier)<Ss(s.requiredVipTier);return`<label class="bk-product ${i?"locked":""}"><input type="radio" name="invProd" value="${s.id}" ${s.id==="stable"?"checked":""} ${i?"disabled":""}/>
            <span><b>${k(s.title)} <small class="bk-risk r-${k(s.risk)}">${k(s.risk)}</small>${s.requiredVipTier?` <small class="bk-tag ${i?"risk":"safe"}">${_t(s.requiredVipTier)} 전용</small>`:""}</b>
            <small>${nb(s.ms)} · 예상 ${(s.min*100).toFixed(0)}% ~ +${(s.max*100).toFixed(0)}%${i?` · ${_t(s.requiredVipTier)} 등급 필요`:""}</small></span></label>`}).join("")}
        <div class="bk-amount">
          <input id="invAmt" type="number" inputmode="numeric" placeholder="투자 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="invAmt:maxin">최대</button></div>
        <button class="bk-btn primary" data-act="buyInvest">투자하기</button>
        <p class="bk-note">만기 전 해지는 불가합니다. 결과는 가입 시점에 확정되어 새로고침해도 바뀌지 않습니다. 보유 현금 ${v(p.cash)}</p>
      </div>
      <div class="bk-card">
        <h3>안내</h3>
        <p class="bk-note">Battle의 실시간 매매와 달리, 투자상품은 <b>만기 후 자동 정산</b>되는 금융상품입니다. 레버리지 펀드는 손실 폭이 큽니다.</p>
        <p class="bk-note">모든 결과는 STONK 가상 게임머니 기준입니다.</p>
      </div>
    </div>
    <div class="bk-card">
      <h3>보유 투자상품</h3>
      ${n.length?`<div class="bk-fixedlist">${n.map(s=>{const i=e>=U(s.maturesAt),r=i?ad(s):null,[o,a]=r?Xg(r.rate):["",""],l=U(s.startedAt)||U(s.maturesAt)-1,c=i?100:Math.max(0,Math.min(100,Math.round((e-l)/(U(s.maturesAt)-l)*100))),d=`예상 ${(U(s.expectedMinRate)*100).toFixed(0)}% ~ +${(U(s.expectedMaxRate)*100).toFixed(0)}%`;return`<div class="bk-fixed ${i?"matured":""}">
          <div style="flex:1;min-width:0"><b>${k(s.title)}${s.productType==="pbond"||s.productType==="bsecret"?' <small class="bk-tag safe">VIP</small>':""}</b><small>${v(s.principal)} · ${i?`<span class="inv-${a}">${o} ${r.rate>=0?"+":"−"}${v(Math.abs(r.profit))}</span>`:`${d} · 남은 ${Ut(Math.max(0,U(s.maturesAt)-e))}`}</small>
            <div class="inv-progress"><span style="width:${c}%"></span></div></div>
          <div class="bk-fixed-act">${i?`<button class="bk-btn primary small" data-claiminv="${k(s.id)}">수령하기</button>`:`<span class="bk-tag">운용중 ${c}%</span>`}</div>
        </div>`}).join("")}</div>`:'<p class="bk-empty">보유한 투자상품이 없습니다.</p>'}
    </div>`}const eb={NORMAL:["기본 Bank 기능 사용"],SILVER:["보험 가입비 3% 할인","거래내역 SILVER 표시"],GOLD:["VIP 금고 사용 가능","보험 가입비 5% 할인","VIP 금고 이자 하루 0.30%"],PLATINUM:["VIP 금고 이자 하루 0.35%","보험 가입비 8% 할인","PLATINUM 안정 채권 해금"],BLACK:["VIP 금고 이자 하루 0.40%","보험 가입비 10% 할인","BLACK 시크릿 펀드 해금","대시보드 BLACK 전용 효과"]};function tb(){const t=p.bank,e=fn(t),n=t.vipTier||"NORMAL",s=cv(n)||av;return`
    <div class="bk-grid">
      <div class="bk-card credit ${n==="BLACK"?"black-card":""}">
        <h3>VIP 등급 ${n==="BLACK"?'<span class="bk-tag" style="background:#14151c;color:#f0d488">BLACK 혜택 활성화</span>':""}</h3>
        <div class="bk-credit"><div class="bk-grade-big v-${n}">${_t(n).slice(0,1)}</div>
          <div class="bk-score"><div class="bk-score-bar"><span style="width:${t.vipScore}%"></span></div><small>${_t(n)} · ${t.vipScore} / 100</small></div></div>
        <p class="bk-note">예금·정기·투자·보험 이용과 무대출·높은 순자산으로 VIP 점수가 오릅니다. GOLD 등급부터 VIP 금고가 열립니다.</p>
      </div>
      <div class="bk-card">
        <h3>등급별 혜택</h3>
        ${["SILVER","GOLD","PLATINUM","BLACK"].map(i=>`
          <div class="bk-row"><span>${Rs(i)}</span><b class="${Ss(n)>=Ss(i)?"ok":"muted"}" style="font-weight:600;font-size:12px;text-align:right">${eb[i].join(" · ")}</b></div>`).join("")}
      </div>
      <div class="bk-card">
        <h3>VIP 금고 ${e?'<span class="bk-tag safe">이용 가능</span>':'<span class="bk-tag risk">GOLD부터 잠금</span>'}</h3>
        <div class="bk-row"><span>금고 잔액</span><b>${v(t.vipVaultBalance)}</b></div>
        <div class="bk-row"><span>내 이자율</span><b class="ok">하루 ${(s*100).toFixed(2)}%</b></div>
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
        <p class="bk-note">VIP 금고 이자는 등급이 높을수록 올라갑니다(과도한 수익 방지를 위해 낮게 유지). 보유 현금 ${v(p.cash)}</p>`:'<p class="bk-note">현재 등급에서는 VIP 금고가 잠겨 있습니다. 예금·투자 등을 이용해 <b>GOLD</b> 등급에 도달하면 열립니다.</p>'}
      </div>
    </div>`}function nb(t){return Math.round(t/36e5)+"시간"}function Ut(t){const e=Math.floor(t/36e5),n=Math.floor(t%36e5/6e4);return e>0?`${e}시간 ${n}분`:`${n}분`}function Xs(t){const e=new Date(U(t)||Date.now()),n=s=>(s<10?"0":"")+s;return`${e.getMonth()+1}/${n(e.getDate())} ${n(e.getHours())}:${n(e.getMinutes())}`}function sb(){const t=H.querySelector("[data-home]");t&&t.addEventListener("click",s=>{s.preventDefault(),As="dashboard",window.scrollTo(0,0),Ve()}),H.querySelectorAll("[data-tab]").forEach(s=>s.addEventListener("click",()=>{As=s.dataset.tab,Ve()})),H.querySelectorAll("[data-fill]").forEach(s=>s.addEventListener("click",()=>ib(s.dataset.fill))),H.querySelectorAll("[data-act]").forEach(s=>s.addEventListener("click",()=>rb(s.dataset.act))),H.querySelectorAll("[data-claim]").forEach(s=>s.addEventListener("click",()=>ne(()=>Xc(p.uid,s.dataset.claim,p)))),H.querySelectorAll("[data-cancel]").forEach(s=>s.addEventListener("click",()=>{confirm("정기예금을 중도해지하면 이자 없이 원금만 돌려받습니다. 해지할까요?")&&ne(()=>Jc(p.uid,s.dataset.cancel,p))})),H.querySelectorAll("[data-claiminv]").forEach(s=>s.addEventListener("click",()=>ne(()=>iv(p.uid,s.dataset.claiminv,p)))),H.querySelectorAll("[data-buyins]").forEach(s=>s.addEventListener("click",()=>{const i=od[s.dataset.buyins];i&&confirm(`${i.title} 가입비 ${v(i.premium)}을(를) 결제할까요? (게임머니)`)&&ne(()=>nv(p.uid,s.dataset.buyins,p))})),H.querySelectorAll("[data-filter]").forEach(s=>s.addEventListener("click",()=>{on=s.dataset.filter,Ve()})),H.querySelectorAll("[data-cardhist]").forEach(s=>s.addEventListener("click",()=>{ji=s.dataset.cardhist,Ve()}));const e=H.querySelector("#cardPayAmt");e&&e.addEventListener("input",fd),H.querySelectorAll("[data-msgread]").forEach(s=>s.addEventListener("click",()=>{const i=(p.msgs||[]).find(r=>r.id===s.dataset.msgread);i&&!i.read&&(i.read=!0,p.unread=hv(p.msgs),dv(p.uid,i.id).catch(()=>{}),Ve())}));const n=H.querySelector("[data-allread]");n&&n.addEventListener("click",()=>{uv(p.uid,p.msgs).catch(()=>{}),(p.msgs||[]).forEach(s=>{s.read=!0}),p.unread=0,Ve()})}function ib(t){const[e,n]=t.split(":"),s=document.getElementById(e);if(!s)return;const i=p.bank;let r=0;if(n==="maxin")r=I(p.cash);else if(n==="maxout")r=I(i.balance);else if(n==="maxvip")r=I(i.vipVaultBalance);else if(n==="maxloan")r=Math.max(0,Kr(Js(i.creditScore))-I(i.loanPrincipal));else if(n==="maxpay"){const o=i.card||{};r=Math.min(I(p.cash),Math.max(I(o.billingAmount),I(o.usedAmount)))}else n==="minpay"&&(r=cd(i.card));s.value=r>0?r:"",e==="cardPayAmt"&&fd()}function rb(t){var n;const e=p.bank;if(t==="deposit")return ne(()=>zc(p.uid,ye("freeAmt"),p));if(t==="withdraw")return ne(()=>Yc(p.uid,ye("freeAmt"),p));if(t==="openFixed"){const s=(H.querySelector('input[name="fixedProd"]:checked')||{}).value||"d1";return ne(()=>Qc(p.uid,s,ye("fixedAmt"),p))}if(t==="loan"){const s=ye("loanAmt");return qn(s,"대출 심사 중...",()=>Zc(p.uid,s,p))}if(t==="repay"){const s=ye("repayAmt");return qn(s,"상환 처리 중...",()=>Hi(p.uid,s,p))}if(t==="buyInvest"){const s=(H.querySelector('input[name="invProd"]:checked')||{}).value||"stable",i=ye("invAmt");return qn(i,"투자 계약 체결...",()=>sv(p.uid,s,i,p))}if(t==="vipDeposit")return ne(()=>rv(p.uid,ye("vipAmt"),p));if(t==="vipWithdraw")return ne(()=>ov(p.uid,ye("vipAmt"),p));if(t==="cardIssue"){const s=(H.querySelector('input[name="cardTier"]:checked')||{}).value||ld(p.bank);if(!s){Nn("발급 가능한 카드 등급이 없습니다.","err");return}return ne(async()=>{const i=await pv(p.uid,s,p);return pa(s),i})}if(t==="cardUpgrade"){const s=(n=(H.querySelector('[data-act="cardUpgrade"]')||{}).dataset)==null?void 0:n.tier;return ne(async()=>{const i=await mv(p.uid,s,p);return pa(s),i})}if(t==="cardRestore")return ne(()=>gv(p.uid,p));if(t==="autoPayToggle"){const s=!(p.bank.card||{}).autoPayEnabled;return ne(()=>bv(p.uid,s,"full",p))}if(t==="cardPay"){const s=ye("cardPayAmt");return qn(s,"카드 승인 확인 중...",()=>_v(p.uid,s,p))}if(t==="repayAll"){const s=I(e.loanPrincipal)+I(e.loanInterest);if(s<=0){Nn("상환할 대출이 없습니다.","err");return}return ne(()=>Hi(p.uid,s,p))}}
