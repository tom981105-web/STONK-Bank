(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();var so={};/**
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
 */const Ia={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const _=function(t,e){if(!t)throw Gt(e)},Gt=function(t){return new Error("Firebase Database ("+Ia.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Ea=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Sd=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],a=t[n++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ji={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,a=o?t[i+1]:0,l=i+2<t.length,c=l?t[i+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let f=(a&15)<<2|c>>6,m=c&63;l||(m=64,o||(f=64)),s.push(n[d],n[u],n[f],n[m])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Ea(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Sd(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const u=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new Ad;const f=r<<2|a>>4;if(s.push(f),c!==64){const m=a<<4&240|c>>2;if(s.push(m),u!==64){const g=c<<6&192|u;s.push(g)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ad extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ca=function(t){const e=Ea(t);return Ji.encodeByteArray(e,!0)},is=function(t){return Ca(t).replace(/\./g,"")},rs=function(t){try{return Ji.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Rd(t){return ka(void 0,t)}function ka(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Pd(n)||(t[n]=ka(t[n],e[n]));return t}function Pd(t){return t!=="__proto__"}/**
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
 */function Nd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Od=()=>Nd().__FIREBASE_DEFAULTS__,xd=()=>{if(typeof process>"u"||typeof so>"u")return;const t=so.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Md=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&rs(t[1]);return e&&JSON.parse(e)},Xi=()=>{try{return Od()||xd()||Md()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ta=t=>{var e,n;return(n=(e=Xi())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Dd=t=>{const e=Ta(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Sa=()=>{var t;return(t=Xi())===null||t===void 0?void 0:t.config},Aa=t=>{var e;return(e=Xi())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class Kt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Ld(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[is(JSON.stringify(n)),is(JSON.stringify(o)),""].join(".")}/**
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
 */function ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zi(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ae())}function $d(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Fd(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ra(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ud(){const t=ae();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Vd(){return Ia.NODE_ADMIN===!0}function Bd(){try{return typeof indexedDB=="object"}catch{return!1}}function Wd(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}/**
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
 */const Hd="FirebaseError";class lt extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Hd,Object.setPrototypeOf(this,lt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xn.prototype.create)}}class xn{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?jd(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new lt(i,a,s)}}function jd(t,e){return t.replace(Gd,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Gd=/\{\$([^}]+)}/g;/**
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
 */function _n(t){return JSON.parse(t)}function Q(t){return JSON.stringify(t)}/**
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
 */const Pa=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=_n(rs(r[0])||""),n=_n(rs(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},Kd=function(t){const e=Pa(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},qd=function(t){const e=Pa(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function we(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function vt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function ki(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function os(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function as(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(io(r)&&io(o)){if(!as(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function io(t){return t!==null&&typeof t=="object"}/**
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
 */function qt(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class zd{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let u=0;u<16;u++)s[u]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let u=16;u<80;u++){const f=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const f=(i<<5|i>>>27)+c+l+d+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Yd(t,e){const n=new Qd(t,e);return n.subscribe.bind(n)}class Qd{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let i;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Jd(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:s},i.next===void 0&&(i.next=si),i.error===void 0&&(i.error=si),i.complete===void 0&&(i.complete=si);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Jd(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function si(){}function Ds(t,e){return`${t} failed: ${e} argument `}/**
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
 */const Xd=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,_(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Ls=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function ie(t){return t&&t._delegate?t._delegate:t}class bt{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ft="[DEFAULT]";/**
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
 */class Zd{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Kt;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(tu(e))try{this.getOrInitializeService({instanceIdentifier:ft})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=ft){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ft){return this.instances.has(e)}getOptions(e=ft){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,n){var s;const i=this.normalizeInstanceIdentifier(n),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:eu(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=ft){return this.component?this.component.multipleInstances?e:ft:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function eu(t){return t===ft?void 0:t}function tu(t){return t.instantiationMode==="EAGER"}/**
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
 */class nu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Zd(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var D;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(D||(D={}));const su={debug:D.DEBUG,verbose:D.VERBOSE,info:D.INFO,warn:D.WARN,error:D.ERROR,silent:D.SILENT},iu=D.INFO,ru={[D.DEBUG]:"log",[D.VERBOSE]:"log",[D.INFO]:"info",[D.WARN]:"warn",[D.ERROR]:"error"},ou=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=ru[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class er{constructor(e){this.name=e,this._logLevel=iu,this._logHandler=ou,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in D))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?su[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,D.DEBUG,...e),this._logHandler(this,D.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,D.VERBOSE,...e),this._logHandler(this,D.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,D.INFO,...e),this._logHandler(this,D.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,D.WARN,...e),this._logHandler(this,D.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,D.ERROR,...e),this._logHandler(this,D.ERROR,...e)}}const au=(t,e)=>e.some(n=>t instanceof n);let ro,oo;function lu(){return ro||(ro=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function cu(){return oo||(oo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Na=new WeakMap,Ti=new WeakMap,Oa=new WeakMap,ii=new WeakMap,tr=new WeakMap;function du(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Xe(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Na.set(n,t)}).catch(()=>{}),tr.set(e,t),e}function uu(t){if(Ti.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Ti.set(t,e)}let Si={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ti.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Oa.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Xe(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function hu(t){Si=t(Si)}function fu(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ri(this),e,...n);return Oa.set(s,e.sort?e.sort():[e]),Xe(s)}:cu().includes(t)?function(...e){return t.apply(ri(this),e),Xe(Na.get(this))}:function(...e){return Xe(t.apply(ri(this),e))}}function pu(t){return typeof t=="function"?fu(t):(t instanceof IDBTransaction&&uu(t),au(t,lu())?new Proxy(t,Si):t)}function Xe(t){if(t instanceof IDBRequest)return du(t);if(ii.has(t))return ii.get(t);const e=pu(t);return e!==t&&(ii.set(t,e),tr.set(e,t)),e}const ri=t=>tr.get(t);function mu(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),a=Xe(o);return s&&o.addEventListener("upgradeneeded",l=>{s(Xe(o.result),l.oldVersion,l.newVersion,Xe(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const _u=["get","getKey","getAll","getAllKeys","count"],gu=["put","add","delete","clear"],oi=new Map;function ao(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(oi.get(e))return oi.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=gu.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||_u.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),i&&l.done]))[0]};return oi.set(e,r),r}hu(t=>({...t,get:(e,n,s)=>ao(e,n)||t.get(e,n,s),has:(e,n)=>!!ao(e,n)||t.has(e,n)}));/**
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
 */class vu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(bu(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function bu(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ai="@firebase/app",lo="0.10.13";/**
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
 */const Le=new er("@firebase/app"),yu="@firebase/app-compat",wu="@firebase/analytics-compat",Iu="@firebase/analytics",Eu="@firebase/app-check-compat",Cu="@firebase/app-check",ku="@firebase/auth",Tu="@firebase/auth-compat",Su="@firebase/database",Au="@firebase/data-connect",Ru="@firebase/database-compat",Pu="@firebase/functions",Nu="@firebase/functions-compat",Ou="@firebase/installations",xu="@firebase/installations-compat",Mu="@firebase/messaging",Du="@firebase/messaging-compat",Lu="@firebase/performance",$u="@firebase/performance-compat",Fu="@firebase/remote-config",Uu="@firebase/remote-config-compat",Vu="@firebase/storage",Bu="@firebase/storage-compat",Wu="@firebase/firestore",Hu="@firebase/vertexai-preview",ju="@firebase/firestore-compat",Gu="firebase",Ku="10.14.1";/**
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
 */const Ri="[DEFAULT]",qu={[Ai]:"fire-core",[yu]:"fire-core-compat",[Iu]:"fire-analytics",[wu]:"fire-analytics-compat",[Cu]:"fire-app-check",[Eu]:"fire-app-check-compat",[ku]:"fire-auth",[Tu]:"fire-auth-compat",[Su]:"fire-rtdb",[Au]:"fire-data-connect",[Ru]:"fire-rtdb-compat",[Pu]:"fire-fn",[Nu]:"fire-fn-compat",[Ou]:"fire-iid",[xu]:"fire-iid-compat",[Mu]:"fire-fcm",[Du]:"fire-fcm-compat",[Lu]:"fire-perf",[$u]:"fire-perf-compat",[Fu]:"fire-rc",[Uu]:"fire-rc-compat",[Vu]:"fire-gcs",[Bu]:"fire-gcs-compat",[Wu]:"fire-fst",[ju]:"fire-fst-compat",[Hu]:"fire-vertex","fire-js":"fire-js",[Gu]:"fire-js-all"};/**
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
 */const ls=new Map,zu=new Map,Pi=new Map;function co(t,e){try{t.container.addComponent(e)}catch(n){Le.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function $t(t){const e=t.name;if(Pi.has(e))return Le.debug(`There were multiple attempts to register component ${e}.`),!1;Pi.set(e,t);for(const n of ls.values())co(n,t);for(const n of zu.values())co(n,t);return!0}function nr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Qe(t){return t.settings!==void 0}/**
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
 */const Yu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ze=new xn("app","Firebase",Yu);/**
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
 */class Qu{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new bt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ze.create("app-deleted",{appName:this._name})}}/**
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
 */const zt=Ku;function xa(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Ri,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw Ze.create("bad-app-name",{appName:String(i)});if(n||(n=Sa()),!n)throw Ze.create("no-options");const r=ls.get(i);if(r){if(as(n,r.options)&&as(s,r.config))return r;throw Ze.create("duplicate-app",{appName:i})}const o=new nu(i);for(const l of Pi.values())o.addComponent(l);const a=new Qu(n,s,o);return ls.set(i,a),a}function Ma(t=Ri){const e=ls.get(t);if(!e&&t===Ri&&Sa())return xa();if(!e)throw Ze.create("no-app",{appName:t});return e}function et(t,e,n){var s;let i=(s=qu[t])!==null&&s!==void 0?s:t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${i}" with version "${e}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Le.warn(a.join(" "));return}$t(new bt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Ju="firebase-heartbeat-database",Xu=1,gn="firebase-heartbeat-store";let ai=null;function Da(){return ai||(ai=mu(Ju,Xu,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(gn)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ze.create("idb-open",{originalErrorMessage:t.message})})),ai}async function Zu(t){try{const n=(await Da()).transaction(gn),s=await n.objectStore(gn).get(La(t));return await n.done,s}catch(e){if(e instanceof lt)Le.warn(e.message);else{const n=Ze.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Le.warn(n.message)}}}async function uo(t,e){try{const s=(await Da()).transaction(gn,"readwrite");await s.objectStore(gn).put(e,La(t)),await s.done}catch(n){if(n instanceof lt)Le.warn(n.message);else{const s=Ze.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Le.warn(s.message)}}}function La(t){return`${t.name}!${t.options.appId}`}/**
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
 */const eh=1024,th=30*24*60*60*1e3;class nh{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new ih(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ho();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=th}),this._storage.overwrite(this._heartbeatsCache))}catch(s){Le.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ho(),{heartbeatsToSend:s,unsentEntries:i}=sh(this._heartbeatsCache.heartbeats),r=is(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return Le.warn(n),""}}}function ho(){return new Date().toISOString().substring(0,10)}function sh(t,e=eh){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),fo(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),fo(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class ih{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Bd()?Wd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Zu(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return uo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return uo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function fo(t){return is(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function rh(t){$t(new bt("platform-logger",e=>new vu(e),"PRIVATE")),$t(new bt("heartbeat",e=>new nh(e),"PRIVATE")),et(Ai,lo,t),et(Ai,lo,"esm2017"),et("fire-js","")}rh("");var oh="firebase",ah="10.14.1";/**
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
 */et(oh,ah,"app");function sr(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(t);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(t,s[i])&&(n[s[i]]=t[s[i]]);return n}function $a(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const lh=$a,Fa=new xn("auth","Firebase",$a());/**
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
 */const cs=new er("@firebase/auth");function ch(t,...e){cs.logLevel<=D.WARN&&cs.warn(`Auth (${zt}): ${t}`,...e)}function Zn(t,...e){cs.logLevel<=D.ERROR&&cs.error(`Auth (${zt}): ${t}`,...e)}/**
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
 */function $e(t,...e){throw ir(t,...e)}function Ce(t,...e){return ir(t,...e)}function Ua(t,e,n){const s=Object.assign(Object.assign({},lh()),{[e]:n});return new xn("auth","Firebase",s).create(e,{appName:t.name})}function gt(t){return Ua(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ir(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Fa.create(t,...e)}function I(t,e,...n){if(!t)throw ir(e,...n)}function Pe(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Zn(e),new Error(e)}function Fe(t,e){t||Pe(e)}/**
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
 */function Ni(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function dh(){return po()==="http:"||po()==="https:"}function po(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function uh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(dh()||Fd()||"connection"in navigator)?navigator.onLine:!0}function hh(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Mn{constructor(e,n){this.shortDelay=e,this.longDelay=n,Fe(n>e,"Short delay should be less than long delay!"),this.isMobile=Zi()||Ra()}get(){return uh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function rr(t,e){Fe(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Va{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const fh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const ph=new Mn(3e4,6e4);function or(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Yt(t,e,n,s,i={}){return Ba(t,i,async()=>{let r={},o={};s&&(e==="GET"?o=s:r={body:JSON.stringify(s)});const a=qt(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:l},r);return $d()||(c.referrerPolicy="no-referrer"),Va.fetch()(Wa(t,t.config.apiHost,n,a),c)})}async function Ba(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},fh),e);try{const i=new _h(t),r=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw zn(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw zn(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw zn(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw zn(t,"user-disabled",o);const d=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Ua(t,d,c);$e(t,d)}}catch(i){if(i instanceof lt)throw i;$e(t,"network-request-failed",{message:String(i)})}}async function mh(t,e,n,s,i={}){const r=await Yt(t,e,n,s,i);return"mfaPendingCredential"in r&&$e(t,"multi-factor-auth-required",{_serverResponse:r}),r}function Wa(t,e,n,s){const i=`${e}${n}?${s}`;return t.config.emulator?rr(t.config,i):`${t.config.apiScheme}://${i}`}class _h{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Ce(this.auth,"network-request-failed")),ph.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function zn(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const i=Ce(t,e,s);return i.customData._tokenResponse=n,i}/**
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
 */async function gh(t,e){return Yt(t,"POST","/v1/accounts:delete",e)}async function Ha(t,e){return Yt(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function cn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function vh(t,e=!1){const n=ie(t),s=await n.getIdToken(e),i=ar(s);I(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:s,authTime:cn(li(i.auth_time)),issuedAtTime:cn(li(i.iat)),expirationTime:cn(li(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function li(t){return Number(t)*1e3}function ar(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return Zn("JWT malformed, contained fewer than 3 sections"),null;try{const i=rs(n);return i?JSON.parse(i):(Zn("Failed to decode base64 JWT payload"),null)}catch(i){return Zn("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function mo(t){const e=ar(t);return I(e,"internal-error"),I(typeof e.exp<"u","internal-error"),I(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function vn(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof lt&&bh(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function bh({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class yh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Oi{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=cn(this.lastLoginAt),this.creationTime=cn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ds(t){var e;const n=t.auth,s=await t.getIdToken(),i=await vn(t,Ha(n,{idToken:s}));I(i==null?void 0:i.users.length,n,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?ja(r.providerUserInfo):[],a=Ih(t.providerData,o),l=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Oi(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(t,u)}async function wh(t){const e=ie(t);await ds(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ih(t,e){return[...t.filter(s=>!e.some(i=>i.providerId===s.providerId)),...e]}function ja(t){return t.map(e=>{var{providerId:n}=e,s=sr(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
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
 */async function Eh(t,e){const n=await Ba(t,{},async()=>{const s=qt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=t.config,o=Wa(t,i,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Va.fetch()(o,{method:"POST",headers:a,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Ch(t,e){return Yt(t,"POST","/v2/accounts:revokeToken",or(t,e))}/**
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
 */class Ot{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){I(e.idToken,"internal-error"),I(typeof e.idToken<"u","internal-error"),I(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):mo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){I(e.length!==0,"internal-error");const n=mo(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(I(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:i,expiresIn:r}=await Eh(e,n);this.updateTokensAndExpiration(s,i,Number(r))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:i,expirationTime:r}=n,o=new Ot;return s&&(I(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),i&&(I(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(I(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ot,this.toJSON())}_performRefresh(){return Pe("not implemented")}}/**
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
 */function Ge(t,e){I(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ne{constructor(e){var{uid:n,auth:s,stsTokenManager:i}=e,r=sr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new yh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Oi(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await vn(this,this.stsTokenManager.getToken(this.auth,e));return I(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return vh(this,e)}reload(){return wh(this)}_assign(e){this!==e&&(I(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ne(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){I(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await ds(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(gt(this.auth));const e=await this.getIdToken();return await vn(this,gh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,i,r,o,a,l,c,d;const u=(s=n.displayName)!==null&&s!==void 0?s:void 0,f=(i=n.email)!==null&&i!==void 0?i:void 0,m=(r=n.phoneNumber)!==null&&r!==void 0?r:void 0,g=(o=n.photoURL)!==null&&o!==void 0?o:void 0,y=(a=n.tenantId)!==null&&a!==void 0?a:void 0,b=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,Z=(c=n.createdAt)!==null&&c!==void 0?c:void 0,Ae=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:j,emailVerified:He,isAnonymous:Kn,providerData:en,stsTokenManager:_e}=n;I(j&&_e,e,"internal-error");const dt=Ot.fromJSON(this.name,_e);I(typeof j=="string",e,"internal-error"),Ge(u,e.name),Ge(f,e.name),I(typeof He=="boolean",e,"internal-error"),I(typeof Kn=="boolean",e,"internal-error"),Ge(m,e.name),Ge(g,e.name),Ge(y,e.name),Ge(b,e.name),Ge(Z,e.name),Ge(Ae,e.name);const ut=new Ne({uid:j,auth:e,email:f,emailVerified:He,displayName:u,isAnonymous:Kn,photoURL:g,phoneNumber:m,tenantId:y,stsTokenManager:dt,createdAt:Z,lastLoginAt:Ae});return en&&Array.isArray(en)&&(ut.providerData=en.map(N=>Object.assign({},N))),b&&(ut._redirectEventId=b),ut}static async _fromIdTokenResponse(e,n,s=!1){const i=new Ot;i.updateFromServerResponse(n);const r=new Ne({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:s});return await ds(r),r}static async _fromGetAccountInfoResponse(e,n,s){const i=n.users[0];I(i.localId!==void 0,"internal-error");const r=i.providerUserInfo!==void 0?ja(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(r!=null&&r.length),a=new Ot;a.updateFromIdToken(s);const l=new Ne({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new Oi(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
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
 */const _o=new Map;function Oe(t){Fe(t instanceof Function,"Expected a class definition");let e=_o.get(t);return e?(Fe(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,_o.set(t,e),e)}/**
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
 */class Ga{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ga.type="NONE";const go=Ga;/**
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
 */function es(t,e,n){return`firebase:${t}:${e}:${n}`}class xt{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:i,name:r}=this.auth;this.fullUserKey=es(this.userKey,i.apiKey,r),this.fullPersistenceKey=es("persistence",i.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ne._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new xt(Oe(go),e,s);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=i[0]||Oe(go);const o=es(s,e.config.apiKey,e.name);let a=null;for(const c of n)try{const d=await c._get(o);if(d){const u=Ne._fromJSON(e,d);c!==r&&(a=u),r=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new xt(r,e,s):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new xt(r,e,s))}}/**
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
 */function vo(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ya(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ka(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ja(e))return"Blackberry";if(Xa(e))return"Webos";if(qa(e))return"Safari";if((e.includes("chrome/")||za(e))&&!e.includes("edge/"))return"Chrome";if(Qa(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Ka(t=ae()){return/firefox\//i.test(t)}function qa(t=ae()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function za(t=ae()){return/crios\//i.test(t)}function Ya(t=ae()){return/iemobile/i.test(t)}function Qa(t=ae()){return/android/i.test(t)}function Ja(t=ae()){return/blackberry/i.test(t)}function Xa(t=ae()){return/webos/i.test(t)}function lr(t=ae()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function kh(t=ae()){var e;return lr(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Th(){return Ud()&&document.documentMode===10}function Za(t=ae()){return lr(t)||Qa(t)||Xa(t)||Ja(t)||/windows phone/i.test(t)||Ya(t)}/**
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
 */function el(t,e=[]){let n;switch(t){case"Browser":n=vo(ae());break;case"Worker":n=`${vo(ae())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${zt}/${s}`}/**
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
 */class Sh{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});s.onAbort=n,this.queue.push(s);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function Ah(t,e={}){return Yt(t,"GET","/v2/passwordPolicy",or(t,e))}/**
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
 */const Rh=6;class Ph{constructor(e){var n,s,i,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:Rh,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,s,i,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(s=l.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let i=0;i<e.length;i++)s=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class Nh{constructor(e,n,s,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new bo(this),this.idTokenSubscription=new bo(this),this.beforeStateQueue=new Sh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Fa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Oe(n)),this._initializationPromise=this.queue(async()=>{var s,i;if(!this._deleted&&(this.persistenceManager=await xt.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ha(this,{idToken:e}),s=await Ne._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Qe(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let i=s,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(i=l.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return I(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ds(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=hh()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(gt(this));const n=e?ie(e):null;return n&&I(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&I(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(gt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(gt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Oe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Ah(this),n=new Ph(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new xn("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await Ch(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Oe(e)||this._popupRedirectResolver;I(n,this,"argument-error"),this.redirectPersistenceManager=await xt.create(this,[Oe(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,i){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(I(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,s,i);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return I(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=el(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&ch(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function cr(t){return ie(t)}class bo{constructor(e){this.auth=e,this.observer=null,this.addObserver=Yd(n=>this.observer=n)}get next(){return I(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let dr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Oh(t){dr=t}function xh(t){return dr.loadJS(t)}function Mh(){return dr.gapiScript}function Dh(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Lh(t,e){const n=nr(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),r=n.getOptions();if(as(r,e??{}))return i;$e(i,"already-initialized")}return n.initialize({options:e})}function $h(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Oe);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function Fh(t,e,n){const s=cr(t);I(s._canInitEmulator,s,"emulator-config-failed"),I(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const i=!1,r=tl(e),{host:o,port:a}=Uh(e),l=a===null?"":`:${a}`;s.config.emulator={url:`${r}//${o}${l}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),Vh()}function tl(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Uh(t){const e=tl(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const r=i[1];return{host:r,port:yo(s.substr(r.length+1))}}else{const[r,o]=s.split(":");return{host:r,port:yo(o)}}}function yo(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Vh(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class nl{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Pe("not implemented")}_getIdTokenResponse(e){return Pe("not implemented")}_linkToIdToken(e,n){return Pe("not implemented")}_getReauthenticationResolver(e){return Pe("not implemented")}}/**
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
 */async function Mt(t,e){return mh(t,"POST","/v1/accounts:signInWithIdp",or(t,e))}/**
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
 */const Bh="http://localhost";class yt extends nl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new yt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):$e("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:i}=n,r=sr(n,["providerId","signInMethod"]);if(!s||!i)return null;const o=new yt(s,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Mt(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Mt(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Mt(e,n)}buildRequest(){const e={requestUri:Bh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=qt(n)}return e}}/**
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
 */class sl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Dn extends sl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Ke extends Dn{constructor(){super("facebook.com")}static credential(e){return yt._fromParams({providerId:Ke.PROVIDER_ID,signInMethod:Ke.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ke.credentialFromTaggedObject(e)}static credentialFromError(e){return Ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ke.credential(e.oauthAccessToken)}catch{return null}}}Ke.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ke.PROVIDER_ID="facebook.com";/**
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
 */class qe extends Dn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return yt._fromParams({providerId:qe.PROVIDER_ID,signInMethod:qe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return qe.credentialFromTaggedObject(e)}static credentialFromError(e){return qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return qe.credential(n,s)}catch{return null}}}qe.GOOGLE_SIGN_IN_METHOD="google.com";qe.PROVIDER_ID="google.com";/**
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
 */class ze extends Dn{constructor(){super("github.com")}static credential(e){return yt._fromParams({providerId:ze.PROVIDER_ID,signInMethod:ze.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ze.credentialFromTaggedObject(e)}static credentialFromError(e){return ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ze.credential(e.oauthAccessToken)}catch{return null}}}ze.GITHUB_SIGN_IN_METHOD="github.com";ze.PROVIDER_ID="github.com";/**
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
 */class Ye extends Dn{constructor(){super("twitter.com")}static credential(e,n){return yt._fromParams({providerId:Ye.PROVIDER_ID,signInMethod:Ye.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ye.credentialFromTaggedObject(e)}static credentialFromError(e){return Ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Ye.credential(n,s)}catch{return null}}}Ye.TWITTER_SIGN_IN_METHOD="twitter.com";Ye.PROVIDER_ID="twitter.com";/**
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
 */class Ft{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,i=!1){const r=await Ne._fromIdTokenResponse(e,s,i),o=wo(s);return new Ft({user:r,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const i=wo(s);return new Ft({user:e,providerId:i,_tokenResponse:s,operationType:n})}}function wo(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class us extends lt{constructor(e,n,s,i){var r;super(n.code,n.message),this.operationType=s,this.user=i,Object.setPrototypeOf(this,us.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,i){return new us(e,n,s,i)}}function il(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?us._fromErrorAndOperation(t,r,e,s):r})}async function Wh(t,e,n=!1){const s=await vn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ft._forOperation(t,"link",s)}/**
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
 */async function Hh(t,e,n=!1){const{auth:s}=t;if(Qe(s.app))return Promise.reject(gt(s));const i="reauthenticate";try{const r=await vn(t,il(s,i,e,t),n);I(r.idToken,s,"internal-error");const o=ar(r.idToken);I(o,s,"internal-error");const{sub:a}=o;return I(t.uid===a,s,"user-mismatch"),Ft._forOperation(t,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&$e(s,"user-mismatch"),r}}/**
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
 */async function jh(t,e,n=!1){if(Qe(t.app))return Promise.reject(gt(t));const s="signIn",i=await il(t,s,e),r=await Ft._fromIdTokenResponse(t,s,i);return n||await t._updateCurrentUser(r.user),r}function Gh(t,e,n,s){return ie(t).onIdTokenChanged(e,n,s)}function Kh(t,e,n){return ie(t).beforeAuthStateChanged(e,n)}function qh(t,e,n,s){return ie(t).onAuthStateChanged(e,n,s)}const hs="__sak";/**
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
 */class rl{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(hs,"1"),this.storage.removeItem(hs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const zh=1e3,Yh=10;class ol extends rl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Za(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),i=this.localCache[n];s!==i&&e(n,i,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const s=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},r=this.storage.getItem(s);Th()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Yh):i()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},zh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ol.type="LOCAL";const Qh=ol;/**
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
 */class al extends rl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}al.type="SESSION";const ll=al;/**
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
 */function Jh(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class $s{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const s=new $s(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:i,data:r}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:i});const a=Array.from(o).map(async c=>c(n.origin,r)),l=await Jh(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:i,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}$s.receivers=[];/**
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
 */function ur(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Xh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=ur("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},s);o={messageChannel:i,onMessage(u){const f=u;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(f.data.response);break;default:clearTimeout(d),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function ke(){return window}function Zh(t){ke().location.href=t}/**
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
 */function cl(){return typeof ke().WorkerGlobalScope<"u"&&typeof ke().importScripts=="function"}async function ef(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tf(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function nf(){return cl()?self:null}/**
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
 */const dl="firebaseLocalStorageDb",sf=1,fs="firebaseLocalStorage",ul="fbase_key";class Ln{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Fs(t,e){return t.transaction([fs],e?"readwrite":"readonly").objectStore(fs)}function rf(){const t=indexedDB.deleteDatabase(dl);return new Ln(t).toPromise()}function xi(){const t=indexedDB.open(dl,sf);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(fs,{keyPath:ul})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(fs)?e(s):(s.close(),await rf(),e(await xi()))})})}async function Io(t,e,n){const s=Fs(t,!0).put({[ul]:e,value:n});return new Ln(s).toPromise()}async function of(t,e){const n=Fs(t,!1).get(e),s=await new Ln(n).toPromise();return s===void 0?null:s.value}function Eo(t,e){const n=Fs(t,!0).delete(e);return new Ln(n).toPromise()}const af=800,lf=3;class hl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await xi(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>lf)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return cl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=$s._getInstance(nf()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await ef(),!this.activeServiceWorker)return;this.sender=new Xh(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||tf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await xi();return await Io(e,hs,"1"),await Eo(e,hs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Io(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>of(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Eo(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=Fs(i,!1).getAll();return new Ln(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:i,value:r}of e)s.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!s.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),af)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}hl.type="LOCAL";const cf=hl;new Mn(3e4,6e4);/**
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
 */function df(t,e){return e?Oe(e):(I(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class hr extends nl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Mt(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Mt(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Mt(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function uf(t){return jh(t.auth,new hr(t),t.bypassAuthState)}function hf(t){const{auth:e,user:n}=t;return I(n,e,"internal-error"),Hh(n,new hr(t),t.bypassAuthState)}async function ff(t){const{auth:e,user:n}=t;return I(n,e,"internal-error"),Wh(n,new hr(t),t.bypassAuthState)}/**
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
 */class fl{constructor(e,n,s,i,r=!1){this.auth=e,this.resolver=s,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:i,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:s,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uf;case"linkViaPopup":case"linkViaRedirect":return ff;case"reauthViaPopup":case"reauthViaRedirect":return hf;default:$e(this.auth,"internal-error")}}resolve(e){Fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const pf=new Mn(2e3,1e4);class Pt extends fl{constructor(e,n,s,i,r){super(e,n,i,r),this.provider=s,this.authWindow=null,this.pollId=null,Pt.currentPopupAction&&Pt.currentPopupAction.cancel(),Pt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return I(e,this.auth,"internal-error"),e}async onExecution(){Fe(this.filter.length===1,"Popup operations only handle one event");const e=ur();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ce(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ce(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Pt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ce(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,pf.get())};e()}}Pt.currentPopupAction=null;/**
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
 */const mf="pendingRedirect",ts=new Map;class _f extends fl{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=ts.get(this.auth._key());if(!e){try{const s=await gf(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}ts.set(this.auth._key(),e)}return this.bypassAuthState||ts.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function gf(t,e){const n=yf(e),s=bf(t);if(!await s._isAvailable())return!1;const i=await s._get(n)==="true";return await s._remove(n),i}function vf(t,e){ts.set(t._key(),e)}function bf(t){return Oe(t._redirectPersistence)}function yf(t){return es(mf,t.config.apiKey,t.name)}async function wf(t,e,n=!1){if(Qe(t.app))return Promise.reject(gt(t));const s=cr(t),i=df(s,e),o=await new _f(s,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
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
 */const If=10*60*1e3;class Ef{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Cf(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!pl(e)){const i=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(Ce(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=If&&this.cachedEventUids.clear(),this.cachedEventUids.has(Co(e))}saveEventToCache(e){this.cachedEventUids.add(Co(e)),this.lastProcessedEventTime=Date.now()}}function Co(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function pl({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Cf(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return pl(t);default:return!1}}/**
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
 */async function kf(t,e={}){return Yt(t,"GET","/v1/projects",e)}/**
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
 */const Tf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Sf=/^https?/;async function Af(t){if(t.config.emulator)return;const{authorizedDomains:e}=await kf(t);for(const n of e)try{if(Rf(n))return}catch{}$e(t,"unauthorized-domain")}function Rf(t){const e=Ni(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!Sf.test(n))return!1;if(Tf.test(t))return s===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}/**
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
 */const Pf=new Mn(3e4,6e4);function ko(){const t=ke().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Nf(t){return new Promise((e,n)=>{var s,i,r;function o(){ko(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ko(),n(Ce(t,"network-request-failed"))},timeout:Pf.get()})}if(!((i=(s=ke().gapi)===null||s===void 0?void 0:s.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((r=ke().gapi)===null||r===void 0)&&r.load)o();else{const a=Dh("iframefcb");return ke()[a]=()=>{gapi.load?o():n(Ce(t,"network-request-failed"))},xh(`${Mh()}?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw ns=null,e})}let ns=null;function Of(t){return ns=ns||Nf(t),ns}/**
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
 */const xf=new Mn(5e3,15e3),Mf="__/auth/iframe",Df="emulator/auth/iframe",Lf={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$f=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ff(t){const e=t.config;I(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?rr(e,Df):`https://${t.config.authDomain}/${Mf}`,s={apiKey:e.apiKey,appName:t.name,v:zt},i=$f.get(t.config.apiHost);i&&(s.eid=i);const r=t._getFrameworks();return r.length&&(s.fw=r.join(",")),`${n}?${qt(s).slice(1)}`}async function Uf(t){const e=await Of(t),n=ke().gapi;return I(n,t,"internal-error"),e.open({where:document.body,url:Ff(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Lf,dontclear:!0},s=>new Promise(async(i,r)=>{await s.restyle({setHideOnLeave:!1});const o=Ce(t,"network-request-failed"),a=ke().setTimeout(()=>{r(o)},xf.get());function l(){ke().clearTimeout(a),i(s)}s.ping(l).then(l,()=>{r(o)})}))}/**
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
 */const Vf={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bf=500,Wf=600,Hf="_blank",jf="http://localhost";class To{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Gf(t,e,n,s=Bf,i=Wf){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Vf),{width:s.toString(),height:i.toString(),top:r,left:o}),c=ae().toLowerCase();n&&(a=za(c)?Hf:n),Ka(c)&&(e=e||jf,l.scrollbars="yes");const d=Object.entries(l).reduce((f,[m,g])=>`${f}${m}=${g},`,"");if(kh(c)&&a!=="_self")return Kf(e||"",a),new To(null);const u=window.open(e||"",a,d);I(u,t,"popup-blocked");try{u.focus()}catch{}return new To(u)}function Kf(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const qf="__/auth/handler",zf="emulator/auth/handler",Yf=encodeURIComponent("fac");async function So(t,e,n,s,i,r){I(t.config.authDomain,t,"auth-domain-config-required"),I(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:zt,eventId:i};if(e instanceof sl){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",ki(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries({}))o[d]=u}if(e instanceof Dn){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await t._getAppCheckToken(),c=l?`#${Yf}=${encodeURIComponent(l)}`:"";return`${Qf(t)}?${qt(a).slice(1)}${c}`}function Qf({config:t}){return t.emulator?rr(t,zf):`https://${t.authDomain}/${qf}`}/**
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
 */const ci="webStorageSupport";class Jf{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ll,this._completeRedirectFn=wf,this._overrideRedirectResult=vf}async _openPopup(e,n,s,i){var r;Fe((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await So(e,n,s,Ni(),i);return Gf(e,o,ur())}async _openRedirect(e,n,s,i){await this._originValidation(e);const r=await So(e,n,s,Ni(),i);return Zh(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:r}=this.eventManagers[n];return i?Promise.resolve(i):(Fe(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await Uf(e),s=new Ef(e);return n.register("authEvent",i=>(I(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:s.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ci,{type:ci},i=>{var r;const o=(r=i==null?void 0:i[0])===null||r===void 0?void 0:r[ci];o!==void 0&&n(!!o),$e(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Af(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Za()||qa()||lr()}}const Xf=Jf;var Ao="@firebase/auth",Ro="1.7.9";/**
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
 */class Zf{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){I(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function ep(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function tp(t){$t(new bt("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;I(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:el(t)},c=new Nh(s,i,r,l);return $h(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),$t(new bt("auth-internal",e=>{const n=cr(e.getProvider("auth").getImmediate());return(s=>new Zf(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),et(Ao,Ro,ep(t)),et(Ao,Ro,"esm2017")}/**
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
 */const np=5*60,sp=Aa("authIdTokenMaxAge")||np;let Po=null;const ip=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>sp)return;const i=n==null?void 0:n.token;Po!==i&&(Po=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function rp(t=Ma()){const e=nr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Lh(t,{popupRedirectResolver:Xf,persistence:[cf,Qh,ll]}),s=Aa("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(s,location.origin);if(location.origin===r.origin){const o=ip(r.toString());Kh(n,o,()=>o(n.currentUser)),Gh(n,a=>o(a))}}const i=Ta("auth");return i&&Fh(n,`http://${i}`),n}function op(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Oh({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=i=>{const r=Ce("internal-error");r.customData=i,n(r)},s.type="text/javascript",s.charset="UTF-8",op().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});tp("Browser");var No={};const Oo="@firebase/database",xo="1.0.8";/**
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
 */let ml="";function ap(t){ml=t}/**
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
 */class lp{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Q(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:_n(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class cp{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return we(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const _l=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new lp(e)}}catch{}return new cp},_t=_l("localStorage"),dp=_l("sessionStorage");/**
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
 */const Dt=new er("@firebase/database"),gl=function(){let t=1;return function(){return t++}}(),vl=function(t){const e=Xd(t),n=new zd;n.update(e);const s=n.digest();return Ji.encodeByteArray(s)},$n=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=$n.apply(null,s):typeof s=="object"?e+=Q(s):e+=s,e+=" "}return e};let dn=null,Mo=!0;const up=function(t,e){_(!0,"Can't turn on custom loggers persistently."),Dt.logLevel=D.VERBOSE,dn=Dt.log.bind(Dt)},ee=function(...t){if(Mo===!0&&(Mo=!1,dn===null&&dp.get("logging_enabled")===!0&&up()),dn){const e=$n.apply(null,t);dn(e)}},Fn=function(t){return function(...e){ee(t,...e)}},Mi=function(...t){const e="FIREBASE INTERNAL ERROR: "+$n(...t);Dt.error(e)},Ue=function(...t){const e=`FIREBASE FATAL ERROR: ${$n(...t)}`;throw Dt.error(e),new Error(e)},oe=function(...t){const e="FIREBASE WARNING: "+$n(...t);Dt.warn(e)},hp=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&oe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},fr=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},fp=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},wt="[MIN_NAME]",it="[MAX_NAME]",Tt=function(t,e){if(t===e)return 0;if(t===wt||e===it)return-1;if(e===wt||t===it)return 1;{const n=Do(t),s=Do(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},pp=function(t,e){return t===e?0:t<e?-1:1},tn=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Q(e))},pr=function(t){if(typeof t!="object"||t===null)return Q(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=Q(e[s]),n+=":",n+=pr(t[e[s]]);return n+="}",n},bl=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function ne(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const yl=function(t){_(!fr(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,a,l;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let f=parseInt(d.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),u=u+f}return u.toLowerCase()},mp=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},_p=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function gp(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const vp=new RegExp("^-?(0*)\\d{1,10}$"),bp=-2147483648,yp=2147483647,Do=function(t){if(vp.test(t)){const e=Number(t);if(e>=bp&&e<=yp)return e}return null},Qt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw oe("Exception was thrown by user callback.",n),e},Math.floor(0))}},wp=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},un=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Ip{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){oe(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class Ep{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ee("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',oe(e)}}class ss{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ss.OWNER="owner";/**
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
 */const mr="5",wl="v",Il="s",El="r",Cl="f",kl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Tl="ls",Sl="p",Di="ac",Al="websocket",Rl="long_polling";/**
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
 */class Pl{constructor(e,n,s,i,r=!1,o="",a=!1,l=!1){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=_t.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&_t.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Cp(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Nl(t,e,n){_(typeof e=="string","typeof type must == string"),_(typeof n=="object","typeof params must == object");let s;if(e===Al)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Rl)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Cp(t)&&(n.ns=t.namespace);const i=[];return ne(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class kp{constructor(){this.counters_={}}incrementCounter(e,n=1){we(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Rd(this.counters_)}}/**
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
 */const di={},ui={};function _r(t){const e=t.toString();return di[e]||(di[e]=new kp),di[e]}function Tp(t,e){const n=t.toString();return ui[n]||(ui[n]=e()),ui[n]}/**
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
 */class Sp{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Qt(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Lo="start",Ap="close",Rp="pLPCommand",Pp="pRTLPCB",Ol="id",xl="pw",Ml="ser",Np="cb",Op="seg",xp="ts",Mp="d",Dp="dframe",Dl=1870,Ll=30,Lp=Dl-Ll,$p=25e3,Fp=3e4;class Nt{constructor(e,n,s,i,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Fn(e),this.stats_=_r(n),this.urlFn=l=>(this.appCheckToken&&(l[Di]=this.appCheckToken),Nl(n,Rl,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Sp(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Fp)),fp(()=>{if(this.isClosed_)return;this.scriptTagHolder=new gr((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Lo)this.id=a,this.password=l;else if(o===Ap)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Lo]="t",s[Ml]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Np]=this.scriptTagHolder.uniqueCallbackIdentifier),s[wl]=mr,this.transportSessionId&&(s[Il]=this.transportSessionId),this.lastSessionId&&(s[Tl]=this.lastSessionId),this.applicationId&&(s[Sl]=this.applicationId),this.appCheckToken&&(s[Di]=this.appCheckToken),typeof location<"u"&&location.hostname&&kl.test(location.hostname)&&(s[El]=Cl);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Nt.forceAllow_=!0}static forceDisallow(){Nt.forceDisallow_=!0}static isAvailable(){return Nt.forceAllow_?!0:!Nt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!mp()&&!_p()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Ca(n),i=bl(s,Lp);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[Dp]="t",s[Ol]=e,s[xl]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Q(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class gr{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=gl(),window[Rp+this.uniqueCallbackIdentifier]=e,window[Pp+this.uniqueCallbackIdentifier]=n,this.myIFrame=gr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){ee("frame writing exception"),a.stack&&ee(a.stack),ee(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ee("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ol]=this.myID,e[xl]=this.myPW,e[Ml]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ll+s.length<=Dl;){const o=this.pendingSegs.shift();s=s+"&"+Op+i+"="+o.seg+"&"+xp+i+"="+o.ts+"&"+Mp+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor($p)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{ee("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const Up=16384,Vp=45e3;let ps=null;typeof MozWebSocket<"u"?ps=MozWebSocket:typeof WebSocket<"u"&&(ps=WebSocket);class ge{constructor(e,n,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Fn(this.connId),this.stats_=_r(n),this.connURL=ge.connectionURL_(n,o,a,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[wl]=mr,typeof location<"u"&&location.hostname&&kl.test(location.hostname)&&(o[El]=Cl),n&&(o[Il]=n),s&&(o[Tl]=s),i&&(o[Di]=i),r&&(o[Sl]=r),Nl(e,Al,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,_t.set("previous_websocket_failure",!0);try{let s;Vd(),this.mySock=new ps(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){ge.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&ps!==null&&!ge.forceDisallow_}static previouslyFailed(){return _t.isInMemoryStorage||_t.get("previous_websocket_failure")===!0}markConnectionHealthy(){_t.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=_n(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=Q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=bl(n,Up);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Vp))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ge.responsesRequiredToBeHealthy=2;ge.healthyTimeout=3e4;/**
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
 */class bn{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Nt,ge]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=ge&&ge.isAvailable();let s=n&&!ge.previouslyFailed();if(e.webSocketOnly&&(n||oe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[ge];else{const i=this.transports_=[];for(const r of bn.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);bn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}bn.globalTransportInitialized_=!1;/**
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
 */const Bp=6e4,Wp=5e3,Hp=10*1024,jp=100*1024,hi="t",$o="d",Gp="s",Fo="r",Kp="e",Uo="o",Vo="a",Bo="n",Wo="p",qp="h";class zp{constructor(e,n,s,i,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Fn("c:"+this.id+":"),this.transportManager_=new bn(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=un(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>jp?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Hp?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(hi in e){const n=e[hi];n===Vo?this.upgradeIfSecondaryHealthy_():n===Fo?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Uo&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=tn("t",e),s=tn("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Wo,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Vo,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Bo,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=tn("t",e),s=tn("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=tn(hi,e);if($o in e){const s=e[$o];if(n===qp){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Bo){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Gp?this.onConnectionShutdown_(s):n===Fo?this.onReset_(s):n===Kp?Mi("Server Error: "+s):n===Uo?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Mi("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),mr!==s&&oe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),un(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Bp))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):un(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Wp))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Wo,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(_t.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class $l{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class Fl{constructor(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){_(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class ms extends Fl{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Zi()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ms}getInitialEvent(e){return _(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Ho=32,jo=768;class ${constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function O(){return new $("")}function k(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function rt(t){return t.pieces_.length-t.pieceNum_}function V(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new $(t.pieces_,e)}function vr(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Yp(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function yn(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Ul(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new $(e,0)}function q(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof $)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new $(n,0)}function A(t){return t.pieceNum_>=t.pieces_.length}function re(t,e){const n=k(t),s=k(e);if(n===null)return e;if(n===s)return re(V(t),V(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Qp(t,e){const n=yn(t,0),s=yn(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=Tt(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function br(t,e){if(rt(t)!==rt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function pe(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(rt(t)>rt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class Jp{constructor(e,n){this.errorPrefix_=n,this.parts_=yn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Ls(this.parts_[s]);Vl(this)}}function Xp(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Ls(e),Vl(t)}function Zp(t){const e=t.parts_.pop();t.byteLength_-=Ls(e),t.parts_.length>0&&(t.byteLength_-=1)}function Vl(t){if(t.byteLength_>jo)throw new Error(t.errorPrefix_+"has a key path longer than "+jo+" bytes ("+t.byteLength_+").");if(t.parts_.length>Ho)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Ho+") or object contains a cycle "+pt(t))}function pt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class yr extends Fl{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}static getInstance(){return new yr}getInitialEvent(e){return _(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const nn=1e3,em=60*5*1e3,Go=30*1e3,tm=1.3,nm=3e4,sm="server_kill",Ko=3;class Me extends $l{constructor(e,n,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Me.nextPersistentConnectionId_++,this.log_=Fn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=nn,this.maxReconnectDelay_=em,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");yr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ms.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(Q(r)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new Kt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Me.warnOnListenWarnings_(l,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&we(e,"w")){const s=vt(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();oe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||qd(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Go)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Kd(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Q(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Mi("Unrecognized action received from server: "+Q(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=nn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=nn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>nm&&(this.reconnectDelay_=nn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*tm)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Me.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){_(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,f]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?ee("getToken() completed but was canceled"):(ee("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=f&&f.token,a=new zp(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,m=>{oe(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(sm)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&oe(u),l())}}}interrupt(e){ee("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ee("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ki(this.interruptReasons_)&&(this.reconnectDelay_=nn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>pr(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new $(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){ee("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ko&&(this.reconnectDelay_=Go,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ee("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ko&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+ml.replace(/\./g,"-")]=1,Zi()?e["framework.cordova"]=1:Ra()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ms.getInstance().currentlyOnline();return ki(this.interruptReasons_)&&e}}Me.nextPersistentConnectionId_=0;Me.nextConnectionId_=0;/**
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
 */class T{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new T(e,n)}}/**
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
 */class Us{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new T(wt,e),i=new T(wt,n);return this.compare(s,i)!==0}minPost(){return T.MIN}}/**
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
 */let Yn;class Bl extends Us{static get __EMPTY_NODE(){return Yn}static set __EMPTY_NODE(e){Yn=e}compare(e,n){return Tt(e.name,n.name)}isDefinedOn(e){throw Gt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return T.MIN}maxPost(){return new T(it,Yn)}makePost(e,n){return _(typeof e=="string","KeyIndex indexValue must always be a string."),new T(e,Yn)}toString(){return".key"}}const tt=new Bl;/**
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
 */class Qn{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class X{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??X.RED,this.left=i??de.EMPTY_NODE,this.right=r??de.EMPTY_NODE}copy(e,n,s,i,r){return new X(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return de.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return de.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,X.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,X.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}X.RED=!0;X.BLACK=!1;class im{copy(e,n,s,i,r){return this}insert(e,n,s){return new X(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class de{constructor(e,n=de.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new de(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,X.BLACK,null,null))}remove(e){return new de(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,X.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Qn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Qn(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Qn(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Qn(this.root_,null,this.comparator_,!0,e)}}de.EMPTY_NODE=new im;/**
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
 */function rm(t,e){return Tt(t.name,e.name)}function wr(t,e){return Tt(t,e)}/**
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
 */let Li;function om(t){Li=t}const Wl=function(t){return typeof t=="number"?"number:"+yl(t):"string:"+t},Hl=function(t){if(t.isLeafNode()){const e=t.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&we(e,".sv"),"Priority must be a string or number.")}else _(t===Li||t.isEmpty(),"priority of unexpected type.");_(t===Li||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let qo;class J{constructor(e,n=J.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Hl(this.priorityNode_)}static set __childrenNodeConstructor(e){qo=e}static get __childrenNodeConstructor(){return qo}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new J(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:J.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return A(e)?this:k(e)===".priority"?this.priorityNode_:J.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:J.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=k(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(_(s!==".priority"||rt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,J.__childrenNodeConstructor.EMPTY_NODE.updateChild(V(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Wl(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=yl(this.value_):e+=this.value_,this.lazyHash_=vl(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===J.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof J.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=J.VALUE_TYPE_ORDER.indexOf(n),r=J.VALUE_TYPE_ORDER.indexOf(s);return _(i>=0,"Unknown leaf type: "+n),_(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}J.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let jl,Gl;function am(t){jl=t}function lm(t){Gl=t}class cm extends Us{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?Tt(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return T.MIN}maxPost(){return new T(it,new J("[PRIORITY-POST]",Gl))}makePost(e,n){const s=jl(e);return new T(n,new J("[PRIORITY-POST]",s))}toString(){return".priority"}}const H=new cm;/**
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
 */const dm=Math.log(2);class um{constructor(e){const n=r=>parseInt(Math.log(r)/dm,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const _s=function(t,e,n,s){t.sort(e);const i=function(l,c){const d=c-l;let u,f;if(d===0)return null;if(d===1)return u=t[l],f=n?n(u):u,new X(f,u.node,X.BLACK,null,null);{const m=parseInt(d/2,10)+l,g=i(l,m),y=i(m+1,c);return u=t[m],f=n?n(u):u,new X(f,u.node,X.BLACK,g,y)}},r=function(l){let c=null,d=null,u=t.length;const f=function(g,y){const b=u-g,Z=u;u-=g;const Ae=i(b+1,Z),j=t[b],He=n?n(j):j;m(new X(He,j.node,y,null,Ae))},m=function(g){c?(c.left=g,c=g):(d=g,c=g)};for(let g=0;g<l.count;++g){const y=l.nextBitIsOne(),b=Math.pow(2,l.count-(g+1));y?f(b,X.BLACK):(f(b,X.BLACK),f(b,X.RED))}return d},o=new um(t.length),a=r(o);return new de(s||e,a)};/**
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
 */let fi;const Rt={};class xe{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return _(Rt&&H,"ChildrenNode.ts has not been loaded"),fi=fi||new xe({".priority":Rt},{".priority":H}),fi}get(e){const n=vt(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof de?n:null}hasIndex(e){return we(this.indexSet_,e.toString())}addIndex(e,n){_(e!==tt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(T.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=_s(s,e.getCompare()):a=Rt;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const d=Object.assign({},this.indexes_);return d[l]=a,new xe(d,c)}addToIndexes(e,n){const s=os(this.indexes_,(i,r)=>{const o=vt(this.indexSet_,r);if(_(o,"Missing index implementation for "+r),i===Rt)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(T.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),_s(a,o.getCompare())}else return Rt;else{const a=n.get(e.name);let l=i;return a&&(l=l.remove(new T(e.name,a))),l.insert(e,e.node)}});return new xe(s,this.indexSet_)}removeFromIndexes(e,n){const s=os(this.indexes_,i=>{if(i===Rt)return i;{const r=n.get(e.name);return r?i.remove(new T(e.name,r)):i}});return new xe(s,this.indexSet_)}}/**
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
 */let sn;class w{constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Hl(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return sn||(sn=new w(new de(wr),null,xe.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||sn}updatePriority(e){return this.children_.isEmpty()?this:new w(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?sn:n}}getChild(e){const n=k(e);return n===null?this:this.getImmediateChild(n).getChild(V(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(_(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new T(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?sn:this.priorityNode_;return new w(i,o,r)}}updateChild(e,n){const s=k(e);if(s===null)return n;{_(k(e)!==".priority"||rt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(V(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(H,(o,a)=>{n[o]=a.val(e),s++,r&&w.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Wl(this.getPriority().val())+":"),this.forEachChild(H,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":vl(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new T(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new T(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new T(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,T.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,T.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Un?-1:0}withIndex(e){if(e===tt||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new w(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===tt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(H),i=n.getIterator(H);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===tt?null:this.indexMap_.get(e.toString())}}w.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class hm extends w{constructor(){super(new de(wr),w.EMPTY_NODE,xe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return w.EMPTY_NODE}isEmpty(){return!1}}const Un=new hm;Object.defineProperties(T,{MIN:{value:new T(wt,w.EMPTY_NODE)},MAX:{value:new T(it,Un)}});Bl.__EMPTY_NODE=w.EMPTY_NODE;J.__childrenNodeConstructor=w;om(Un);lm(Un);/**
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
 */const fm=!0;function Y(t,e=null){if(t===null)return w.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new J(n,Y(e))}if(!(t instanceof Array)&&fm){const n=[];let s=!1;if(ne(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=Y(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),n.push(new T(o,l)))}}),n.length===0)return w.EMPTY_NODE;const r=_s(n,rm,o=>o.name,wr);if(s){const o=_s(n,H.getCompare());return new w(r,Y(e),new xe({".priority":o},{".priority":H}))}else return new w(r,Y(e),xe.Default)}else{let n=w.EMPTY_NODE;return ne(t,(s,i)=>{if(we(t,s)&&s.substring(0,1)!=="."){const r=Y(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(Y(e))}}am(Y);/**
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
 */class Kl extends Us{constructor(e){super(),this.indexPath_=e,_(!A(e)&&k(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?Tt(e.name,n.name):r}makePost(e,n){const s=Y(e),i=w.EMPTY_NODE.updateChild(this.indexPath_,s);return new T(n,i)}maxPost(){const e=w.EMPTY_NODE.updateChild(this.indexPath_,Un);return new T(it,e)}toString(){return yn(this.indexPath_,0).join("/")}}/**
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
 */class pm extends Us{compare(e,n){const s=e.node.compareTo(n.node);return s===0?Tt(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return T.MIN}maxPost(){return T.MAX}makePost(e,n){const s=Y(e);return new T(n,s)}toString(){return".value"}}const ql=new pm;/**
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
 */function zl(t){return{type:"value",snapshotNode:t}}function Ut(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function wn(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function In(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function mm(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class Ir{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(wn(n,a)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Ut(n,s)):o.trackChildChange(In(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(H,(i,r)=>{n.hasChild(i)||s.trackChildChange(wn(i,r))}),n.isLeafNode()||n.forEachChild(H,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(In(i,r,o))}else s.trackChildChange(Ut(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class En{constructor(e){this.indexedFilter_=new Ir(e.getIndex()),this.index_=e.getIndex(),this.startPost_=En.getStartPost_(e),this.endPost_=En.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new T(n,s))||(s=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=w.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(w.EMPTY_NODE);const r=this;return n.forEachChild(H,(o,a)=>{r.matches(new T(o,a))||(i=i.updateImmediateChild(o,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class _m{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new En(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new T(n,s))||(s=w.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=w.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(w.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(f,m)=>u(m,f)}else o=this.index_.getCompare();const a=e;_(a.numChildren()===this.limit_,"");const l=new T(n,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const u=a.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const m=f==null?1:o(f,l);if(d&&!s.isEmpty()&&m>=0)return r!=null&&r.trackChildChange(In(n,s,u)),a.updateImmediateChild(n,s);{r!=null&&r.trackChildChange(wn(n,u));const y=a.updateImmediateChild(n,w.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r!=null&&r.trackChildChange(Ut(f.name,f.node)),y.updateImmediateChild(f.name,f.node)):y}}else return s.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(wn(c.name,c.node)),r.trackChildChange(Ut(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(c.name,w.EMPTY_NODE)):e}}/**
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
 */class Er{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=H}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:wt}hasEnd(){return this.endSet_}getIndexEndValue(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:it}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===H}copy(){const e=new Er;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function gm(t){return t.loadsAllData()?new Ir(t.getIndex()):t.hasLimit()?new _m(t):new En(t)}function vm(t,e){const n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="r",n}function bm(t,e){const n=t.copy();return n.index_=e,n}function zo(t){const e={};if(t.isDefault())return e;let n;if(t.index_===H?n="$priority":t.index_===ql?n="$value":t.index_===tt?n="$key":(_(t.index_ instanceof Kl,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Q(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=Q(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+Q(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=Q(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+Q(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Yo(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==H&&(e.i=t.index_.toString()),e}/**
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
 */class gs extends $l{constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Fn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(_(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=gs.getListenId_(e,s),a={};this.listens_[o]=a;const l=zo(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),vt(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const s=gs.getListenId_(e,n);delete this.listens_[s]}get(e){const n=zo(e._queryParams),s=e._path.toString(),i=new Kt;return this.restRequest_(s+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+qt(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=_n(a.responseText)}catch{oe("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&oe("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class ym{constructor(){this.rootNode_=w.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function vs(){return{value:null,children:new Map}}function Yl(t,e,n){if(A(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=k(e);t.children.has(s)||t.children.set(s,vs());const i=t.children.get(s);e=V(e),Yl(i,e,n)}}function $i(t,e,n){t.value!==null?n(e,t.value):wm(t,(s,i)=>{const r=new $(e.toString()+"/"+s);$i(i,r,n)})}function wm(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
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
 */class Im{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&ne(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
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
 */const Qo=10*1e3,Em=30*1e3,Cm=5*60*1e3;class km{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Im(e);const s=Qo+(Em-Qo)*Math.random();un(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;ne(e,(i,r)=>{r>0&&we(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),un(this.reportStats_.bind(this),Math.floor(Math.random()*2*Cm))}}/**
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
 */var ve;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ve||(ve={}));function Cr(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function kr(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Tr(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class bs{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=ve.ACK_USER_WRITE,this.source=Cr()}operationForChild(e){if(A(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new $(e));return new bs(O(),n,this.revert)}}else return _(k(this.path)===e,"operationForChild called for unrelated child."),new bs(V(this.path),this.affectedTree,this.revert)}}/**
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
 */class Cn{constructor(e,n){this.source=e,this.path=n,this.type=ve.LISTEN_COMPLETE}operationForChild(e){return A(this.path)?new Cn(this.source,O()):new Cn(this.source,V(this.path))}}/**
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
 */class It{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=ve.OVERWRITE}operationForChild(e){return A(this.path)?new It(this.source,O(),this.snap.getImmediateChild(e)):new It(this.source,V(this.path),this.snap)}}/**
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
 */class Vt{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=ve.MERGE}operationForChild(e){if(A(this.path)){const n=this.children.subtree(new $(e));return n.isEmpty()?null:n.value?new It(this.source,O(),n.value):new Vt(this.source,O(),n)}else return _(k(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Vt(this.source,V(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class ot{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(A(e))return this.isFullyInitialized()&&!this.filtered_;const n=k(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class Tm{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Sm(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(mm(o.childName,o.snapshotNode))}),rn(t,i,"child_removed",e,s,n),rn(t,i,"child_added",e,s,n),rn(t,i,"child_moved",r,s,n),rn(t,i,"child_changed",e,s,n),rn(t,i,"value",e,s,n),i}function rn(t,e,n,s,i,r){const o=s.filter(a=>a.type===n);o.sort((a,l)=>Rm(t,a,l)),o.forEach(a=>{const l=Am(t,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Am(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Rm(t,e,n){if(e.childName==null||n.childName==null)throw Gt("Should only compare child_ events.");const s=new T(e.childName,e.snapshotNode),i=new T(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
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
 */function Vs(t,e){return{eventCache:t,serverCache:e}}function hn(t,e,n,s){return Vs(new ot(e,n,s),t.serverCache)}function Ql(t,e,n,s){return Vs(t.eventCache,new ot(e,n,s))}function ys(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Et(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let pi;const Pm=()=>(pi||(pi=new de(pp)),pi);class U{constructor(e,n=Pm()){this.value=e,this.children=n}static fromObject(e){let n=new U(null);return ne(e,(s,i)=>{n=n.set(new $(s),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:O(),value:this.value};if(A(e))return null;{const s=k(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(V(e),n);return r!=null?{path:q(new $(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(A(e))return this;{const n=k(e),s=this.children.get(n);return s!==null?s.subtree(V(e)):new U(null)}}set(e,n){if(A(e))return new U(n,this.children);{const s=k(e),r=(this.children.get(s)||new U(null)).set(V(e),n),o=this.children.insert(s,r);return new U(this.value,o)}}remove(e){if(A(e))return this.children.isEmpty()?new U(null):new U(null,this.children);{const n=k(e),s=this.children.get(n);if(s){const i=s.remove(V(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new U(null):new U(this.value,r)}else return this}}get(e){if(A(e))return this.value;{const n=k(e),s=this.children.get(n);return s?s.get(V(e)):null}}setTree(e,n){if(A(e))return n;{const s=k(e),r=(this.children.get(s)||new U(null)).setTree(V(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new U(this.value,o)}}fold(e){return this.fold_(O(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(q(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,O(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(A(e))return null;{const r=k(e),o=this.children.get(r);return o?o.findOnPath_(V(e),q(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,O(),n)}foreachOnPath_(e,n,s){if(A(e))return this;{this.value&&s(n,this.value);const i=k(e),r=this.children.get(i);return r?r.foreachOnPath_(V(e),q(n,i),s):new U(null)}}foreach(e){this.foreach_(O(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(q(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
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
 */class be{constructor(e){this.writeTree_=e}static empty(){return new be(new U(null))}}function fn(t,e,n){if(A(e))return new be(new U(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=re(i,e);return r=r.updateChild(o,n),new be(t.writeTree_.set(i,r))}else{const i=new U(n),r=t.writeTree_.setTree(e,i);return new be(r)}}}function Fi(t,e,n){let s=t;return ne(n,(i,r)=>{s=fn(s,q(e,i),r)}),s}function Jo(t,e){if(A(e))return be.empty();{const n=t.writeTree_.setTree(e,new U(null));return new be(n)}}function Ui(t,e){return St(t,e)!=null}function St(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(re(n.path,e)):null}function Xo(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(H,(s,i)=>{e.push(new T(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new T(s,i.value))}),e}function nt(t,e){if(A(e))return t;{const n=St(t,e);return n!=null?new be(new U(n)):new be(t.writeTree_.subtree(e))}}function Vi(t){return t.writeTree_.isEmpty()}function Bt(t,e){return Jl(O(),t.writeTree_,e)}function Jl(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(_(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=Jl(q(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(q(t,".priority"),s)),n}}/**
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
 */function Bs(t,e){return tc(e,t)}function Nm(t,e,n,s,i){_(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=fn(t.visibleWrites,e,n)),t.lastWriteId=s}function Om(t,e,n,s){_(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Fi(t.visibleWrites,e,n),t.lastWriteId=s}function xm(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function Mm(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);_(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Dm(a,s.path)?i=!1:pe(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return Lm(t),!0;if(s.snap)t.visibleWrites=Jo(t.visibleWrites,s.path);else{const a=s.children;ne(a,l=>{t.visibleWrites=Jo(t.visibleWrites,q(s.path,l))})}return!0}else return!1}function Dm(t,e){if(t.snap)return pe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&pe(q(t.path,n),e))return!0;return!1}function Lm(t){t.visibleWrites=Xl(t.allWrites,$m,O()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function $m(t){return t.visible}function Xl(t,e,n){let s=be.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let a;if(r.snap)pe(n,o)?(a=re(n,o),s=fn(s,a,r.snap)):pe(o,n)&&(a=re(o,n),s=fn(s,O(),r.snap.getChild(a)));else if(r.children){if(pe(n,o))a=re(n,o),s=Fi(s,a,r.children);else if(pe(o,n))if(a=re(o,n),A(a))s=Fi(s,O(),r.children);else{const l=vt(r.children,k(a));if(l){const c=l.getChild(V(a));s=fn(s,O(),c)}}}else throw Gt("WriteRecord should have .snap or .children")}}return s}function Zl(t,e,n,s,i){if(!s&&!i){const r=St(t.visibleWrites,e);if(r!=null)return r;{const o=nt(t.visibleWrites,e);if(Vi(o))return n;if(n==null&&!Ui(o,O()))return null;{const a=n||w.EMPTY_NODE;return Bt(o,a)}}}else{const r=nt(t.visibleWrites,e);if(!i&&Vi(r))return n;if(!i&&n==null&&!Ui(r,O()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(pe(c.path,e)||pe(e,c.path))},a=Xl(t.allWrites,o,e),l=n||w.EMPTY_NODE;return Bt(a,l)}}}function Fm(t,e,n){let s=w.EMPTY_NODE;const i=St(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(H,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=nt(t.visibleWrites,e);return n.forEachChild(H,(o,a)=>{const l=Bt(nt(r,new $(o)),a);s=s.updateImmediateChild(o,l)}),Xo(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=nt(t.visibleWrites,e);return Xo(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Um(t,e,n,s,i){_(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=q(e,n);if(Ui(t.visibleWrites,r))return null;{const o=nt(t.visibleWrites,r);return Vi(o)?i.getChild(n):Bt(o,i.getChild(n))}}function Vm(t,e,n,s){const i=q(e,n),r=St(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=nt(t.visibleWrites,i);return Bt(o,s.getNode().getImmediateChild(n))}else return null}function Bm(t,e){return St(t.visibleWrites,e)}function Wm(t,e,n,s,i,r,o){let a;const l=nt(t.visibleWrites,e),c=St(l,O());if(c!=null)a=c;else if(n!=null)a=Bt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),f=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let m=f.getNext();for(;m&&d.length<i;)u(m,s)!==0&&d.push(m),m=f.getNext();return d}else return[]}function Hm(){return{visibleWrites:be.empty(),allWrites:[],lastWriteId:-1}}function ws(t,e,n,s){return Zl(t.writeTree,t.treePath,e,n,s)}function Sr(t,e){return Fm(t.writeTree,t.treePath,e)}function Zo(t,e,n,s){return Um(t.writeTree,t.treePath,e,n,s)}function Is(t,e){return Bm(t.writeTree,q(t.treePath,e))}function jm(t,e,n,s,i,r){return Wm(t.writeTree,t.treePath,e,n,s,i,r)}function Ar(t,e,n){return Vm(t.writeTree,t.treePath,e,n)}function ec(t,e){return tc(q(t.treePath,e),t.writeTree)}function tc(t,e){return{treePath:t,writeTree:e}}/**
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
 */class Gm{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;_(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),_(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,In(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,wn(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Ut(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,In(s,e.snapshotNode,i.oldSnap));else throw Gt("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Km{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const nc=new Km;class Rr{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new ot(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ar(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Et(this.viewCache_),r=jm(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function qm(t){return{filter:t}}function zm(t,e){_(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Ym(t,e,n,s,i){const r=new Gm;let o,a;if(n.type===ve.OVERWRITE){const c=n;c.source.fromUser?o=Bi(t,e,c.path,c.snap,s,i,r):(_(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!A(c.path),o=Es(t,e,c.path,c.snap,s,i,a,r))}else if(n.type===ve.MERGE){const c=n;c.source.fromUser?o=Jm(t,e,c.path,c.children,s,i,r):(_(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Wi(t,e,c.path,c.children,s,i,a,r))}else if(n.type===ve.ACK_USER_WRITE){const c=n;c.revert?o=e_(t,e,c.path,s,i,r):o=Xm(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===ve.LISTEN_COMPLETE)o=Zm(t,e,n.path,s,r);else throw Gt("Unknown operation type: "+n.type);const l=r.getChanges();return Qm(e,o,l),{viewCache:o,changes:l}}function Qm(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=ys(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(zl(ys(e)))}}function sc(t,e,n,s,i,r){const o=e.eventCache;if(Is(s,n)!=null)return e;{let a,l;if(A(n))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Et(e),d=c instanceof w?c:w.EMPTY_NODE,u=Sr(s,d);a=t.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=ws(s,Et(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=k(n);if(c===".priority"){_(rt(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=Zo(s,n,d,l);u!=null?a=t.filter.updatePriority(d,u):a=o.getNode()}else{const d=V(n);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=Zo(s,n,o.getNode(),l);f!=null?u=o.getNode().getImmediateChild(c).updateChild(d,f):u=o.getNode().getImmediateChild(c)}else u=Ar(s,c,e.serverCache);u!=null?a=t.filter.updateChild(o.getNode(),c,u,d,i,r):a=o.getNode()}}return hn(e,a,o.isFullyInitialized()||A(n),t.filter.filtersNodes())}}function Es(t,e,n,s,i,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(A(n))c=d.updateFullNode(l.getNode(),s,null);else if(d.filtersNodes()&&!l.isFiltered()){const m=l.getNode().updateChild(n,s);c=d.updateFullNode(l.getNode(),m,null)}else{const m=k(n);if(!l.isCompleteForPath(n)&&rt(n)>1)return e;const g=V(n),b=l.getNode().getImmediateChild(m).updateChild(g,s);m===".priority"?c=d.updatePriority(l.getNode(),b):c=d.updateChild(l.getNode(),m,b,g,nc,null)}const u=Ql(e,c,l.isFullyInitialized()||A(n),d.filtersNodes()),f=new Rr(i,u,r);return sc(t,u,n,i,f,a)}function Bi(t,e,n,s,i,r,o){const a=e.eventCache;let l,c;const d=new Rr(i,e,r);if(A(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),l=hn(e,c,!0,t.filter.filtersNodes());else{const u=k(n);if(u===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),l=hn(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=V(n),m=a.getNode().getImmediateChild(u);let g;if(A(f))g=s;else{const y=d.getCompleteChild(u);y!=null?vr(f)===".priority"&&y.getChild(Ul(f)).isEmpty()?g=y:g=y.updateChild(f,s):g=w.EMPTY_NODE}if(m.equals(g))l=e;else{const y=t.filter.updateChild(a.getNode(),u,g,f,d,o);l=hn(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function ea(t,e){return t.eventCache.isCompleteForChild(e)}function Jm(t,e,n,s,i,r,o){let a=e;return s.foreach((l,c)=>{const d=q(n,l);ea(e,k(d))&&(a=Bi(t,a,d,c,i,r,o))}),s.foreach((l,c)=>{const d=q(n,l);ea(e,k(d))||(a=Bi(t,a,d,c,i,r,o))}),a}function ta(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Wi(t,e,n,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;A(n)?c=s:c=new U(null).setTree(n,s);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,f)=>{if(d.hasChild(u)){const m=e.serverCache.getNode().getImmediateChild(u),g=ta(t,m,f);l=Es(t,l,new $(u),g,i,r,o,a)}}),c.children.inorderTraversal((u,f)=>{const m=!e.serverCache.isCompleteForChild(u)&&f.value===null;if(!d.hasChild(u)&&!m){const g=e.serverCache.getNode().getImmediateChild(u),y=ta(t,g,f);l=Es(t,l,new $(u),y,i,r,o,a)}}),l}function Xm(t,e,n,s,i,r,o){if(Is(i,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(A(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Es(t,e,n,l.getNode().getChild(n),i,r,a,o);if(A(n)){let c=new U(null);return l.getNode().forEachChild(tt,(d,u)=>{c=c.set(new $(d),u)}),Wi(t,e,n,c,i,r,a,o)}else return e}else{let c=new U(null);return s.foreach((d,u)=>{const f=q(n,d);l.isCompleteForPath(f)&&(c=c.set(d,l.getNode().getChild(f)))}),Wi(t,e,n,c,i,r,a,o)}}function Zm(t,e,n,s,i){const r=e.serverCache,o=Ql(e,r.getNode(),r.isFullyInitialized()||A(n),r.isFiltered());return sc(t,o,n,s,nc,i)}function e_(t,e,n,s,i,r){let o;if(Is(s,n)!=null)return e;{const a=new Rr(s,e,i),l=e.eventCache.getNode();let c;if(A(n)||k(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=ws(s,Et(e));else{const u=e.serverCache.getNode();_(u instanceof w,"serverChildren would be complete if leaf node"),d=Sr(s,u)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=k(n);let u=Ar(s,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=t.filter.updateChild(l,d,u,V(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,w.EMPTY_NODE,V(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=ws(s,Et(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Is(s,O())!=null,hn(e,c,o,t.filter.filtersNodes())}}/**
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
 */class t_{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Ir(s.getIndex()),r=gm(s);this.processor_=qm(r);const o=n.serverCache,a=n.eventCache,l=i.updateFullNode(w.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(w.EMPTY_NODE,a.getNode(),null),d=new ot(l,o.isFullyInitialized(),i.filtersNodes()),u=new ot(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Vs(u,d),this.eventGenerator_=new Tm(this.query_)}get query(){return this.query_}}function n_(t){return t.viewCache_.serverCache.getNode()}function s_(t){return ys(t.viewCache_)}function i_(t,e){const n=Et(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!A(e)&&!n.getImmediateChild(k(e)).isEmpty())?n.getChild(e):null}function na(t){return t.eventRegistrations_.length===0}function r_(t,e){t.eventRegistrations_.push(e)}function sa(t,e,n){const s=[];if(n){_(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function ia(t,e,n,s){e.type===ve.MERGE&&e.source.queryId!==null&&(_(Et(t.viewCache_),"We should always have a full cache before handling merges"),_(ys(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=Ym(t.processor_,i,e,n,s);return zm(t.processor_,r.viewCache),_(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,ic(t,r.changes,r.viewCache.eventCache.getNode(),null)}function o_(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(H,(r,o)=>{s.push(Ut(r,o))}),n.isFullyInitialized()&&s.push(zl(n.getNode())),ic(t,s,n.getNode(),e)}function ic(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return Sm(t.eventGenerator_,e,n,i)}/**
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
 */let Cs;class rc{constructor(){this.views=new Map}}function a_(t){_(!Cs,"__referenceConstructor has already been defined"),Cs=t}function l_(){return _(Cs,"Reference.ts has not been loaded"),Cs}function c_(t){return t.views.size===0}function Pr(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return _(r!=null,"SyncTree gave us an op for an invalid query."),ia(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(ia(o,e,n,s));return r}}function oc(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=ws(n,i?s:null),l=!1;a?l=!0:s instanceof w?(a=Sr(n,s),l=!1):(a=w.EMPTY_NODE,l=!1);const c=Vs(new ot(a,l,!1),new ot(s,i,!1));return new t_(e,c)}return o}function d_(t,e,n,s,i,r){const o=oc(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),r_(o,n),o_(o,n)}function u_(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const a=at(t);if(i==="default")for(const[l,c]of t.views.entries())o=o.concat(sa(c,n,s)),na(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(i);l&&(o=o.concat(sa(l,n,s)),na(l)&&(t.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!at(t)&&r.push(new(l_())(e._repo,e._path)),{removed:r,events:o}}function ac(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function st(t,e){let n=null;for(const s of t.views.values())n=n||i_(s,e);return n}function lc(t,e){if(e._queryParams.loadsAllData())return Ws(t);{const s=e._queryIdentifier;return t.views.get(s)}}function cc(t,e){return lc(t,e)!=null}function at(t){return Ws(t)!=null}function Ws(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let ks;function h_(t){_(!ks,"__referenceConstructor has already been defined"),ks=t}function f_(){return _(ks,"Reference.ts has not been loaded"),ks}let p_=1;class ra{constructor(e){this.listenProvider_=e,this.syncPointTree_=new U(null),this.pendingWriteTree_=Hm(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Nr(t,e,n,s,i){return Nm(t.pendingWriteTree_,e,n,s,i),i?Jt(t,new It(Cr(),e,n)):[]}function m_(t,e,n,s){Om(t.pendingWriteTree_,e,n,s);const i=U.fromObject(n);return Jt(t,new Vt(Cr(),e,i))}function Je(t,e,n=!1){const s=xm(t.pendingWriteTree_,e);if(Mm(t.pendingWriteTree_,e)){let r=new U(null);return s.snap!=null?r=r.set(O(),!0):ne(s.children,o=>{r=r.set(new $(o),!0)}),Jt(t,new bs(s.path,r,n))}else return[]}function Vn(t,e,n){return Jt(t,new It(kr(),e,n))}function __(t,e,n){const s=U.fromObject(n);return Jt(t,new Vt(kr(),e,s))}function g_(t,e){return Jt(t,new Cn(kr(),e))}function v_(t,e,n){const s=Or(t,n);if(s){const i=xr(s),r=i.path,o=i.queryId,a=re(r,e),l=new Cn(Tr(o),a);return Mr(t,r,l)}else return[]}function Ts(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||cc(o,e))){const l=u_(o,e,n,s);c_(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,u=t.syncPointTree_.findOnPath(r,(f,m)=>at(m));if(d&&!u){const f=t.syncPointTree_.subtree(r);if(!f.isEmpty()){const m=w_(f);for(let g=0;g<m.length;++g){const y=m[g],b=y.query,Z=fc(t,y);t.listenProvider_.startListening(pn(b),kn(t,b),Z.hashFn,Z.onComplete)}}}!u&&c.length>0&&!s&&(d?t.listenProvider_.stopListening(pn(e),null):c.forEach(f=>{const m=t.queryToTagMap.get(js(f));t.listenProvider_.stopListening(pn(f),m)}))}I_(t,c)}return a}function dc(t,e,n,s){const i=Or(t,s);if(i!=null){const r=xr(i),o=r.path,a=r.queryId,l=re(o,e),c=new It(Tr(a),l,n);return Mr(t,o,c)}else return[]}function b_(t,e,n,s){const i=Or(t,s);if(i){const r=xr(i),o=r.path,a=r.queryId,l=re(o,e),c=U.fromObject(n),d=new Vt(Tr(a),l,c);return Mr(t,o,d)}else return[]}function Hi(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,m)=>{const g=re(f,i);r=r||st(m,g),o=o||at(m)});let a=t.syncPointTree_.get(i);a?(o=o||at(a),r=r||st(a,O())):(a=new rc,t.syncPointTree_=t.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=w.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((m,g)=>{const y=st(g,O());y&&(r=r.updateImmediateChild(m,y))}));const c=cc(a,e);if(!c&&!e._queryParams.loadsAllData()){const f=js(e);_(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const m=E_();t.queryToTagMap.set(f,m),t.tagToQueryMap.set(m,f)}const d=Bs(t.pendingWriteTree_,i);let u=d_(a,e,n,d,r,l);if(!c&&!o&&!s){const f=lc(a,e);u=u.concat(C_(t,e,f))}return u}function Hs(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=re(o,e),c=st(a,l);if(c)return c});return Zl(i,e,r,n,!0)}function y_(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(c,d)=>{const u=re(c,n);s=s||st(d,u)});let i=t.syncPointTree_.get(n);i?s=s||st(i,O()):(i=new rc,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new ot(s,!0,!1):null,a=Bs(t.pendingWriteTree_,e._path),l=oc(i,e,a,r?o.getNode():w.EMPTY_NODE,r);return s_(l)}function Jt(t,e){return uc(e,t.syncPointTree_,null,Bs(t.pendingWriteTree_,O()))}function uc(t,e,n,s){if(A(t.path))return hc(t,e,n,s);{const i=e.get(O());n==null&&i!=null&&(n=st(i,O()));let r=[];const o=k(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=ec(s,o);r=r.concat(uc(a,l,c,d))}return i&&(r=r.concat(Pr(i,t,s,n))),r}}function hc(t,e,n,s){const i=e.get(O());n==null&&i!=null&&(n=st(i,O()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=ec(s,o),d=t.operationForChild(o);d&&(r=r.concat(hc(d,a,l,c)))}),i&&(r=r.concat(Pr(i,t,s,n))),r}function fc(t,e){const n=e.query,s=kn(t,n);return{hashFn:()=>(n_(e)||w.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?v_(t,n._path,s):g_(t,n._path);{const r=gp(i,n);return Ts(t,n,null,r)}}}}function kn(t,e){const n=js(e);return t.queryToTagMap.get(n)}function js(t){return t._path.toString()+"$"+t._queryIdentifier}function Or(t,e){return t.tagToQueryMap.get(e)}function xr(t){const e=t.indexOf("$");return _(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new $(t.substr(0,e))}}function Mr(t,e,n){const s=t.syncPointTree_.get(e);_(s,"Missing sync point for query tag that we're tracking");const i=Bs(t.pendingWriteTree_,e);return Pr(s,n,i,null)}function w_(t){return t.fold((e,n,s)=>{if(n&&at(n))return[Ws(n)];{let i=[];return n&&(i=ac(n)),ne(s,(r,o)=>{i=i.concat(o)}),i}})}function pn(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(f_())(t._repo,t._path):t}function I_(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=js(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function E_(){return p_++}function C_(t,e,n){const s=e._path,i=kn(t,e),r=fc(t,n),o=t.listenProvider_.startListening(pn(e),i,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(s);if(i)_(!at(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!A(c)&&d&&at(d))return[Ws(d).query];{let f=[];return d&&(f=f.concat(ac(d).map(m=>m.query))),ne(u,(m,g)=>{f=f.concat(g)}),f}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(pn(d),kn(t,d))}}return o}/**
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
 */class Dr{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Dr(n)}node(){return this.node_}}class Lr{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=q(this.path_,e);return new Lr(this.syncTree_,n)}node(){return Hs(this.syncTree_,this.path_)}}const k_=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},oa=function(t,e,n){if(!t||typeof t!="object")return t;if(_(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return T_(t[".sv"],e,n);if(typeof t[".sv"]=="object")return S_(t[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},T_=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:_(!1,"Unexpected server value: "+t)}},S_=function(t,e,n){t.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&_(!1,"Unexpected increment value: "+s);const i=e.node();if(_(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},pc=function(t,e,n,s){return Fr(e,new Lr(n,t),s)},$r=function(t,e,n){return Fr(t,new Dr(e),n)};function Fr(t,e,n){const s=t.getPriority().val(),i=oa(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=oa(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new J(a,Y(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new J(i))),o.forEachChild(H,(a,l)=>{const c=Fr(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Ur{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function Gs(t,e){let n=e instanceof $?e:new $(e),s=t,i=k(n);for(;i!==null;){const r=vt(s.node.children,i)||{children:{},childCount:0};s=new Ur(i,s,r),n=V(n),i=k(n)}return s}function At(t){return t.node.value}function Vr(t,e){t.node.value=e,ji(t)}function mc(t){return t.node.childCount>0}function A_(t){return At(t)===void 0&&!mc(t)}function Ks(t,e){ne(t.node.children,(n,s)=>{e(new Ur(n,t,s))})}function _c(t,e,n,s){n&&e(t),Ks(t,i=>{_c(i,e,!0)})}function R_(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Bn(t){return new $(t.parent===null?t.name:Bn(t.parent)+"/"+t.name)}function ji(t){t.parent!==null&&P_(t.parent,t.name,t)}function P_(t,e,n){const s=A_(n),i=we(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,ji(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,ji(t))}/**
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
 */const N_=/[\[\].#$\/\u0000-\u001F\u007F]/,O_=/[\[\].#$\u0000-\u001F\u007F]/,mi=10*1024*1024,Br=function(t){return typeof t=="string"&&t.length!==0&&!N_.test(t)},gc=function(t){return typeof t=="string"&&t.length!==0&&!O_.test(t)},x_=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),gc(t)},Ss=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!fr(t)||t&&typeof t=="object"&&we(t,".sv")},vc=function(t,e,n,s){s&&e===void 0||Wn(Ds(t,"value"),e,n)},Wn=function(t,e,n){const s=n instanceof $?new Jp(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+pt(s));if(typeof e=="function")throw new Error(t+"contains a function "+pt(s)+" with contents = "+e.toString());if(fr(e))throw new Error(t+"contains "+e.toString()+" "+pt(s));if(typeof e=="string"&&e.length>mi/3&&Ls(e)>mi)throw new Error(t+"contains a string greater than "+mi+" utf8 bytes "+pt(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(ne(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Br(o)))throw new Error(t+" contains an invalid key ("+o+") "+pt(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Xp(s,o),Wn(t,a,s),Zp(s)}),i&&r)throw new Error(t+' contains ".value" child '+pt(s)+" in addition to actual children.")}},M_=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=yn(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Br(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Qp);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&pe(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},D_=function(t,e,n,s){const i=Ds(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];ne(e,(o,a)=>{const l=new $(o);if(Wn(i,a,q(n,l)),vr(l)===".priority"&&!Ss(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),M_(i,r)},bc=function(t,e,n,s){if(!gc(n))throw new Error(Ds(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},L_=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),bc(t,e,n)},Wr=function(t,e){if(k(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},$_=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Br(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!x_(n))throw new Error(Ds(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class F_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function qs(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!br(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function yc(t,e,n){qs(t,n),wc(t,s=>br(s,e))}function he(t,e,n){qs(t,n),wc(t,s=>pe(s,e)||pe(e,s))}function wc(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(U_(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function U_(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();dn&&ee("event: "+n.toString()),Qt(s)}}}/**
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
 */const V_="repo_interrupt",B_=25;class W_{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new F_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=vs(),this.transactionQueueTree_=new Ur,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function H_(t,e,n){if(t.stats_=_r(t.repoInfo_),t.forceRestClient_||wp())t.server_=new gs(t.repoInfo_,(s,i,r,o)=>{aa(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>la(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Q(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new Me(t.repoInfo_,e,(s,i,r,o)=>{aa(t,s,i,r,o)},s=>{la(t,s)},s=>{j_(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=Tp(t.repoInfo_,()=>new km(t.stats_,t.server_)),t.infoData_=new ym,t.infoSyncTree_=new ra({startListening:(s,i,r,o)=>{let a=[];const l=t.infoData_.getNode(s._path);return l.isEmpty()||(a=Vn(t.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Hr(t,"connected",!1),t.serverSyncTree_=new ra({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);he(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function Ic(t){const n=t.infoData_.getNode(new $(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Hn(t){return k_({timestamp:Ic(t)})}function aa(t,e,n,s,i){t.dataUpdateCount++;const r=new $(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const l=os(n,c=>Y(c));o=b_(t.serverSyncTree_,r,l,i)}else{const l=Y(n);o=dc(t.serverSyncTree_,r,l,i)}else if(s){const l=os(n,c=>Y(c));o=__(t.serverSyncTree_,r,l)}else{const l=Y(n);o=Vn(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Wt(t,r)),he(t.eventQueue_,a,o)}function la(t,e){Hr(t,"connected",e),e===!1&&z_(t)}function j_(t,e){ne(e,(n,s)=>{Hr(t,n,s)})}function Hr(t,e,n){const s=new $("/.info/"+e),i=Y(n);t.infoData_.updateSnapshot(s,i);const r=Vn(t.infoSyncTree_,s,i);he(t.eventQueue_,s,r)}function zs(t){return t.nextWriteId_++}function G_(t,e,n){const s=y_(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=Y(i).withIndex(e._queryParams.getIndex());Hi(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Vn(t.serverSyncTree_,e._path,r);else{const a=kn(t.serverSyncTree_,e);o=dc(t.serverSyncTree_,e._path,r,a)}return he(t.eventQueue_,e._path,o),Ts(t.serverSyncTree_,e,n,null,!0),r},i=>(Xt(t,"get for query "+Q(e)+" failed: "+i),Promise.reject(new Error(i))))}function K_(t,e,n,s,i){Xt(t,"set",{path:e.toString(),value:n,priority:s});const r=Hn(t),o=Y(n,s),a=Hs(t.serverSyncTree_,e),l=$r(o,a,r),c=zs(t),d=Nr(t.serverSyncTree_,e,l,c,!0);qs(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(f,m)=>{const g=f==="ok";g||oe("set at "+e+" failed: "+f);const y=Je(t.serverSyncTree_,c,!g);he(t.eventQueue_,e,y),Gi(t,i,f,m)});const u=Gr(t,e);Wt(t,u),he(t.eventQueue_,u,[])}function q_(t,e,n,s){Xt(t,"update",{path:e.toString(),value:n});let i=!0;const r=Hn(t),o={};if(ne(n,(a,l)=>{i=!1,o[a]=pc(q(e,a),Y(l),t.serverSyncTree_,r)}),i)ee("update() called with empty data.  Don't do anything."),Gi(t,s,"ok",void 0);else{const a=zs(t),l=m_(t.serverSyncTree_,e,o,a);qs(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,d)=>{const u=c==="ok";u||oe("update at "+e+" failed: "+c);const f=Je(t.serverSyncTree_,a,!u),m=f.length>0?Wt(t,e):e;he(t.eventQueue_,m,f),Gi(t,s,c,d)}),ne(n,c=>{const d=Gr(t,q(e,c));Wt(t,d)}),he(t.eventQueue_,e,[])}}function z_(t){Xt(t,"onDisconnectEvents");const e=Hn(t),n=vs();$i(t.onDisconnect_,O(),(i,r)=>{const o=pc(i,r,t.serverSyncTree_,e);Yl(n,i,o)});let s=[];$i(n,O(),(i,r)=>{s=s.concat(Vn(t.serverSyncTree_,i,r));const o=Gr(t,i);Wt(t,o)}),t.onDisconnect_=vs(),he(t.eventQueue_,O(),s)}function Y_(t,e,n){let s;k(e._path)===".info"?s=Hi(t.infoSyncTree_,e,n):s=Hi(t.serverSyncTree_,e,n),yc(t.eventQueue_,e._path,s)}function Q_(t,e,n){let s;k(e._path)===".info"?s=Ts(t.infoSyncTree_,e,n):s=Ts(t.serverSyncTree_,e,n),yc(t.eventQueue_,e._path,s)}function J_(t){t.persistentConnection_&&t.persistentConnection_.interrupt(V_)}function Xt(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ee(n,...e)}function Gi(t,e,n,s){e&&Qt(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function X_(t,e,n,s,i,r){Xt(t,"transaction on "+e);const o={path:e,update:n,onComplete:s,status:null,order:gl(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=jr(t,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Wn("transaction failed: Data returned ",l,o.path),o.status=0;const c=Gs(t.transactionQueueTree_,e),d=At(c)||[];d.push(o),Vr(c,d);let u;typeof l=="object"&&l!==null&&we(l,".priority")?(u=vt(l,".priority"),_(Ss(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Hs(t.serverSyncTree_,e)||w.EMPTY_NODE).getPriority().val();const f=Hn(t),m=Y(l,u),g=$r(m,a,f);o.currentOutputSnapshotRaw=m,o.currentOutputSnapshotResolved=g,o.currentWriteId=zs(t);const y=Nr(t.serverSyncTree_,e,g,o.currentWriteId,o.applyLocally);he(t.eventQueue_,e,y),Ys(t,t.transactionQueueTree_)}}function jr(t,e,n){return Hs(t.serverSyncTree_,e,n)||w.EMPTY_NODE}function Ys(t,e=t.transactionQueueTree_){if(e||Qs(t,e),At(e)){const n=Cc(t,e);_(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&Z_(t,Bn(e),n)}else mc(e)&&Ks(e,n=>{Ys(t,n)})}function Z_(t,e,n){const s=n.map(c=>c.currentWriteId),i=jr(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const d=n[c];_(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=re(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{Xt(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let f=0;f<n.length;f++)n[f].status=2,d=d.concat(Je(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&u.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Qs(t,Gs(t.transactionQueueTree_,e)),Ys(t,t.transactionQueueTree_),he(t.eventQueue_,e,d);for(let f=0;f<u.length;f++)Qt(u[f])}else{if(c==="datastale")for(let u=0;u<n.length;u++)n[u].status===3?n[u].status=4:n[u].status=0;else{oe("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<n.length;u++)n[u].status=4,n[u].abortReason=c}Wt(t,e)}},o)}function Wt(t,e){const n=Ec(t,e),s=Bn(n),i=Cc(t,n);return eg(t,i,s),s}function eg(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=re(n,l.path);let d=!1,u;if(_(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,i=i.concat(Je(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=B_)d=!0,u="maxretry",i=i.concat(Je(t.serverSyncTree_,l.currentWriteId,!0));else{const f=jr(t,l.path,o);l.currentInputSnapshot=f;const m=e[a].update(f.val());if(m!==void 0){Wn("transaction failed: Data returned ",m,l.path);let g=Y(m);typeof m=="object"&&m!=null&&we(m,".priority")||(g=g.updatePriority(f.getPriority()));const b=l.currentWriteId,Z=Hn(t),Ae=$r(g,f,Z);l.currentOutputSnapshotRaw=g,l.currentOutputSnapshotResolved=Ae,l.currentWriteId=zs(t),o.splice(o.indexOf(b),1),i=i.concat(Nr(t.serverSyncTree_,l.path,Ae,l.currentWriteId,l.applyLocally)),i=i.concat(Je(t.serverSyncTree_,b,!0))}else d=!0,u="nodata",i=i.concat(Je(t.serverSyncTree_,l.currentWriteId,!0))}he(t.eventQueue_,n,i),i=[],d&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}Qs(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)Qt(s[a]);Ys(t,t.transactionQueueTree_)}function Ec(t,e){let n,s=t.transactionQueueTree_;for(n=k(e);n!==null&&At(s)===void 0;)s=Gs(s,n),e=V(e),n=k(e);return s}function Cc(t,e){const n=[];return kc(t,e,n),n.sort((s,i)=>s.order-i.order),n}function kc(t,e,n){const s=At(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Ks(e,i=>{kc(t,i,n)})}function Qs(t,e){const n=At(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,Vr(e,n.length>0?n:void 0)}Ks(e,s=>{Qs(t,s)})}function Gr(t,e){const n=Bn(Ec(t,e)),s=Gs(t.transactionQueueTree_,e);return R_(s,i=>{_i(t,i)}),_i(t,s),_c(s,i=>{_i(t,i)}),n}function _i(t,e){const n=At(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(_(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(_(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Je(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Vr(e,void 0):n.length=r+1,he(t.eventQueue_,Bn(e),i);for(let o=0;o<s.length;o++)Qt(s[o])}}/**
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
 */function tg(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function ng(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):oe(`Invalid query segment '${n}' in query '${t}'`)}return e}const ca=function(t,e){const n=sg(t),s=n.namespace;n.domain==="firebase.com"&&Ue(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Ue("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||hp();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Pl(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new $(n.pathString)}},sg=function(t){let e="",n="",s="",i="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let u=t.indexOf("?");u===-1&&(u=t.length),e=t.substring(0,Math.min(d,u)),d<u&&(i=tg(t.substring(d,u)));const f=ng(t.substring(Math.min(t.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const m=e.slice(0,c);if(m.toLowerCase()==="localhost")n="localhost";else if(m.split(".").length<=2)n=m;else{const g=e.indexOf(".");s=e.substring(0,g).toLowerCase(),n=e.substring(g+1),r=s}"ns"in f&&(r=f.ns)}return{host:e,port:l,domain:n,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
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
 */const da="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ig=function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=da.charAt(n%64),n=Math.floor(n/64);_(n===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=da.charAt(e[i]);return _(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class rg{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Q(this.snapshot.exportVal())}}class og{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class Tc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class jn{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return A(this._path)?null:vr(this._path)}get ref(){return new Se(this._repo,this._path)}get _queryIdentifier(){const e=Yo(this._queryParams),n=pr(e);return n==="{}"?"default":n}get _queryObject(){return Yo(this._queryParams)}isEqual(e){if(e=ie(e),!(e instanceof jn))return!1;const n=this._repo===e._repo,s=br(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Yp(this._path)}}function ag(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function lg(t){let e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===tt){const s="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){if(t.getIndexStartName()!==wt)throw new Error(s);if(typeof e!="string")throw new Error(i)}if(t.hasEnd()){if(t.getIndexEndName()!==it)throw new Error(s);if(typeof n!="string")throw new Error(i)}}else if(t.getIndex()===H){if(e!=null&&!Ss(e)||n!=null&&!Ss(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(_(t.getIndex()instanceof Kl||t.getIndex()===ql,"unknown index type."),e!=null&&typeof e=="object"||n!=null&&typeof n=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class Se extends jn{constructor(e,n){super(e,n,new Er,!1)}get parent(){const e=Ul(this._path);return e===null?null:new Se(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ht{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new $(e),s=Tn(this.ref,e);return new Ht(this._node.getChild(n),s,H)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Ht(i,Tn(this.ref,s),H)))}hasChild(e){const n=new $(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Te(t,e){return t=ie(t),t._checkNotDeleted("ref"),e!==void 0?Tn(t._root,e):t._root}function Tn(t,e){return t=ie(t),k(t._path)===null?L_("child","path",e):bc("child","path",e),new Se(t._repo,q(t._path,e))}function Sc(t,e){t=ie(t),Wr("push",t._path),vc("push",e,t._path,!0);const n=Ic(t._repo),s=ig(n),i=Tn(t,s),r=Tn(t,s);let o;return e!=null?o=cg(r,e).then(()=>r):o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function cg(t,e){t=ie(t),Wr("set",t._path),vc("set",e,t._path,!1);const n=new Kt;return K_(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function M(t,e){D_("update",e,t._path);const n=new Kt;return q_(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function ht(t){t=ie(t);const e=new Tc(()=>{}),n=new Js(e);return G_(t._repo,t,n).then(s=>new Ht(s,new Se(t._repo,t._path),t._queryParams.getIndex()))}class Js{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new rg("value",this,new Ht(e.snapshotNode,new Se(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new og(this,e,n):null}matches(e){return e instanceof Js?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function dg(t,e,n,s,i){const r=new Tc(n,void 0),o=new Js(r);return Y_(t._repo,t,o),()=>Q_(t._repo,t,o)}function ug(t,e,n,s){return dg(t,"value",e)}class Ac{}class hg extends Ac{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new jn(e._repo,e._path,vm(e._queryParams,this._limit),e._orderByCalled)}}function gi(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new hg(t)}class fg extends Ac{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){ag(e,"orderByKey");const n=bm(e._queryParams,tt);return lg(n),new jn(e._repo,e._path,n,!0)}}function vi(){return new fg}function bi(t,...e){let n=ie(t);for(const s of e)n=s._apply(n);return n}a_(Se);h_(Se);/**
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
 */const pg="FIREBASE_DATABASE_EMULATOR_HOST",Ki={};let mg=!1;function _g(t,e,n,s){t.repoInfo_=new Pl(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),s&&(t.authTokenProvider_=s)}function gg(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||Ue("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ee("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=ca(r,i),a=o.repoInfo,l;typeof process<"u"&&No&&(l=No[pg]),l?(r=`http://${l}?ns=${a.namespace}`,o=ca(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new Ep(t.name,t.options,e);$_("Invalid Firebase Database URL",o),A(o.path)||Ue("Database URL must point to the root of a Firebase Database (not including a child path).");const d=bg(a,t,c,new Ip(t.name,n));return new yg(d,t)}function vg(t,e){const n=Ki[e];(!n||n[t.key]!==t)&&Ue(`Database ${e}(${t.repoInfo_}) has already been deleted.`),J_(t),delete n[t.key]}function bg(t,e,n,s){let i=Ki[e.name];i||(i={},Ki[e.name]=i);let r=i[t.toURLString()];return r&&Ue("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new W_(t,mg,n,s),i[t.toURLString()]=r,r}class yg{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(H_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Se(this._repo,O())),this._rootInternal}_delete(){return this._rootInternal!==null&&(vg(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ue("Cannot call "+e+" on a deleted database.")}}function wg(t=Ma(),e){const n=nr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Dd("database");s&&Ig(n,...s)}return n}function Ig(t,e,n,s={}){t=ie(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Ue("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let r;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&Ue('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new ss(ss.OWNER);else if(s.mockUserToken){const o=typeof s.mockUserToken=="string"?s.mockUserToken:Ld(s.mockUserToken,t.app.options.projectId);r=new ss(o)}_g(i,e,n,r)}/**
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
 */function Eg(t){ap(zt),$t(new bt("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return gg(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),et(Oo,xo,t),et(Oo,xo,"esm2017")}/**
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
 */class Cg{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function le(t,e,n){var s;if(t=ie(t),Wr("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const i=(s=void 0)!==null&&s!==void 0?s:!0,r=new Kt,o=(l,c,d)=>{let u=null;l?r.reject(l):(u=new Ht(d,new Se(t._repo,t._path),H),r.resolve(new Cg(c,u)))},a=ug(t,()=>{});return X_(t._repo,t._path,e,o,a,i),r.promise}Me.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Me.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Eg();const qi={apiKey:"AIzaSyARFa-vzKVmIdxP5xDRXVzasL2ui94eZ-w",authDomain:"market-6e66a.firebaseapp.com",databaseURL:"https://market-6e66a-default-rtdb.firebaseio.com",projectId:"market-6e66a",storageBucket:"market-6e66a.firebasestorage.app",messagingSenderId:"402312269082",appId:"1:402312269082:web:cf304afc54057ea162b0a3"},kg=!!qi.apiKey&&!!qi.databaseURL;let on=null,ua=null,ha=null;function We(){return on||(on=xa(qi),ua=rp(on),ha=wg(on)),{app:on,auth:ua,db:ha}}function Tg(){const{auth:t}=We();return new Promise(e=>{let n=!1;const s=qh(t,i=>{n||(n=!0,s(),e(i||null))},()=>e(null));setTimeout(()=>{n||(n=!0,e(t.currentUser||null))},4e3)})}const Sg="../STONK-Home/index.html",yi=2600;function Ag(t){return String(t||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"")}function Rg(){return/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)||location.protocol==="file:"}function Pg(t){const e=Ag(t);return Sg+(e?`?room=${encodeURIComponent(e)}`:"")}function Ng({title:t="STONK Home에서 입장해 주세요",message:e="",roomCode:n="",auto:s=!0}={}){var l;const i=Pg(n),r=document.getElementById("stonk-home-gate");r&&r.remove();const o=document.createElement("div");o.id="stonk-home-gate",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),Object.assign(o.style,{position:"fixed",inset:"0",zIndex:"99999",display:"grid",placeItems:"center",padding:"24px",background:"radial-gradient(120% 90% at 50% -10%, rgba(139,108,255,0.22), transparent 60%), rgba(5,6,10,0.94)",backdropFilter:"blur(8px)",color:"#f4f7ff",fontFamily:"Pretendard, Inter, 'Noto Sans KR', system-ui, sans-serif"});const a=s&&!Rg();if(o.innerHTML=`
    <div style="width:min(460px,100%);text-align:center;padding:32px 26px;border:1px solid rgba(255,255,255,0.14);border-radius:18px;background:rgba(14,16,24,0.92);box-shadow:0 24px 70px rgba(0,0,0,0.5),0 0 60px rgba(139,108,255,0.16)">
      <div style="font-size:13px;font-weight:900;letter-spacing:2px;color:#8b6cff;margin-bottom:8px">STONK UNIVERSE</div>
      <h2 style="margin:0 0 10px;font-size:1.5rem">${t}</h2>
      <p style="margin:0 0 18px;color:#aab2c8;font-size:0.95rem;line-height:1.5">${e||"로그인 · 방 선택 · 닉네임 설정은 STONK Home에서 진행합니다."}</p>
      <a data-home-go href="${i}" style="display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 26px;border-radius:14px;font-weight:900;text-decoration:none;color:#0a0a12;background:linear-gradient(135deg,#a99bff,#8b6cff);box-shadow:0 10px 30px rgba(139,108,255,0.4)">STONK Home으로 이동</a>
      ${n?`<div style="margin-top:14px;font-size:0.82rem;color:#8a93a8">방 코드 <b style="color:#41e0ff;letter-spacing:2px">${n}</b> 유지</div>`:""}
      ${a?`<div style="margin-top:12px;font-size:0.8rem;color:#8a93a8"><span data-gate-count>${Math.ceil(yi/1e3)}</span>초 후 자동 이동…</div>`:'<div style="margin-top:12px;font-size:0.78rem;color:#5f6678">개발 모드: 자동 이동 없음</div>'}
    </div>
  `,document.body.appendChild(o),(l=o.querySelector("[data-home-go]"))==null||l.addEventListener("click",c=>{c.preventDefault(),location.href=i}),a){let c=Math.ceil(yi/1e3);const d=o.querySelector("[data-gate-count]"),u=setInterval(()=>{c-=1,d&&(d.textContent=String(Math.max(0,c))),c<=0&&clearInterval(u)},1e3);setTimeout(()=>{location.href=i},yi)}return o}const ye="MAIN",Sn=.002,An=.01,Rc=60*60*1e3,Rn=60,Pc={d1:{id:"d1",label:"1일 정기예금",ms:24*3600*1e3,rate:.005,desc:"24시간 · 이자 0.5%"},d3:{id:"d3",label:"3일 정기예금",ms:72*3600*1e3,rate:.018,desc:"72시간 · 이자 1.8%"}},Nc={S:5e7,A:3e7,B:15e6,C:7e6,D:3e6,F:0},Oc={arcade:{id:"arcade",title:"Arcade 손실 완화 보험",premium:3e6,ms:24*3600*1e3,desc:"24시간 · 아케이드 큰 손실 시 일부 완화(예정)"},gacha:{id:"gacha",title:"Gacha 폭망 보호권",premium:5e6,ms:24*3600*1e3,desc:"24시간 · 가챠 과소비 경고 강화"},loan:{id:"loan",title:"대출 유예권",premium:2e6,ms:24*3600*1e3,desc:"24시간 · 대출 위험도를 한 단계 완화 표시(신용등급과는 별개)"}},xc={stable:{id:"stable",title:"안정형 펀드",ms:6*3600*1e3,min:-.01,max:.02,risk:"낮음"},growth:{id:"growth",title:"성장형 펀드",ms:12*3600*1e3,min:-.05,max:.08,risk:"중간"},ipo:{id:"ipo",title:"IPO 청약 상품",ms:24*3600*1e3,min:-.2,max:.35,risk:"높음"},lever:{id:"lever",title:"레버리지 펀드",ms:24*3600*1e3,min:-.4,max:.6,risk:"매우 높음"}},Pn=["NORMAL","SILVER","GOLD","PLATINUM","BLACK"],Mc={NORMAL:0,SILVER:30,GOLD:55,PLATINUM:78,BLACK:92},As=.003,Dc="GOLD",Lc={NORMAL:0,SILVER:.03,GOLD:.05,PLATINUM:.08,BLACK:.1},$c={NORMAL:0,SILVER:0,GOLD:.003,PLATINUM:.0035,BLACK:.004};function Fc(t){return Lc[t]||0}function Rs(t){return $c[t]||0}function Ve(t){return Math.max(0,Pn.indexOf(t||"NORMAL"))}const Uc={pbond:{id:"pbond",title:"PLATINUM 안정 채권",ms:24*3600*1e3,min:-.02,max:.04,risk:"낮음",requiredVipTier:"PLATINUM"},bsecret:{id:"bsecret",title:"BLACK 시크릿 펀드",ms:48*3600*1e3,min:-.15,max:.2,risk:"매우 높음",requiredVipTier:"BLACK"}},Vc=12*3600*1e3,Bc=3,Ct={BASIC:{id:"BASIC",title:"BASIC Card",limit:5e6,minGrade:"B",minVip:"NORMAL",insExtra:0,perk:"기본 게임머니 신용카드"},GOLD:{id:"GOLD",title:"GOLD Card",limit:2e7,minGrade:"A",minVip:"GOLD",insExtra:.02,perk:"보험 할인 +2% · 결제 알림 강화"},PLATINUM:{id:"PLATINUM",title:"PLATINUM Card",limit:5e7,minGrade:"S",minVip:"PLATINUM",insExtra:0,perk:"카드 이용 시 VIP 점수 소폭 +"},BLACK:{id:"BLACK",title:"BLACK Card",limit:1e8,minGrade:"S",minVip:"BLACK",insExtra:0,perk:"BLACK 전용 디자인 · 프리미엄 효과"}},Wc=["BASIC","GOLD","PLATINUM","BLACK"],Og={F:0,D:1,C:2,B:3,A:4,S:5};function Nn(t){return Og[t]||0}const Xs={lowrate:{id:"lowrate",type:"lowrate",title:"저금리 데이",desc:"예금·대출 이자가 소폭 낮아집니다."},highrate:{id:"highrate",type:"highrate",title:"고금리 데이",desc:"예금·대출 이자가 소폭 높아지고 대출 경고가 강해집니다."},boom:{id:"boom",type:"boom",title:"투자 호황",desc:"신규 투자상품의 기대 상단이 소폭 올라갑니다."},bust:{id:"bust",type:"bust",title:"투자 침체",desc:"신규 투자상품의 손실 가능성이 커지고 경고가 강해집니다."},insurance:{id:"insurance",type:"insurance",title:"보험 우대 기간",desc:"보험 가입비가 추가 5% 할인됩니다(총 할인 최대 20%)."},cashback:{id:"cashback",type:"cashback",title:"카드 캐시백 이벤트",desc:"카드 납부 시 VIP 점수가 소폭 증가합니다."},vipweek:{id:"vipweek",type:"vipweek",title:"VIP 우대 기간",desc:"VIP 점수 획득과 VIP 금고 이자가 소폭 증가합니다."},caution:{id:"caution",type:"caution",title:"금융 경계주의보",desc:"대출·카드 고액 사용 경고가 강화됩니다. (보상 없음)"}},zi=Object.keys(Xs);function ct(t){const e={depositMult:1,loanMult:1,insExtraDisc:0,investMinAdd:0,investMaxAdd:0,vipVaultAdd:0,vipGainMult:1,cardCashbackVip:0,warnBoost:!1};if(t&&t.custom&&t.effects&&typeof t.effects=="object"){const s=t.effects,i=(r,o,a,l)=>(r=Number(r),Number.isFinite(r)?Math.max(o,Math.min(a,r)):l);return e.depositMult=i(s.depositRateMultiplier,.5,1.5,1),e.loanMult=i(s.loanRateMultiplier,.5,1.5,1),e.insExtraDisc=i(s.insuranceExtraDiscount,0,.1,0),e.investMinAdd=i(s.investMinDelta,-.1,.1,0),e.investMaxAdd=i(s.investMaxDelta,-.1,.1,0),e.vipGainMult=i(s.vipScoreMultiplier,1,2,1),e.vipVaultAdd=i(s.vipVaultBonusRate,0,.001,0),e.cardCashbackVip=Math.round(i(s.cardPayVipBonus,0,5,0)),e.warnBoost=!!s.warnBoost,e}const n=t&&t.type;return n==="lowrate"?(e.depositMult=.7,e.loanMult=.7):n==="highrate"?(e.depositMult=1.3,e.loanMult=1.3,e.warnBoost=!0):n==="boom"?e.investMaxAdd=.03:n==="bust"?(e.investMinAdd=-.05,e.warnBoost=!0):n==="insurance"?e.insExtraDisc=.05:n==="cashback"?e.cardCashbackVip=1:n==="vipweek"?(e.vipVaultAdd=5e-4,e.vipGainMult=1.2):n==="caution"&&(e.warnBoost=!0),e}function Hc(t){let e=2166136261;const n="bankevt:"+String(t);for(let i=0;i<n.length;i++)e^=n.charCodeAt(i),e=Math.imul(e,16777619);const s=zi[(e>>>0)%zi.length];return Object.assign({},Xs[s],{seed:n,manual:!1})}function Kr(t){const e=new Date((t||Date.now())+324e5);return`${e.getUTCFullYear()}-${e.getUTCMonth()+1}-${e.getUTCDate()}`}let Be=null;function jc(t){Be=t||null}function P(t){const e=Number(t);return Number.isFinite(e)?e:0}function h(t){return Math.trunc(P(t))}function se(t){return t=Math.round(P(t)),Math.max(0,Math.min(100,t))}function me(t){return t=se(t),t>=90?"S":t>=75?"A":t>=55?"B":t>=35?"C":t>=15?"D":"F"}function Gc(t){return Nc[t]??0}function R(t){return h(t).toLocaleString("ko-KR")+"원"}const xg=t=>Te(We().db,`rooms/${ye}/players/${t}`),ce=t=>Te(We().db,`rooms/${ye}/players/${t}/cash`),B=t=>Te(We().db,`rooms/${ye}/bank/${t}`),Kc=t=>Te(We().db,`rooms/${ye}/bank/${t}/tx`),Ps=t=>Te(We().db,`rooms/${ye}/bank/${t}/messages`),Mg=()=>Te(We().db,`rooms/${ye}/bankEvents/current`);function qc(t){return{enabled:!1,cardTier:"",cardLimit:0,usedAmount:0,billingAmount:0,dueAt:0,lastBilledAt:0,lastOverdueProcessedAt:0,overdue:!1,overdueCount:0,suspended:!1,autoPayEnabled:!1,autoPayMode:"off",autoPayLastProcessedAt:0,lost:!1,reissueCount:0,cardDisplayId:"",lostAt:0,reissuedAt:0,createdAt:t||Date.now(),updatedAt:t||Date.now()}}function zc(t,e){const n=t&&typeof t=="object"?t:{};return{enabled:!!n.enabled,cardTier:n.cardTier||"",cardLimit:Math.max(0,h(n.cardLimit)),usedAmount:Math.max(0,h(n.usedAmount)),billingAmount:Math.max(0,h(n.billingAmount)),dueAt:h(n.dueAt),lastBilledAt:h(n.lastBilledAt),lastOverdueProcessedAt:h(n.lastOverdueProcessedAt),overdue:!!n.overdue,overdueCount:Math.max(0,h(n.overdueCount)),suspended:!!n.suspended,autoPayEnabled:!!n.autoPayEnabled,autoPayMode:n.autoPayMode||(n.autoPayEnabled?"full":"off"),autoPayLastProcessedAt:h(n.autoPayLastProcessedAt),lost:!!n.lost,reissueCount:Math.max(0,h(n.reissueCount)),cardDisplayId:n.cardDisplayId||"",lostAt:h(n.lostAt),reissuedAt:h(n.reissuedAt),createdAt:h(n.createdAt)||e,updatedAt:e}}function Yc(t){const e=Math.max(h(t&&t.billingAmount),h(t&&t.usedAmount));return e<=0?0:Math.min(e,Math.max(Math.floor(e*.1),1e6))}function Dg(t){const e=ct(Be);return{free:{base:Sn,now:Sn*e.depositMult},loan:{base:An,now:An*e.loanMult},vipVault:{base:Rs(t&&t.vipTier||"NORMAL")||As,now:(Rs(t&&t.vipTier||"NORMAL")||As)+e.vipVaultAdd},eventActive:!!(Be&&(e.depositMult!==1||e.loanMult!==1||e.vipVaultAdd>0||e.insExtraDisc>0||e.investMinAdd||e.investMaxAdd||e.vipGainMult!==1||e.cardCashbackVip>0)),ef:e}}function Qc(t){return{balance:0,fixed:{},loanPrincipal:0,loanInterest:0,creditScore:Rn,creditGrade:me(Rn),insurances:{},investments:{},vipScore:0,vipTier:"NORMAL",vipVaultBalance:0,card:qc(t),lastInterestSettledAt:t,lastVipSettledAt:t,createdAt:t,updatedAt:t}}function Lg(t,e){const n=Qc(e),s=t&&typeof t=="object"?t:{};return{nickname:s.nickname||"",balance:Math.max(0,h(s.balance)),fixed:s.fixed&&typeof s.fixed=="object"?s.fixed:{},loanPrincipal:Math.max(0,h(s.loanPrincipal)),loanInterest:Math.max(0,h(s.loanInterest)),creditScore:se(s.creditScore!=null?s.creditScore:Rn),creditGrade:s.creditGrade||me(s.creditScore!=null?s.creditScore:Rn),insurances:s.insurances&&typeof s.insurances=="object"?s.insurances:{},investments:s.investments&&typeof s.investments=="object"?s.investments:{},vipScore:se(s.vipScore),vipTier:s.vipTier||"NORMAL",vipVaultBalance:Math.max(0,h(s.vipVaultBalance)),card:zc(s.card,e),lastInterestSettledAt:h(s.lastInterestSettledAt)||n.lastInterestSettledAt,lastVipSettledAt:h(s.lastVipSettledAt)||n.lastVipSettledAt,createdAt:h(s.createdAt)||e,updatedAt:e}}function te(t){return{nickname:t.nickname||"",balance:Math.max(0,h(t.balance)),fixed:t.fixed||{},loanPrincipal:Math.max(0,h(t.loanPrincipal)),loanInterest:Math.max(0,h(t.loanInterest)),creditScore:se(t.creditScore),creditGrade:me(t.creditScore),insurances:t.insurances||{},investments:t.investments||{},vipScore:se(t.vipScore),vipTier:t.vipTier||"NORMAL",vipVaultBalance:Math.max(0,h(t.vipVaultBalance)),card:zc(t.card,Date.now()),lastInterestSettledAt:h(t.lastInterestSettledAt),lastVipSettledAt:h(t.lastVipSettledAt)||h(t.lastInterestSettledAt),createdAt:h(t.createdAt),updatedAt:Date.now()}}function qr(t,e){const n=h(t.lastInterestSettledAt)||e,s=Math.max(0,e-n),i=s/864e5,r=ct(Be),o=Sn*r.depositMult,a=An*r.loanMult,l=i>0?Math.floor(P(t.balance)*o*i):0,c=i>0?Math.floor(P(t.loanPrincipal)*a*i):0,d=h(t.lastVipSettledAt)||n,u=Math.max(0,e-d)/864e5,f=(Rs(t.vipTier)||As)+r.vipVaultAdd,m=u>0?Math.floor(P(t.vipVaultBalance)*f*u):0,g={...t};return(l>0||c>0)&&(g.balance=Math.max(0,h(t.balance)+l),g.loanInterest=Math.max(0,h(t.loanInterest)+c),g.lastInterestSettledAt=e),m>0&&(g.vipVaultBalance=Math.max(0,h(t.vipVaultBalance)+m),g.lastVipSettledAt=e),{bank:g,freeInt:l,loanInt:c,vipInt:m,elapsed:s}}function Zt(t){return Object.values(t.fixed||{}).reduce((e,n)=>e+h(n&&n.amount),0)}function zr(t){const e=Date.now();return Object.values(t.investments||{}).reduce((n,s)=>!s||s.status==="settled"?n:n+(e>=P(s.maturesAt)?h(ei(s).amount):h(s.principal)),0)}function Zs(t,e){return h(t)+h(e.balance)+Zt(e)+h(e.vipVaultBalance)+zr(e)-h(e.loanPrincipal)-h(e.loanInterest)}function $g(t,e,n){let s=se(t);const i=Zs(e,n),r=h(n.loanPrincipal)+h(n.loanInterest);return h(n.loanPrincipal)===0&&(s+=1),i<0&&(s-=5),r>h(e)+h(n.balance)+Zt(n)&&(s-=3),se(s)}function x(t,e,n,s,i,r){return{type:t,title:e,amount:h(n),beforeCash:h(s),afterCash:h(i),memo:r||"",createdAt:Date.now()}}async function L(t,e){await Sc(Kc(t),e)}function Yr(t){return{type:t.type||"system",title:t.title||"",body:t.body||"",amount:h(t.amount),relatedId:t.relatedId||"",read:!1,actionLabel:t.actionLabel||"",actionUrl:t.actionUrl||"",createdAt:Date.now()}}async function Ie(t,e){await Sc(Ps(t),Yr(e))}async function Fg(t,e){await M(Te(We().db,`rooms/${ye}/bank/${t}/messages/${e}`),{read:!0})}async function Ug(t,e){const n={};(e||[]).forEach(s=>{s&&!s.read&&s.id&&(n[`${s.id}/read`]=!0)}),Object.keys(n).length&&await M(Ps(t),n)}function Jc(t){return(t||[]).filter(e=>e&&!e.read).length}async function Qr(t){const{db:e}=We(),n=Date.now(),[s,i,r,o,a,l,c]=await Promise.all([ht(xg(t)),ht(B(t)),ht(bi(Kc(t),vi(),gi(20))),ht(bi(Ps(t),vi(),gi(60))),ht(Mg()),ht(Te(e,`rooms/${ye}/companies/${t}`)),ht(bi(Te(e,`rooms/${ye}/bankEvents/history`),vi(),gi(7)))]),d=s.val()||{},u=h(d.cash),f=d.nickname||i.val()&&i.val().nickname||"플레이어",m=l.exists()?l.val():null,g=c.exists()?Object.entries(c.val()).map(([S,W])=>({id:S,...W})).sort((S,W)=>P(W.startedAt||W.createdAt)-P(S.startedAt||S.createdAt)):[],y=Xc(a.val(),n);jc(y);try{const S=Kr(n)+"-"+(y.type||"seed");if(!g.some(W=>W.id===S)){const W=ct(y),ue={eventId:S,title:y.title||y.type||"이벤트",type:y.type||"seed",effects:{depositMult:W.depositMult,loanMult:W.loanMult,insExtraDisc:W.insExtraDisc,vipGainMult:W.vipGainMult},startedAt:n,expiresAt:h(y.expiresAt)||0,source:y.manual?"manual":"seed",createdAt:n};await M(Te(e,`rooms/${ye}/bankEvents/history/${S}`),ue),g.unshift(Object.assign({id:S},ue))}}catch(S){console.warn("[bank] 이벤트 이력 기록 실패:",S)}let b=Lg(i.val(),n);const Z=!i.exists(),Ae=b.vipTier;b.nickname||(b.nickname=f);const j=qr(b,n);let He=!1;const Kn=j.freeInt>0||j.loanInt>0||j.vipInt>0;Z?(b=De(b,u),await M(B(t),te(b))):j.elapsed>=Rc&&Kn?(b=j.bank,b.creditScore=$g(b.creditScore,u,b),b=De(b,u),await M(B(t),te(b)),j.freeInt>0&&await L(t,x("interest","자유예금 이자",j.freeInt,u,u,"")),j.loanInt>0&&await L(t,x("loanInterest","대출 이자",-j.loanInt,u,u,"")),j.vipInt>0&&await L(t,x("vipInterest","VIP 금고 이자",j.vipInt,u,u,"")),He=!0):(b=j.bank,b=De(b,u)),b.creditGrade=me(b.creditScore);const en=r.exists()?Object.entries(r.val()).map(([S,W])=>({id:S,...W})).sort((S,W)=>P(W.createdAt)-P(S.createdAt)):[];let _e=o.exists()?Object.entries(o.val()).map(([S,W])=>({id:S,...W})).sort((S,W)=>P(W.createdAt)-P(S.createdAt)):[];const dt=Vg(b,n),ut=dt.msgs.slice();if(dt.changed){dt.creditDelta&&(b.creditScore=se(b.creditScore+dt.creditDelta),b.creditGrade=me(b.creditScore)),await M(B(t),te(b));for(const S of dt.tx)await L(t,S)}const N=b.card;if(N&&N.enabled&&N.autoPayEnabled&&h(N.dueAt)>0&&n>=h(N.dueAt)&&h(N.autoPayLastProcessedAt)<h(N.dueAt)){const S=h(N.dueAt),W=Math.max(h(N.billingAmount),h(N.usedAmount)),ue=N.autoPayMode==="minimum",G=ue?Yc(N):W;W>0&&G>0&&(h(u)>=G?(await le(ce(t),je=>{const no=je==null?h(u):h(je);if(!(no<G))return no-G})).committed&&(N.usedAmount=Math.max(0,h(N.usedAmount)-G),N.billingAmount=Math.max(0,h(N.billingAmount)-G),N.autoPayLastProcessedAt=n,N.usedAmount<=0?(N.usedAmount=0,N.billingAmount=0,N.overdue=!1,N.dueAt=0,N.lastBilledAt=0,N.lastOverdueProcessedAt=0,N.suspended=!1,b.creditScore=se(b.creditScore+1),b.creditGrade=me(b.creditScore)):N.billingAmount<=0&&(N.overdue=!1),await M(B(t),te(b)),await L(t,x("card_pay",ue?"카드 자동납부(최소)":"카드 자동납부",-G,u,u-G,ue?`최소납부 · 잔여 ${R(N.usedAmount)}`:"전액 자동납부")),ut.push({type:"card",title:ue?"카드 최소 자동납부 완료":"카드 자동납부 완료",body:ue?`결제일에 최소납부액 ${R(G)}이 자동 납부되었습니다. 남은 청구액 ${R(N.usedAmount)}.`:`결제일에 청구액 ${R(G)}이 자동으로 납부되었습니다.`,relatedId:"cardautopay-"+S})):(N.autoPayLastProcessedAt=S,await M(B(t),{"card/autoPayLastProcessedAt":S}),ut.push({type:"card",title:"카드 자동납부 실패",body:`현금 부족으로 자동납부에 실패했습니다. 청구액 ${R(W)}을 수동 납부해 주세요.`,relatedId:"cardautofail-"+S})))}_e=await Bg(t,b,Ae,_e,n,ut);try{if(_e.length>50){const S=_e.slice().sort((G,qn)=>P(qn.createdAt)-P(G.createdAt)),W=new Set(S.slice(0,50).map(G=>G.id)),ue=S.filter(G=>G.id&&!W.has(G.id)&&G.read&&!String(G.id).startsWith("local-"));if(ue.length){const G={};ue.forEach(je=>{G[je.id]=null}),await M(Ps(t),G),console.info("[bank] 오래된 알림 정리:",ue.length);const qn=new Set(ue.map(je=>je.id));_e=_e.filter(je=>!qn.has(je.id))}}}catch(S){console.warn("[bank] 알림 정리 실패:",S)}const Cd=Object.values(b.fixed||{}).filter(S=>n>=P(S.maturesAt)).length,kd=Object.values(b.investments||{}).filter(S=>S&&S.status!=="settled"&&n>=P(S.maturesAt)).length,Td={freeInt:j.freeInt,loanInt:j.loanInt,vipInt:j.vipInt,maturedFixed:Cd,maturedInvest:kd,applied:He};return{uid:t,cash:u,nickname:f,bank:b,tx:en,msgs:_e,unread:Jc(_e),feed:Td,event:y,company:m,eventHistory:g,settledNow:He}}function Xc(t,e){return e=e||Date.now(),t&&t.manual&&(!t.expiresAt||P(t.expiresAt)>e)&&t.type?Object.assign({},Xs[t.type]||{},t):Hc(Kr(e))}function Vg(t,e){const n={changed:!1,creditDelta:0,msgs:[],tx:[]},s=t.card;if(!s||!s.enabled)return n;if(h(s.usedAmount)>0&&h(s.dueAt)>0&&e>=h(s.dueAt)&&(h(s.lastBilledAt)<h(s.dueAt)&&(s.billingAmount=h(s.usedAmount),s.lastBilledAt=h(s.dueAt),n.changed=!0,n.msgs.push({type:"card",title:"카드 결제일 도착",body:`STONK Card 청구액 ${R(s.billingAmount)}(게임머니) 납부가 필요합니다.`,relatedId:"cardbill-"+s.dueAt,actionLabel:"카드 탭에서 납부"}),n.tx.push(x("card_bill","카드 청구",s.billingAmount,0,0,"결제일 도래"))),h(s.billingAmount)>0&&e>=h(s.dueAt)+Vc&&h(s.lastOverdueProcessedAt)<h(s.dueAt))){s.overdue=!0,s.overdueCount=h(s.overdueCount)+1,s.lastOverdueProcessedAt=h(s.dueAt),n.creditDelta-=5,n.changed=!0;let i=`STONK Card 청구액 ${R(s.billingAmount)} 미납으로 신용점수가 하락했습니다.`;s.overdueCount>=Bc&&(s.suspended=!0,i+=" 미납 누적으로 카드가 정지되었습니다.",n.msgs.push({type:"card",title:"카드 사용 정지",body:"미납 누적으로 STONK Card 사용이 정지되었습니다. 전액 납부 후 복구할 수 있습니다.",relatedId:"cardsusp-"+s.dueAt}),n.tx.push(x("card_suspend","카드 사용 정지",0,0,0,`미납 ${s.overdueCount}회`))),n.msgs.push({type:"card",title:"카드 미납 발생",body:i,relatedId:"cardover-"+s.dueAt}),n.tx.push(x("card_overdue","카드 미납",0,0,0,`청구 ${R(s.billingAmount)} 미납 · 신용 -5`))}return n}async function Bg(t,e,n,s,i,r){const o=new Set((s||[]).map(d=>d.relatedId).filter(Boolean)),a=[],l=async d=>{if(d.relatedId&&o.has(d.relatedId))return;d.relatedId&&o.add(d.relatedId);const u=Yr(d);await Ie(t,d),a.push({id:"local-"+Math.random().toString(36).slice(2),...u})};for(const d of r||[])await l(d);const c={};for(const d of Object.values(e.insurances||{}))d&&d.status==="active"&&P(d.expiresAt)<=i&&(d.status="expired",c[`insurances/${d.id}/status`]="expired",await l({type:"insurance",title:"보험 만료",body:`${d.title}이(가) 만료되었습니다.`,relatedId:"insexp-"+d.id}));Object.keys(c).length&&await M(B(t),c);for(const d of Object.values(e.fixed||{}))d&&i>=P(d.maturesAt)&&await l({type:"fixed",title:"정기예금 만기 도착",body:`${d.title||d.label} 수령이 가능합니다.`,relatedId:"fixmat-"+d.id,actionLabel:"예금 탭에서 수령",actionUrl:""});for(const d of Object.values(e.investments||{}))if(d&&d.status!=="settled"&&i>=P(d.maturesAt)){const u=ei(d);await l({type:"investment",title:"투자상품 만기 도착",body:`${d.title} 만기 · 예상 ${(u.rate*100).toFixed(1)}%. 수령이 가능합니다.`,relatedId:"invmat-"+d.id})}return Ve(e.vipTier)>Ve(n)&&(await l({type:"vip",title:"VIP 등급 상승",body:`${Lt(e.vipTier)} 등급으로 승급했습니다.${e.vipTier==="GOLD"?" VIP 금고가 해금되었습니다.":""}`,relatedId:"viptier-"+e.vipTier}),await L(t,x("vip_tier_up","VIP 등급 상승",0,0,0,`${Lt(n)} → ${Lt(e.vipTier)}`))),a.length?[...a,...s||[]].sort((d,u)=>P(u.createdAt)-P(d.createdAt)):s}async function fe(t,e,n){const s=Date.now(),i=qr(e,s);return(i.freeInt>0||i.loanInt>0)&&(i.freeInt>0&&await L(t,x("interest","자유예금 이자",i.freeInt,n,n,"")),i.loanInt>0&&await L(t,x("loanInterest","대출 이자",-i.loanInt,n,n,""))),i.bank}function Ns(t,e,n){return t.creditScore=se(t.creditScore+e),t.creditGrade=me(t.creditScore),t}async function Zc(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");let s=await fe(t,{...n.bank},n.cash),i=0;const r=h(n.cash),o=await le(ce(t),c=>{const d=c==null?r:h(c);if(i=Math.min(e,d),!(i<=0))return d-i});if(!o.committed||i<=0)throw new Error("보유 현금이 없습니다.");const a=h((o.snapshot&&o.snapshot.val())??n.cash)+i,l=a-i;return s.balance=Math.max(0,h(s.balance)+i),await M(B(t),te(s)),await L(t,x("deposit","자유예금 입금",i,a,l,"")),i<e?`입금 완료 (가용 현금 ${R(i)})`:"입금 완료"}async function ed(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");if(e>h(n.bank.balance))throw new Error("예금 잔액이 부족합니다.");let s=await fe(t,{...n.bank},n.cash);e>h(s.balance)&&(e=h(s.balance)),s.balance=Math.max(0,h(s.balance)-e),await M(B(t),te(s));const i=h(n.cash);return await le(ce(t),r=>h(r)+e),await L(t,x("withdraw","자유예금 출금",e,i,i+e,"")),"출금 완료"}async function td(t,e,n,s){const i=Pc[e];if(!i)throw new Error("상품을 선택하세요.");if(n=h(n),n<=0)throw new Error("금액을 확인하세요.");if(n>h(s.cash))throw new Error("보유 현금이 부족합니다.");let r=await fe(t,{...s.bank},s.cash);const o=h(s.cash);if(!(await le(ce(t),u=>{const f=u==null?o:h(u);if(!(f<n))return f-n})).committed)throw new Error("보유 현금이 부족합니다.");const l=Date.now(),c="f"+l.toString(36);r.fixed=r.fixed||{},r.fixed[c]={id:c,product:e,label:i.label,amount:n,rate:i.rate,startedAt:l,maturesAt:l+i.ms},await M(B(t),te(r));const d=h(s.cash);return await L(t,x("fixedOpen",`${i.label} 가입`,n,d,d-n,"")),`${i.label} 가입 완료`}async function nd(t,e,n){let s=await fe(t,{...n.bank},n.cash);const i=s.fixed&&s.fixed[e];if(!i)throw new Error("정기예금을 찾을 수 없습니다.");const r=h(i.amount);delete s.fixed[e],await M(B(t),te(s));const o=h(n.cash);return await le(ce(t),a=>h(a)+r),await L(t,x("fixedCancel",`${i.label} 중도해지 (이자 미지급)`,r,o,o+r,"만기 전 해지")),"중도해지 — 원금만 반환되었습니다."}async function sd(t,e,n){let s=await fe(t,{...n.bank},n.cash);const i=s.fixed&&s.fixed[e];if(!i)throw new Error("정기예금을 찾을 수 없습니다.");if(Date.now()<h(i.maturesAt))throw new Error("아직 만기가 되지 않았습니다.");const r=h(i.amount),o=Math.floor(r*P(i.rate)),a=r+o;delete s.fixed[e],s=Ns(s,1,n.cash),await M(B(t),te(s));const l=h(n.cash);return await le(ce(t),c=>h(c)+a),await L(t,x("fixedClaim",`${i.label} 만기수령 (원금+이자)`,a,l,l+a,`이자 ${R(o)}`)),await Ie(t,{type:"fixed",title:"정기예금 수령 완료",body:`${i.label} ${R(a)}을(를) 수령했습니다. (이자 ${R(o)})`,amount:a,relatedId:"fixclaim-"+e}),`만기 수령 완료 (+${R(o)} 이자)`}async function id(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");let s=await fe(t,{...n.bank},n.cash);const i=me(s.creditScore),r=Gc(i),o=h(s.loanPrincipal);if(r<=0)throw new Error("현재 신용등급(F)으로는 대출이 불가합니다.");if(o+e>r)throw new Error(`대출 한도 초과 (한도 ${R(r)}, 현재 잔액 ${R(o)})`);s.loanPrincipal=o+e;const a=ti(s).find(c=>c.type==="loan");s=Ns(s,a?-1:-3,n.cash),a&&(s.insurances[a.id].status="used",s.insurances[a.id].usedAt=Date.now()),await M(B(t),te(s));const l=h(n.cash);return await le(ce(t),c=>h(c)+e),await L(t,x("loan","대출 실행",e,l,l+e,`잔액 ${R(s.loanPrincipal)}${a?" · 유예권 적용":""}`)),a&&(await L(t,x("insurance_used","대출 유예권 적용",0,l,l,"신용점수 하락 완화(-3 → -1)")),await Ie(t,{type:"insurance",title:"대출 유예권 사용됨",body:"대출 실행 시 신용점수 하락이 완화되었습니다.",relatedId:"insused-"+a.id})),`대출 완료 (+${R(e)})${a?" · 유예권으로 신용 하락 완화":""}`}async function Yi(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");if(e>h(n.cash))throw new Error("보유 현금이 부족합니다.");let s=await fe(t,{...n.bank},n.cash);const i=h(s.loanPrincipal)+h(s.loanInterest);if(i<=0)throw new Error("상환할 대출이 없습니다.");const r=Math.min(e,i),o=h(n.cash);if(!(await le(ce(t),m=>{const g=m==null?o:h(m);if(!(g<r))return g-r})).committed)throw new Error("보유 현금이 부족합니다.");let l=r;const c=Math.min(l,h(s.loanInterest));s.loanInterest=Math.max(0,h(s.loanInterest)-c),l-=c;const d=Math.min(l,h(s.loanPrincipal));s.loanPrincipal=Math.max(0,h(s.loanPrincipal)-d);const u=s.loanPrincipal<=0;u?(s.loanInterest=0,s=Ns(s,5,n.cash)):s=Ns(s,1,n.cash),await M(B(t),te(s));const f=h(n.cash);return await L(t,x("repay",u?"대출 전액 상환":"대출 상환",-r,f,f-r,`이자 ${R(c)} · 원금 ${R(d)}`)),u?"전액 상환 완료 🎉":`상환 완료 (이자 ${R(c)} · 원금 ${R(d)})`}function rd(t){t=se(t);let e="NORMAL";for(const n of Pn)t>=Mc[n]&&(e=n);return e}function Lt(t){return{NORMAL:"일반",SILVER:"실버",GOLD:"골드",PLATINUM:"플래티넘",BLACK:"블랙"}[t]||"일반"}function De(t,e){const n={...t},s=h(t.balance)+Zt(t)+h(t.vipVaultBalance),i=Zs(e,t);let r=0;return r+=Math.min(40,Math.floor(s/25e5)),r+=Math.min(25,Math.floor(Math.max(0,i)/4e6)),r+=Object.keys(t.fixed||{}).length?8:0,r+=Object.keys(t.investments||{}).length?8:0,r+=Object.keys(t.insurances||{}).length?5:0,r+=h(t.loanPrincipal)===0?6:0,r+=Math.min(8,se(t.creditScore)>=75?8:0),r=Math.round(r*ct(Be).vipGainMult),n.vipScore=se(r),n.vipTier=rd(n.vipScore),n}function Wg(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function fa(t){let e=(Wg(String(t))||1)>>>0;return e^=e<<13,e>>>=0,e^=e>>17,e^=e<<5,e>>>=0,e%1e5/1e5}function Jr(t){return xc[t]||Uc[t]||null}function ei(t){const e=Jr(t.productType)||{},n={min:t.expectedMinRate!=null?P(t.expectedMinRate):P(e.min),max:t.expectedMaxRate!=null?P(t.expectedMaxRate):P(e.max)},s=fa(t.seed),i=fa(t.seed+"x"),r=(s+i)/2,o=.45,a=n.min+(n.max-n.min)*(r*(1-o)+o*.5+(r-.5)*o),l=Math.max(n.min,Math.min(n.max,a)),c=h(t.principal),d=Math.max(0,Math.round(c*(1+l)));return{rate:l,amount:d,profit:d-c}}function od(t){return t>=.25?["대박","win"]:t>=.05?["성공","ok"]:t>-.02?["보합","flat"]:t>-.2?["손실","lose"]:["폭락","crash"]}function Hg(t,e){if(Zs(t,e)<0)return{key:"severe",label:"심각",tone:"danger"};const s=h(e.loanPrincipal)+h(e.loanInterest);if(s<=0)return{key:"safe",label:"안전",tone:"ok"};const i=h(t)+h(e.balance)+Zt(e)+h(e.vipVaultBalance)+zr(e),r=i>0?s/i:1;let o=r<.3?{key:"ok",label:"관리 가능",tone:"ok"}:r<.7?{key:"warn",label:"주의",tone:"warn"}:{key:"high",label:"위험",tone:"danger"};return ti(e).some(a=>a.type==="loan")&&(o.key==="high"?o={key:"warn",label:"주의",tone:"warn"}:o.key==="warn"&&(o={key:"ok",label:"관리 가능",tone:"ok"}),o.eased=!0),o.ratio=r,o}function jg(t,e){const n=h(e.balance)+Zt(e)+h(e.vipVaultBalance);if(n<=0)return{label:"미이용",tone:"muted"};const s=[];return Object.keys(e.fixed||{}).length&&s.push("장기 예치 중"),n>h(t)&&s.push("보수적 운용"),s.unshift("안정 자산 보유"),{label:s.join(" · "),tone:"ok"}}function ad(t,e){return t&&t.status!=="expired"&&P(t.expiresAt)>(e||Date.now())}function ti(t,e){return e=e||Date.now(),Object.values(t.insurances||{}).filter(n=>ad(n,e))}async function Gg(t,e,n){const s=Oc[e];if(!s)throw new Error("보험 상품을 선택하세요.");let i=await fe(t,{...n.bank},n.cash);const r=Date.now();if(ti(i,r).some(b=>b.type===e))throw new Error("이미 가입 중인 보험입니다.");const o=n.bank.vipTier||"NORMAL",a=ct(Be),l=n.bank.card&&n.bank.card.enabled&&Ct[n.bank.card.cardTier]?Ct[n.bank.card.cardTier].insExtra:0,c=Math.min(.2,Fc(o)+a.insExtraDisc+l),d=Math.max(1,Math.floor(s.premium*(1-c)));if(d>h(n.cash))throw new Error("보유 현금이 부족합니다.");const u=h(n.cash);if(!(await le(ce(t),b=>{const Z=b==null?u:h(b);if(!(Z<d))return Z-d})).committed)throw new Error("보유 현금이 부족합니다.");const m="ins"+r.toString(36);i.insurances=i.insurances||{},i.insurances[m]={id:m,type:e,title:s.title,premium:d,basePremium:s.premium,status:"active",startedAt:r,expiresAt:r+s.ms,usedAt:0,createdAt:r},i=De(i,n.cash),await M(B(t),te(i));const g=h(n.cash),y=c>0?`할인 ${Math.round(c*100)}% 적용${a.insExtraDisc>0?" (보험 우대 이벤트 포함)":""}`:"";return await L(t,x("insurance_buy",`${s.title} 가입`,-d,g,g-d,y)),await Ie(t,{type:"insurance",title:"보험 가입 완료",body:`${s.title}에 가입했습니다.${y?" ("+y+")":""}`,amount:-d,relatedId:"insbuy-"+m}),`${s.title} 가입 완료${c>0?` · ${Math.round(c*100)}% 할인`:""}`}async function Kg(t,e,n,s){const i=Jr(e);if(!i)throw new Error("투자상품을 선택하세요.");if(i.requiredVipTier&&Ve(s.bank.vipTier)<Ve(i.requiredVipTier))throw new Error(`${Lt(i.requiredVipTier)} 등급부터 가입 가능한 상품입니다.`);if(n=h(n),n<=0)throw new Error("금액을 확인하세요.");if(n>h(s.cash))throw new Error("보유 현금이 부족합니다.");let r=await fe(t,{...s.bank},s.cash);const o=h(s.cash);if(!(await le(ce(t),b=>{const Z=b==null?o:h(b);if(!(Z<n))return Z-n})).committed)throw new Error("보유 현금이 부족합니다.");const l=Date.now(),c="inv"+l.toString(36),d=t+":"+c+":"+l,u=ct(Be),f=P(i.min)+u.investMinAdd,m=P(i.max)+u.investMaxAdd;r.investments=r.investments||{},r.investments[c]={id:c,productType:e,title:i.title,principal:n,expectedMinRate:f,expectedMaxRate:m,status:"active",seed:d,startedAt:l,maturesAt:l+i.ms,resultRate:null,resultAmount:null,settledAt:0,createdAt:l},r=De(r,s.cash),await M(B(t),te(r));const g=h(s.cash),y=u.investMinAdd||u.investMaxAdd?` · ${Be.title} 반영`:"";return await L(t,x("investment_buy",`${i.title} 가입`,-n,g,g-n,`위험도 ${i.risk}${y}`)),`${i.title} 가입 완료${y}`}async function qg(t,e,n){let s=await fe(t,{...n.bank},n.cash);const i=s.investments&&s.investments[e];if(!i)throw new Error("투자상품을 찾을 수 없습니다.");if(Date.now()<P(i.maturesAt))throw new Error("아직 만기가 되지 않았습니다.");if(i.status==="settled")throw new Error("이미 정산된 상품입니다.");const r=ei(i);delete s.investments[e],s=De(s,n.cash),await M(B(t),te(s));const o=h(n.cash);await le(ce(t),l=>h(l)+r.amount);const[a]=od(r.rate);return await L(t,x("investment_settle",`${i.title} 정산 · ${a}`,r.amount,o,o+r.amount,`${(r.rate*100).toFixed(1)}%`)),await Ie(t,{type:"investment",title:"투자 정산 완료",body:`${i.title} 정산: ${R(r.amount)} 수령 (${(r.rate*100).toFixed(1)}%, ${a})`,amount:r.amount,relatedId:"invsettle-"+e}),`${a}! ${r.profit>=0?"+":"−"}${R(Math.abs(r.profit))} (${(r.rate*100).toFixed(1)}%)`}function ld(t){return Pn.indexOf(t.vipTier||"NORMAL")>=Pn.indexOf(Dc)}async function zg(t,e,n){if(!ld(n.bank))throw new Error("VIP 금고는 GOLD 등급부터 이용 가능합니다.");if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");let s=await fe(t,{...n.bank},n.cash),i=0;const r=h(n.cash);if(!(await le(ce(t),l=>{const c=l==null?r:h(l);if(i=Math.min(e,c),!(i<=0))return c-i})).committed||i<=0)throw new Error("보유 현금이 없습니다.");s.vipVaultBalance=Math.max(0,h(s.vipVaultBalance)+i),s=De(s,n.cash),await M(B(t),te(s));const a=h(n.cash);return await L(t,x("vip_deposit","VIP 금고 입금",i,a,a-i,"")),i<e?`VIP 금고 입금 (가용 ${R(i)})`:"VIP 금고 입금 완료"}async function Yg(t,e,n){if(e=h(e),e<=0)throw new Error("금액을 확인하세요.");if(e>h(n.bank.vipVaultBalance))throw new Error("VIP 금고 잔액이 부족합니다.");let s=await fe(t,{...n.bank},n.cash);e>h(s.vipVaultBalance)&&(e=h(s.vipVaultBalance)),s.vipVaultBalance=Math.max(0,h(s.vipVaultBalance)-e),s=De(s,n.cash),await M(B(t),te(s));const i=h(n.cash);return await le(ce(t),r=>h(r)+e),await L(t,x("vip_withdraw","VIP 금고 출금",e,i,i+e,"")),"VIP 금고 출금 완료"}function Qg(t){const e=me(t.creditScore),n=t.vipTier||"NORMAL";let s="";for(const i of Wc){const r=Ct[i];(Nn(e)>=Nn(r.minGrade)||Ve(n)>=Ve(r.minVip))&&(s=i)}return s}function Xr(t,e){const n=Ct[e];if(!n)return!1;const s=me(t.creditScore);return Nn(s)>=Nn(n.minGrade)||Ve(t.vipTier||"NORMAL")>=Ve(n.minVip)}function Jg(t){return Math.max(0,h(t&&t.cardLimit)-h(t&&t.usedAmount))}async function Xg(t,e,n){const s={...n.bank};if(s.card&&s.card.enabled)throw new Error("이미 카드를 발급했습니다. 업그레이드를 이용하세요.");const i=Ct[e];if(!i)throw new Error("카드 등급을 선택하세요.");if(!Xr(s,e))throw new Error(`${i.title} 발급 조건(신용 ${i.minGrade}↑ 또는 VIP ${Lt(i.minVip)}↑)을 충족하지 않습니다.`);const r=Date.now(),o=Object.assign(qc(r),{enabled:!0,cardTier:e,cardLimit:i.limit});return await M(B(t),{card:o}),await L(t,x("card_issue",`${i.title} 발급`,0,h(n.cash),h(n.cash),`한도 ${R(i.limit)}`)),await Ie(t,{type:"card",title:"STONK Card 발급 완료",body:`${i.title}(게임머니 신용카드)가 발급되었습니다. 한도 ${R(i.limit)}.`,relatedId:"cardissue-"+r}),`${i.title} 발급 완료`}async function Zg(t,e,n){const s={...n.bank};if(!s.card||!s.card.enabled)throw new Error("먼저 카드를 발급하세요.");const i=Ct[e];if(!i)throw new Error("카드 등급을 선택하세요.");if(!Xr(s,e))throw new Error(`${i.title} 조건을 충족하지 않습니다.`);if(h(s.card.billingAmount)>0||s.card.overdue)throw new Error("미납 청구액이 있으면 업그레이드할 수 없습니다.");return await M(B(t),{"card/cardTier":e,"card/cardLimit":i.limit,"card/updatedAt":Date.now()}),await L(t,x("card_upgrade",`${i.title} 전환`,0,h(n.cash),h(n.cash),`한도 ${R(i.limit)}`)),await Ie(t,{type:"card",title:"카드 등급 변경",body:`${i.title}로 변경되었습니다. 한도 ${R(i.limit)}.`,relatedId:"cardup-"+Date.now()}),`${i.title}로 변경 완료`}async function ev(t,e,n){let s=await fe(t,{...n.bank},n.cash);const i=s.card;if(!i||!i.enabled)throw new Error("카드가 없습니다.");const r=Math.max(h(i.billingAmount),h(i.usedAmount));if(r<=0)throw new Error("납부할 청구액이 없습니다.");let o=Math.min(Math.max(0,h(e)),r);if(o<=0)throw new Error("금액을 확인하세요.");if(o>h(n.cash))throw new Error("보유 현금이 부족합니다.");const a=h(n.cash);if(!(await le(ce(t),f=>{const m=f==null?a:h(f);if(!(m<o))return m-o})).committed)throw new Error("보유 현금이 부족합니다.");i.usedAmount=Math.max(0,h(i.usedAmount)-o),i.billingAmount=Math.max(0,h(i.billingAmount)-o);let c=!1;i.usedAmount<=0?(i.usedAmount=0,i.billingAmount=0,i.overdue=!1,i.dueAt=0,i.lastBilledAt=0,i.lastOverdueProcessedAt=0,i.suspended=!1,s.creditScore=se(s.creditScore+1),c=!0):i.billingAmount<=0&&(i.overdue=!1);const d=ct(Be);d.cardCashbackVip>0&&(s.vipScore=se(s.vipScore+d.cardCashbackVip)),s=De(s,n.cash),s.creditGrade=me(s.creditScore),await M(B(t),te(s));const u=h(n.cash);return await L(t,x("card_pay","카드 납부",-o,u,u-o,c?"전액 납부 완료":`일부 납부 · 잔여 ${R(i.usedAmount)}`)),await Ie(t,{type:"card",title:"카드 납부 완료",body:`${R(o)} 납부되었습니다.${c?" 청구액을 모두 정리했습니다.":` 남은 청구 ${R(i.usedAmount)}.`}${d.cardCashbackVip>0?" (캐시백 이벤트: VIP+1)":""}`,amount:-o,relatedId:"cardpay-"+Date.now()}),c?"카드 전액 납부 완료":`카드 납부 완료 (잔여 ${R(i.usedAmount)})`}async function tv(t,e){const s={...e.bank}.card;if(!s||!s.enabled)throw new Error("카드가 없습니다.");if(!s.suspended)throw new Error("정지 상태가 아닙니다.");if(h(s.usedAmount)>0||h(s.billingAmount)>0||s.overdue)throw new Error("미납 청구액을 먼저 정리하세요.");return await M(B(t),{"card/suspended":!1,"card/overdueCount":0,"card/updatedAt":Date.now()}),await L(t,x("card_restore","카드 사용 복구",0,h(e.cash),h(e.cash),"정지 해제")),await Ie(t,{type:"card",title:"카드 사용 복구",body:"STONK Card 사용이 복구되었습니다.",relatedId:"cardrestore-"+Date.now()}),"카드 사용이 복구되었습니다"}const cd={BASIC:5e5,GOLD:1e6,PLATINUM:2e6,BLACK:5e6};function dd(t,e){let n=cd[t&&t.cardTier||"BASIC"]||5e5;return(e&&e.vipTier)==="BLACK"&&(n=Math.floor(n*.5)),n}function nv(){return"•••• "+String(1e3+Math.floor(Math.random()*9e3))}async function sv(t,e){const n=e.bank&&e.bank.card;if(!n||!n.enabled)throw new Error("카드가 없습니다.");if(n.lost)throw new Error("이미 분실 신고된 카드입니다.");const s=Date.now();return await M(B(t),{"card/lost":!0,"card/lostAt":s,"card/updatedAt":s}),await L(t,x("card_suspend","카드 분실 신고",0,h(e.cash),h(e.cash),"즉시 사용 정지(분실)")),await Ie(t,{type:"card",title:"카드 분실 신고 접수",body:"STONK Card가 분실 신고되어 즉시 사용이 정지되었습니다. 재발급하면 다시 사용할 수 있습니다. (게임머니 카드 시나리오)",relatedId:"cardlost-"+s}),"카드 분실 신고 완료 — 즉시 사용 정지되었습니다."}async function iv(t,e){const n=e.bank&&e.bank.card;if(!n||!n.enabled)throw new Error("카드가 없습니다.");if(!n.lost)throw new Error("분실 신고된 카드만 재발급할 수 있습니다.");const s=dd(n,e.bank);if(s>h(e.cash))throw new Error("재발급 수수료를 낼 현금이 부족합니다.");const i=h(e.cash);if(!(await le(ce(t),l=>{const c=l==null?i:h(l);if(!(c<s))return c-s})).committed)throw new Error("재발급 수수료를 낼 현금이 부족합니다.");const o=Date.now();await M(B(t),{"card/lost":!1,"card/reissueCount":h(n.reissueCount)+1,"card/cardDisplayId":nv(),"card/reissuedAt":o,"card/lostAt":0,"card/updatedAt":o});const a=h(e.cash);return await L(t,x("card_restore","카드 재발급",-s,a,a-s,`수수료 ${R(s)} · 등급/사용액 유지`)),await Ie(t,{type:"card",title:"카드 재발급 완료",body:`STONK Card가 재발급되었습니다(수수료 ${R(s)}). 등급·사용액·청구액은 그대로 유지됩니다.`,amount:-s,relatedId:"cardreissue-"+o}),"카드 재발급 완료"}function rv(t,e,n){const s=Date.now(),i=(()=>{const u=new Date(s);return u.getFullYear()+"-"+String(u.getMonth()+1).padStart(2,"0")})(),r=u=>{const f=new Date(P(u.createdAt)||0);return f.getFullYear()+"-"+String(f.getMonth()+1).padStart(2,"0")===i};let o=0,a=0,l=0;const c={gacha:0,arcade:0,company:0,etc:0};(t||[]).forEach(u=>{if(r(u))if(u.type==="card_use"){const f=Math.abs(h(u.amount));o+=f,l++;const m=(u.title||"")+" "+(u.memo||"");/Gacha/i.test(m)?c.gacha+=f:/Arcade/i.test(m)?c.arcade+=f:/Company/i.test(m)?c.company+=f:c.etc+=f}else u.type==="card_pay"&&(a+=Math.abs(h(u.amount)))});const d=Math.max(h(e&&e.billingAmount),h(e&&e.usedAmount));return{periodKey:i,used:o,paid:a,overdue:e&&e.overdue?d:0,count:l,cat:c,generatedAt:s}}async function ov(t,e,n,s){const i=s.bank&&s.bank.card;if(!i||!i.enabled)throw new Error("먼저 카드를 발급하세요.");const r=e?n==="minimum"?"minimum":"full":"off";return await M(B(t),{"card/autoPayEnabled":!!e,"card/autoPayMode":r,"card/updatedAt":Date.now()}),await L(t,x("card_restore",e?"카드 자동납부 켜짐":"카드 자동납부 꺼짐",0,h(s.cash),h(s.cash),`모드 ${r}`)),e?"자동납부가 켜졌습니다(전액 자동납부).":"자동납부가 꺼졌습니다."}const av=Object.freeze(Object.defineProperty({__proto__:null,BANK_EVENTS:Xs,BANK_EVENT_IDS:zi,CARD_GRACE_MS:Vc,CARD_REISSUE_FEE:cd,CARD_SUSPEND_OVERDUE:Bc,CARD_TIERS:Ct,CARD_TIER_ORDER:Wc,FIXED_PRODUCTS:Pc,FREE_RATE_DAY:Sn,INIT_CREDIT:Rn,INSURANCE_PRODUCTS:Oc,INVESTMENT_PRODUCTS:xc,LOAN_LIMIT_BY_GRADE:Nc,LOAN_RATE_DAY:An,MIN_AUTOSETTLE_MS:Rc,ROOM:ye,VIP_DISCOUNT:Lc,VIP_INVESTMENT_PRODUCTS:Uc,VIP_TIERS:Pn,VIP_TIER_MIN:Mc,VIP_VAULT_MIN_TIER:Dc,VIP_VAULT_RATE_BY_TIER:$c,VIP_VAULT_RATE_DAY:As,activeInsurances:ti,buyInsurance:Gg,buyInvestment:Kg,cancelFixed:nd,cardCanIssue:Xr,cardEligibleTier:Qg,cardMinPay:Yc,cardRemaining:Jg,cardStatement:rv,claimFixed:sd,claimInvestment:qg,clampScore:se,computeSeedEvent:Hc,dateKeyKST:Kr,defaultBank:Qc,depositFree:Zc,depositStability:jg,depositVip:zg,eventEffects:ct,fixedTotal:Zt,gradeFromScore:me,gradeRank:Nn,insuranceActive:ad,int:h,investLabel:od,investOutcome:ei,investProduct:Jr,investmentsValue:zr,issueCard:Xg,loadState:Qr,loanLimit:Gc,loanRisk:Hg,markAllMessagesRead:Ug,markMessageRead:Fg,msgItem:Yr,netWorth:Zs,num:P,openFixed:td,payCard:ev,rateInfo:Dg,reissueCard:iv,reissueFee:dd,repayLoan:Yi,reportLostCard:sv,resolveEvent:Xc,restoreCard:tv,setActiveEvent:jc,setAutoPay:ov,settleInterest:qr,takeLoan:id,txItem:x,unreadCount:Jc,upgradeCard:Zg,vipDiscount:Fc,vipRank:Ve,vipTierFromScore:rd,vipTierLabel:Lt,vipVaultRate:Rs,vipVaultUnlocked:ld,withdrawFree:ed,withdrawVip:Yg,won:R},Symbol.toStringTag,{value:"Module"})),{won:v,int:E,num:F,fixedTotal:ud,netWorth:hd,gradeFromScore:ni,loanLimit:Zr,FIXED_PRODUCTS:lv,INSURANCE_PRODUCTS:fd,INVESTMENT_PRODUCTS:cv,VIP_INVESTMENT_PRODUCTS:dv,investmentsValue:uv,investOutcome:pd,investLabel:hv,loanRisk:fv,depositStability:pv,activeInsurances:mv,insuranceActive:wi,buyInsurance:_v,buyInvestment:gv,claimInvestment:vv,vipTierLabel:kt,vipVaultUnlocked:mn,depositVip:bv,withdrawVip:yv,VIP_VAULT_RATE_DAY:wv,vipDiscount:Iv,vipVaultRate:Ev,vipRank:Os,markMessageRead:Cv,markAllMessagesRead:kv,unreadCount:Tv,CARD_TIERS:an,CARD_TIER_ORDER:Ii,cardEligibleTier:md,cardCanIssue:pa,cardRemaining:Sv,issueCard:Av,upgradeCard:Rv,payCard:Pv,restoreCard:Nv,eventEffects:Ov,cardMinPay:_d,rateInfo:gd,setAutoPay:Jn,reportLostCard:xv,reissueCard:Mv,reissueFee:vd,cardStatement:Dv}=av,Lv="yaV8N60yIiUggaWNpNF2VhkCwxb2",$v="tomem@naver.com",K=document.getElementById("app");let p=null,bd=!1,xs="dashboard",ln="all",Qi="all",Ei=!1,ma=!1;Fv();async function Fv(){if(!kg){_a("Firebase 설정이 비어 있습니다.");return}Bv();let t=null;try{t=await Tg()}catch{}if(!t){Ng({message:"STONK Home에서 로그인 후 이용해 주세요. 같은 계정의 자산이 그대로 연결됩니다."}),Wv();return}try{bd=t.uid===Lv||String(t.email||"").toLowerCase()===$v,p=await Qr(t.uid),Re(),rb()}catch(e){console.error("[bank] 로드 실패:",e),_a("은행 데이터를 불러오지 못했습니다: "+(e&&e.message))}}async function Uv(){if(p){try{p=await Qr(p.uid)}catch(t){console.warn(t)}Re()}}function C(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function On(t,e="ok"){const n=document.createElement("div");n.className="bk-toast "+e,n.textContent=t,document.body.appendChild(n),setTimeout(()=>{n.classList.add("hide"),setTimeout(()=>n.remove(),280)},2200)}async function z(t){if(!Ei){Ei=!0;try{const e=await t();e&&On(e,"ok"),await Uv()}catch(e){On(e&&e.message||"오류가 발생했습니다.","err")}finally{Ei=!1}}}function Ee(t){const e=document.getElementById(t);return e?Math.floor(Number(e.value)||0):0}function yd(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function wd(){const t=document.getElementById("cardPayPreview");if(!t||!p)return;const e=p.bank&&p.bank.card||{},n=Math.max(E(e.billingAmount),E(e.usedAmount)),s=Ee("cardPayAmt");if(s<=0){t.textContent="";return}if(s>E(p.cash)){t.textContent="보유 현금을 초과합니다.",t.style.color="var(--red)";return}const i=Math.min(s,n),r=Math.max(0,n-i);t.style.color="",t.textContent=`납부 ${v(i)} → 남은 청구액 ${v(r)}${r<=0?" · 미납/정지 해제 + 신용 회복":""}`}function Vv(t){return t=Math.floor(Number(t)||0),t>=1e7||p&&p.cash>0&&t>=p.cash*.3}function Xn(t,e,n){if(!Vv(t))return z(n);const s=document.createElement("div");s.className="bk-modal-dim",s.innerHTML=`<div class="bk-modal">
    <h3>고액 거래 확인</h3>
    <p class="bk-modal-amt">${v(t)}</p>
    <p class="bk-note">STONK 가상 게임머니 거래입니다. 진행하시겠어요?</p>
    <div class="bk-modal-stage" hidden><span class="bk-spin"></span> <span class="bk-modal-label">${C(e||"처리 중...")}</span></div>
    <div class="bk-modal-btns"><button class="bk-btn" data-mc="cancel" type="button">취소</button><button class="bk-btn primary" data-mc="ok" type="button">확인</button></div>
  </div>`,document.body.appendChild(s);const i=()=>s.remove();s.querySelector('[data-mc="cancel"]').onclick=i,s.addEventListener("click",r=>{r.target===s&&i()}),s.querySelector('[data-mc="ok"]').onclick=()=>{s.querySelector(".bk-modal-btns").hidden=!0,s.querySelector(".bk-modal-stage").hidden=!1,setTimeout(()=>{i(),z(n)},yd()?0:600)}}function Bv(){K.innerHTML='<div class="bk-center"><div class="bk-spin"></div><p>STONK Bank 연결 중…</p></div>'}function _a(t){K.innerHTML=`<div class="bk-center"><h2>⚠️ 오류</h2><p>${C(t)}</p><a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로</a></div>`}function Wv(){K.innerHTML=`<div class="bk-center">
    <div class="bk-logo"><span class="bk-mark">$</span><b>STONK</b> Bank</div>
    <h2>로그인이 필요합니다</h2>
    <p class="muted">STONK Home에서 로그인 후 이용해 주세요.<br>같은 계정의 보유 현금이 그대로 연결됩니다.</p>
    <a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로 이동</a>
  </div>`}function Id(t){return`<span class="bk-grade g-${t}">${t}</span>`}function Re(){if(!p)return;const t=p.bank,e=E(t.balance)+ud(t),n=hd(p.cash,t),s=ni(t.creditScore);K.className=t.vipTier==="BLACK"?"is-black":"",K.innerHTML=`
    <header class="bk-header">
      <a class="bk-brand" href="#" data-home title="STONK Bank 메인"><span class="bk-mark">$</span><b>STONK</b> Bank</a>
      <div class="bk-nav">
        <a href="../STONK-Home/index.html">홈</a>
        <a href="../STONK-Battle/index.html">주식시장</a>
        <a href="../STONK-Board/index.html">주식소식</a>
        <a href="../STONK-Wiki/index.html">주식정보</a>
        <a href="../STONK-Arcade/index.html">아케이드</a>
        <a href="../STONK-Gacha/index.html">가챠</a>
        ${bd?'<a href="../STONK-Admin/market-admin.html">관리자</a>':""}
      </div>
      <div class="bk-user">
        <button class="bk-bell" type="button" data-tab="messages" title="알림/우편함" aria-label="알림">🔔${p.unread>0?`<span class="bk-bell-dot">${p.unread>99?"99+":p.unread}</span>`:""}</button>
        <span class="bk-nick">${C(p.nickname)}</span>${Ms(t.vipTier)}${Id(s)}
      </div>
    </header>

    <section class="bk-summary">
      <div class="bk-sum-card net"><span>순자산</span><b class="${n<0?"minus":""}">${v(n)}</b></div>
      <div class="bk-sum-card cash"><span>보유 현금</span><b>${v(p.cash)}</b></div>
      <div class="bk-sum-card dep"><span>총 예금</span><b>${v(e)}</b></div>
      <div class="bk-sum-card loan"><span>대출 잔액</span><b class="${E(t.loanPrincipal)>0?"warn":""}">${v(t.loanPrincipal)}</b></div>
    </section>

    <nav class="bk-tabs">
      ${["dashboard:대시보드","deposit:예금","loan:대출","card:카드","insurance:보험","invest:투자","vip:VIP","messages:알림","history:거래내역"].map(i=>{const[r,o]=i.split(":");return`<button class="bk-tab ${xs===r?"active":""}" data-tab="${r}">${o}</button>`}).join("")}
    </nav>

    <main class="bk-main">${Hv(xs)}</main>
    <footer class="bk-footer">모든 금액은 STONK 가상 게임머니입니다. 실제 화폐·투자와 무관합니다.</footer>
  `,Eb()}function Hv(t){return t==="deposit"?hb():t==="loan"?fb():t==="insurance"?vb():t==="invest"?bb():t==="vip"?wb():t==="card"?Xv():t==="messages"?ib():t==="history"?mb():ab()}function ga(){const t=p.event;return t?`<div class="bk-event-banner ev-${C(t.type)}">
    <span class="bk-event-ico">📰</span>
    <div><b>오늘의 금융 이벤트 · ${C(t.title)}</b><small>${C(t.desc)} <i class="muted">(게임머니 금융 이벤트)</i></small></div>
  </div>`:""}function jv(){const t=p.event;if(!t)return"";const e=Ov(t),n=gd(p.bank),s=[];n.free.now!==n.free.base&&s.push(["자유예금 이자/일",`${(n.free.base*100).toFixed(2)}% → ${(n.free.now*100).toFixed(2)}%`,n.free.now<n.free.base]),n.loan.now!==n.loan.base&&s.push(["대출 이자/일",`${(n.loan.base*100).toFixed(2)}% → ${(n.loan.now*100).toFixed(2)}%`,n.loan.now<n.loan.base]),e.insExtraDisc>0&&s.push(["보험 추가 할인",`+${Math.round(e.insExtraDisc*100)}% (총 최대 20%)`,!0]),(e.investMinAdd||e.investMaxAdd)&&s.push(["신규 투자 기대범위",`${e.investMinAdd?(e.investMinAdd>0?"+":"")+(e.investMinAdd*100).toFixed(0)+"%p 하단 ":""}${e.investMaxAdd?(e.investMaxAdd>0?"+":"")+(e.investMaxAdd*100).toFixed(0)+"%p 상단":""}`.trim(),e.investMaxAdd>0]),e.vipVaultAdd>0&&s.push(["VIP 금고 이자/일",`+${(e.vipVaultAdd*100).toFixed(3)}%`,!0]),e.vipGainMult!==1&&s.push(["VIP 점수 획득",`×${e.vipGainMult.toFixed(1)}`,!0]),e.cardCashbackVip>0&&s.push(["카드 납부 보상",`VIP +${e.cardCashbackVip} (현금 캐시백 없음)`,!0]);const i=t.expiresAt?Math.max(0,F(t.expiresAt)-Date.now()):0;return`<div class="bk-card event-fx ev-${C(t.type)}" style="grid-column:1/-1">
    <h3>📰 오늘의 금융 이벤트 · ${C(t.title)} ${t.expiresAt?`<small class="muted">남은 ${jt(i)}</small>`:'<small class="muted">날짜 기반</small>'}</h3>
    <p class="bk-note">${C(t.desc||"")} <i class="muted">(게임머니 금융 이벤트)</i></p>
    <div class="bk-grid" style="grid-template-columns:1fr 1fr;gap:8px">
    ${s.length?s.map(r=>`<div class="bk-row"><span>${C(r[0])}</span><b class="${r[2]?"ok":"warn"}">${C(r[1])}</b></div>`).join(""):'<div class="bk-row"><span>효과</span><b class="muted">표시·경고 위주(수익/할인 없음)</b></div>'}
    </div>
  </div>`}function Gv(){const t=gd(p.bank),e=n=>`${(n.base*100).toFixed(2)}%${n.now!==n.base?` → <b class="${n.now<n.base?"ok":"warn"}">${(n.now*100).toFixed(2)}%</b>`:""}`;return`<div class="bk-card">
    <h3>금리 비교 <span class="bk-tag ${t.eventActive?"safe":""}">${t.eventActive?"이벤트 반영":"기본"}</span></h3>
    <div class="bk-row"><span>자유예금 / 일</span><b>${e(t.free)}</b></div>
    <div class="bk-row"><span>대출 / 일</span><b>${e(t.loan)}</b></div>
    <div class="bk-row"><span>VIP 금고 / 일</span><b>${e(t.vipVault)}</b></div>
    <p class="bk-note">현재 금리는 오늘의 금융 이벤트가 반영된 <b>신규 거래 기준</b>입니다. 기존 투자상품 결과는 가입 당시 조건을 유지합니다.</p>
  </div>`}function va(t){return t=E(t),t<=0?{lv:0,label:"빈 금고"}:t<5e6?{lv:1,label:"소형 금고"}:t<5e7?{lv:2,label:"중형 금고"}:t<1e8?{lv:3,label:"대형 금고"}:{lv:4,label:"프리미엄 금고"}}function Kv(t){const e=va(t.balance),n=va(t.vipVaultBalance);return`<div class="bk-card vault-card ${t.vipTier==="BLACK"?"black":""}">
    <h3>금고</h3>
    <div class="vaults">
      <div class="vault lv-${e.lv}"><div class="vault-ico">🔐</div><span>자유예금</span><b>${v(t.balance)}</b><small>${e.label}</small></div>
      <div class="vault lv-${n.lv} ${mn(t)?"":"locked"}"><div class="vault-ico">${mn(t)?"💎":"🔒"}</div><span>VIP 금고</span><b>${v(t.vipVaultBalance)}</b><small>${mn(t)?n.label:"GOLD부터"}</small></div>
    </div>
  </div>`}const qv={STARTUP:"스타트업",SMALL_BIZ:"소기업",SCALE_UP:"성장기업",ENTERPRISE:"대기업",PRE_IPO:"상장 준비",LISTED:"상장기업"};function zv(){const t=p.company,e=p.bank.businessLoan||{},n=E(e.principal)+E(e.interest);return t?`<div class="bk-card"><h3>STONK Company <span class="bk-tag safe">${C(qv[t.stage]||t.stage)}</span><a class="bk-btn ghost small" href="../STONK-Company/index.html" style="float:right">회사 경영</a></h3>
    <div class="bk-row"><span>회사명</span><b>${C(t.name)}</b></div>
    <div class="bk-row"><span>회사 가치</span><b>${v(t.companyValue)}</b></div>
    <div class="bk-row"><span>IPO 준비도</span><b>${E(t.ipoReadiness)}%</b></div>
    <div class="bk-row"><span>사업대출(개인 대출과 별개)</span><b class="${n>0?"warn":""}">${n>0?v(n):"없음"}</b></div>
  </div>`:`<div class="bk-card"><h3>STONK Company <span class="bk-tag">v3.0</span><a class="bk-btn ghost small" href="../STONK-Company/index.html" style="float:right">회사 경영</a></h3>
      <p class="bk-empty">아직 설립한 회사가 없습니다. STONK Company에서 타이쿤 경영을 시작하세요.</p>
      ${n>0?`<div class="bk-row"><span>사업대출 잔액(개인 대출과 별개)</span><b class="warn">${v(n)}</b></div>`:""}</div>`}function Yv(){const t=(p.eventHistory||[]).slice(0,7).reverse();return t.length?`<div class="bk-card"><h3>최근 이벤트 이력 <small class="muted">금리 배율 변화</small></h3>
    <div class="bk-evh">${t.map(e=>{const n=e.effects||{},s=F(n.depositMult)||1,i=F(n.loanMult)||1;return`<div class="evh-col" title="${C(e.title||"")}"><div class="evh-bars"><i class="dep" style="height:${Math.min(100,s*55)}%"></i><i class="loan" style="height:${Math.min(100,i*55)}%"></i></div><small>${C(String(e.title||"").slice(0,4))}</small></div>`}).join("")}</div>
    <p class="bk-note"><i class="evh-key dep"></i> 예금배율 <i class="evh-key loan"></i> 대출배율 · eventEffects 기준(게임머니)</p>
  </div>`:'<div class="bk-card"><h3>이벤트 이력</h3><p class="bk-empty">최근 이벤트 기록 없음</p></div>'}const Qv={BASIC:"BASIC",GOLD:"GOLD",PLATINUM:"PLATINUM",BLACK:"BLACK"};function Jv(){return p.bank&&p.bank.card||{}}function ba(t){try{if(yd())return;const e=(an[t]||{}).limit||0,n=document.createElement("div");n.className="bk-flip-dim",n.innerHTML=`<div class="bk-flip"><div class="bk-flip-inner">
      <div class="bk-flip-front"><span>STONK</span></div>
      <div class="bk-flip-back">${eo({enabled:!0,cardTier:t,cardLimit:e,usedAmount:0,billingAmount:0},!0)}</div>
    </div><p>STONK Card 발급 완료 · ${C(t)}</p></div>`,document.body.appendChild(n),requestAnimationFrame(()=>n.classList.add("go")),n.addEventListener("click",()=>n.remove()),setTimeout(()=>n.remove(),1600)}catch{}}function eo(t,e){const n=t.cardTier||"BASIC",s=E(t.usedAmount),i=E(t.cardLimit)||1,r=Math.min(100,Math.round(s/i*100)),o=t.lost||t.suspended?"suspended":t.overdue?"overdue":r>=80?"near":"",a=t.cardDisplayId&&C(t.cardDisplayId).replace(/[^0-9]/g,"").slice(-4)||String(1e3+r%9e3).slice(-4),l=t.lost?"분실":t.suspended?"정지":t.overdue?"미납":"";return`<div class="stonk-card tier-${n} ${o} ${e?"compact":""}">
    <div class="sc-top"><span class="sc-brand">STONK</span><span class="sc-tier">${Qv[n]||n}</span></div>
    <div class="sc-num">•••• •••• •••• ${a}</div>
    <div class="sc-foot"><span>사용 ${v(s)} / 한도 ${v(t.cardLimit)}</span>${l?`<b class="sc-flag">${l}</b>`:""}</div>
    <div class="sc-gauge"><span style="width:${r}%"></span></div>
  </div>`}function Xv(){const t=Jv(),e=md(p.bank),n=Sv(t),s=Math.max(E(t.billingAmount),E(t.usedAmount)),i=E(t.dueAt)>0?Math.max(0,E(t.dueAt)-Date.now()):0;if(!t.enabled)return`${ga()}
      <div class="bk-grid">
        <div class="bk-card">
          <h3>STONK Card 발급 <span class="bk-tag risk">게임머니 신용카드</span></h3>
          <p class="bk-note">현금이 부족해도 한도 내에서 Gacha·Arcade 결제가 가능한 <b>게임머니 신용 결제 수단</b>입니다. 실제 결제가 아닙니다.</p>
          ${Ii.map(c=>{const d=an[c],u=pa(p.bank,c);return`<label class="bk-product ${u?"":"locked"}"><input type="radio" name="cardTier" value="${c}" ${c===e?"checked":""} ${u?"":"disabled"}/>
              <span><b>${d.title} ${u?'<small class="bk-tag safe">발급 가능</small>':'<small class="bk-tag risk">조건 미달</small>'}</b>
              <small>한도 ${v(d.limit)} · 조건 신용 ${d.minGrade}↑ 또는 VIP ${kt(d.minVip)}↑ · ${C(d.perk)}</small></span></label>`}).join("")}
          <button class="bk-btn primary" data-act="cardIssue" ${e?"":"disabled"}>${e?"카드 발급":"발급 조건 미달"}</button>
        </div>
        <div class="bk-card"><h3>안내</h3><p class="bk-note">카드 사용액은 즉시 차감되지 않고 누적되어 <b>24시간 뒤 청구</b>됩니다. 청구 후 12시간 내 미납 시 신용점수가 하락하고, 미납이 누적되면 카드가 정지됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p></div>
      </div>`;const r=Ii[Ii.indexOf(t.cardTier)+1],o=r&&pa(p.bank,r)&&!t.overdue&&s<=0,a=_d(t),l=an[t.cardTier]?an[t.cardTier].perk:"";return`${ga()}
    <div class="bk-grid">
      <div class="bk-card">
        <h3>내 카드</h3>
        ${eo(t)}
        <div class="bk-row"><span>남은 한도</span><b>${v(n)}</b></div>
        <div class="bk-row"><span>청구 예정/청구액</span><b class="${s>0?"warn":""}">${v(s)}</b></div>
        <div class="bk-row"><span>결제일</span><b>${E(t.dueAt)>0?i>0?"D-"+jt(i):"도래(납부 필요)":"이용 없음"}</b></div>
        <div class="bk-row"><span>자동납부</span><b>${t.autoPayEnabled?mt("ON · "+(t.autoPayMode==="minimum"?"최소":"전액"),"ok"):mt("OFF","muted")}</b></div>
        <div class="bk-row"><span>상태</span><b>${t.lost?mt("분실","danger"):t.suspended?mt("정지","danger"):t.overdue?mt("미납","danger"):mt("정상","ok")}</b></div>
        <div class="bk-quick">
          <button class="bk-btn ghost small ${t.autoPayEnabled&&t.autoPayMode!=="minimum",""}" data-act="autoPayFull">${t.autoPayEnabled&&t.autoPayMode==="full"?"✓ 전액 자동납부":"전액 자동납부"}</button>
          <button class="bk-btn ghost small" data-act="autoPayMin">${t.autoPayEnabled&&t.autoPayMode==="minimum"?"✓ 최소 자동납부":"최소 자동납부"}</button>
          <button class="bk-btn ghost small" data-act="autoPayOff" ${t.autoPayEnabled?"":"disabled"}>끄기</button>
        </div>
        <p class="bk-note">${t.autoPayEnabled?t.autoPayMode==="minimum"?"최소 자동납부 ON — 최소납부 후에도 남은 청구액이 있으면 청구 상태가 유지됩니다.":"전액 자동납부 ON — 결제일에 현금이 충분하면 청구액이 자동 납부됩니다.":"자동납부를 켜면 결제일에 자동으로 납부됩니다."}</p>
        <div class="bk-quick">${t.lost?`<button class="bk-btn danger small" data-act="cardReissue">카드 재발급 (${v(vd(t,p.bank))})</button>`:'<button class="bk-btn ghost small" data-act="cardLost">카드 분실 신고</button>'}</div>
        ${t.lost?'<p class="bk-note danger">분실 신고된 카드입니다. 재발급 전까지 Gacha/Arcade/Company 결제가 불가합니다. (게임머니 카드 시나리오)</p>':""}
      </div>
      <div class="bk-card">
        <h3>납부</h3>
        <div class="bk-row"><span>남은 청구액</span><b class="${s>0?"warn":""}">${v(s)}</b></div>
        <div class="bk-row"><span>납부 가능 현금</span><b>${v(p.cash)}</b></div>
        <div class="bk-amount"><input id="cardPayAmt" type="number" inputmode="numeric" placeholder="납부 금액" min="1" /><span class="bk-suffix">원</span></div>
        <small class="muted" id="cardPayPreview"></small>
        <div class="bk-quick">
          <button class="bk-btn ghost" data-fill="cardPayAmt:maxpay">전액 ${v(Math.min(s,E(p.cash)))}</button>
          <button class="bk-btn ghost" data-fill="cardPayAmt:minpay">최소 ${v(a)}</button>
        </div>
        <div class="bk-btnrow"><button class="bk-btn primary" data-act="cardPay" ${s>0?"":"disabled"}>납부하기</button>
          ${t.suspended?'<button class="bk-btn" data-act="cardRestore">카드 복구</button>':o?`<button class="bk-btn" data-act="cardUpgrade" data-tier="${r}">${an[r].title} 업그레이드</button>`:`<button class="bk-btn" disabled>${s>0?"납부 후 업그레이드":"최고 등급"}</button>`}</div>
        <p class="bk-note">최소납부 = max(청구 10%, 100만). <b>전액 납부 시</b> 미납·정지가 해제되고 신용이 소폭 회복됩니다. 혜택: ${C(l)} · 모든 금액은 게임머니입니다.</p>
      </div>
    </div>
    ${Zv()}
    ${nb()}`}function Zv(){const t=p.bank.card||{},e=Dv(p.tx||[],t),n=Math.max(1,e.cat.gacha,e.cat.arcade,e.cat.company,e.cat.etc),s=(i,r,o)=>`<div class="bk-stmt-row"><span>${i}</span><div class="bk-stmt-bar"><i class="${o}" style="width:${Math.round(r/n*100)}%"></i></div><b>${v(r)}</b></div>`;return`<div class="bk-card">
    <h3>카드 명세서 <small class="muted">${C(e.periodKey)} · 게임머니 사용 요약</small><button class="bk-btn ghost small" data-act="stmtRefresh" style="float:right">새로고침</button></h3>
    <div class="bk-row"><span>이번 달 사용 / 납부</span><b>${v(e.used)} / ${v(e.paid)}</b></div>
    <div class="bk-row"><span>미납액 / 사용 건수</span><b class="${e.overdue>0?"warn":""}">${v(e.overdue)} · ${e.count}건</b></div>
    <div class="bk-stmt">
      ${s("Gacha",e.cat.gacha,"g")}
      ${s("Arcade",e.cat.arcade,"a")}
      ${s("Company",e.cat.company,"c")}
      ${s("기타",e.cat.etc,"e")}
    </div>
    <p class="bk-note">실제 카드 명세서가 아닌 <b>게임머니 카드 사용 요약</b>입니다. 생성 ${Gn(e.generatedAt)}</p>
  </div>`}const eb=[["all","전체"],["use","사용"],["bill","청구"],["pay","납부"],["risk","미납/정지"]],tb={all:null,use:["card_use","card_issue","card_upgrade"],bill:["card_bill"],pay:["card_pay","card_restore"],risk:["card_overdue","card_suspend"]};function nb(){const t=(p.tx||[]).filter(i=>String(i.type||"").startsWith("card_")),e=tb[Qi],n=(e?t.filter(i=>e.includes(i.type)):t).slice(0,50),s=(p.bank.card||{}).cardTier||"";return`<div class="bk-card">
    <h3>카드 사용 내역 ${s?`<span class="bk-tag safe">${s}</span>`:""}<small class="muted"> 최근 ${n.length}건</small></h3>
    <div class="bk-filters">${eb.map(([i,r])=>`<button class="bk-chipbtn ${Qi===i?"active":""}" data-cardhist="${i}">${r}</button>`).join("")}</div>
    ${n.length?`<ul class="bk-tx">${n.map(to).join("")}</ul>`:'<p class="bk-empty">카드 사용 내역이 없습니다.</p>'}
  </div>`}const sb={insurance:"🛡️",investment:"📈",fixed:"🏦",vip:"👑",loan:"⚠️",admin:"🛠️",system:"🔔"};function Ed(t){const e=sb[t.type]||"🔔";return`<li class="bk-msg ${t.read?"":"unread"}" ${t.id&&!String(t.id).startsWith("local-")?`data-msgread="${C(t.id)}"`:""}>
    <span class="bk-msg-ico">${e}</span>
    <div class="bk-msg-mid"><b>${C(t.title)}</b><small>${C(t.body)}</small><i class="bk-msg-time">${Gn(t.createdAt)}</i></div>
    ${t.actionUrl?`<a class="bk-btn ghost small" href="${C(t.actionUrl)}">${C(t.actionLabel||"이동")}</a>`:""}
    ${t.read?"":'<span class="bk-msg-new">N</span>'}</li>`}function ib(){const t=(p.msgs||[]).slice(0,30);return`<div class="bk-card">
    <h3>알림 / 우편함 <small class="muted">안읽음 ${p.unread||0} · 최근 ${t.length}건</small>
      ${p.unread>0?'<button class="bk-btn ghost small" data-allread style="float:right">전체 읽음</button>':""}</h3>
    ${t.length?`<ul class="bk-msgs">${t.map(Ed).join("")}</ul>`:'<p class="bk-empty">받은 알림이 없습니다.</p>'}
    <p class="bk-note">보험 적용·투자/정기 만기·VIP 승급 등 금융 이벤트가 여기에 기록됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p>
  </div>`}function rb(){if(ma||!p||!p.feed)return;ma=!0;const t=p.feed,e=[];t.applied&&t.freeInt>0&&e.push(`자유예금 이자 +${v(t.freeInt)} 정산`),t.applied&&t.vipInt>0&&e.push(`VIP 금고 이자 +${v(t.vipInt)} 정산`),t.applied&&t.loanInt>0&&e.push(`대출 이자 +${v(t.loanInt)} 반영`),t.maturedFixed>0&&e.push(`정기예금 만기 ${t.maturedFixed}건`),t.maturedInvest>0&&e.push(`투자 정산 가능 ${t.maturedInvest}건`),e.length&&On(e.join(" · "),t.loanInt>0&&!t.freeInt?"warn":"ok")}function ob(){const t=p.feed;if(!t)return"";const e=[];return t.applied&&t.freeInt>0&&e.push(`<span class="ok">자유예금 이자 +${v(t.freeInt)}</span>`),t.applied&&t.vipInt>0&&e.push(`<span class="ok">VIP 금고 이자 +${v(t.vipInt)}</span>`),t.applied&&t.loanInt>0&&e.push(`<span class="warn">대출 이자 +${v(t.loanInt)}</span>`),t.maturedFixed>0&&e.push(`<span>정기예금 만기 ${t.maturedFixed}건</span>`),t.maturedInvest>0&&e.push(`<span>투자 정산 가능 ${t.maturedInvest}건</span>`),e.length?`<div class="bk-feed">🔔 ${e.join(" · ")}</div>`:""}function ab(){const t=p.bank,e=ni(t.creditScore),n=se(t.creditScore),s=hd(p.cash,t),i=fv(p.cash,t),r=pv(p.cash,t),o=p.feed||{},a=o.applied?E(o.freeInt)+E(o.vipInt):0,l=Object.values(t.investments||{}),c=l.filter(y=>Date.now()>=F(y.maturesAt)).length,d=l.reduce((y,b)=>y+(Date.now()>=F(b.maturesAt)?pd(b).profit:0),0),u=mv(t),f=(p.tx||[]).slice(0,3),m=t.card||{},g=Math.max(E(m.billingAmount),E(m.usedAmount));return`
    ${ob()}
    <div class="bk-grid">
      ${jv()}
      <div class="bk-card net-hero">
        <h3>순자산</h3>
        <div class="bk-net-big ${s<0?"minus":""}">${v(s)}</div>
        <div class="bk-chips">
          <span class="bk-chip"><i>현금</i>${v(p.cash)}</span>
          <span class="bk-chip"><i>예금</i>${v(E(t.balance)+ud(t))}</span>
          <span class="bk-chip"><i>VIP금고</i>${v(t.vipVaultBalance)}</span>
          <span class="bk-chip"><i>투자</i>${v(uv(t))}</span>
          <span class="bk-chip ${E(t.loanPrincipal)>0?"warn":""}"><i>대출</i>${v(E(t.loanPrincipal)+E(t.loanInterest))}</span>
        </div>
      </div>

      <div class="bk-card credit">
        <h3>신용등급 <span class="bk-tag ${n>=75?"safe":"risk"}">${e}</span></h3>
        <div class="bk-credit"><div class="bk-grade-big g-${e}">${e}</div><div class="bk-score"><div class="bk-score-bar"><span style="width:${n}%"></span></div><small>${n} / 100 · 한도 ${v(Zr(e))}</small></div></div>
        <div class="bk-row"><span>VIP 등급</span><b>${Ms(t.vipTier)} <small class="muted">${t.vipScore}점</small></b></div>
      </div>

      <div class="bk-card">
        <h3>리스크 진단</h3>
        <div class="bk-row"><span>대출 위험도</span><b>${mt(i.label,i.tone)}${i.eased?' <small class="muted">유예권 적용</small>':""}</b></div>
        <div class="bk-row"><span>예금 안정도</span><b class="${r.tone==="ok"?"ok":"muted"}">${r.label}</b></div>
        <div class="bk-row"><span>오늘 정산 이자</span><b class="${a>0?"ok":"muted"}">${a>0?"+"+v(a):"정산 없음"}</b></div>
        ${i.key==="high"||i.key==="severe"?'<p class="bk-note danger">자산 대비 대출 비중이 높습니다. 상환을 권장합니다.</p>':""}
      </div>

      ${Kv(t)}
      ${Gv()}

      <div class="bk-card">
        <h3>보험 <span class="bk-tag safe">${u.length}건 유효</span></h3>
        ${u.length?u.map(y=>`<div class="bk-row"><span>${C(y.title)}</span><b class="ok">유효</b></div>`).join(""):'<p class="bk-empty">가입한 보험이 없습니다.</p>'}
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
        <div class="bk-row"><span>등급 / 점수</span><b>${Ms(t.vipTier)} ${t.vipScore}점</b></div>
        <div class="bk-row"><span>VIP 금고</span><b>${v(t.vipVaultBalance)} <small class="muted">${mn(t)?"":"· 잠금"}</small></b></div>
        <button class="bk-btn ghost small" data-tab="vip">VIP 보기</button>
      </div>

      <div class="bk-card">
        <h3>알림 <span class="bk-tag ${p.unread>0?"risk":"safe"}">안읽음 ${p.unread||0}</span><button class="bk-btn ghost small" data-tab="messages" style="float:right">전체 보기</button></h3>
        ${(p.msgs||[]).length?`<ul class="bk-msgs mini">${(p.msgs||[]).slice(0,3).map(Ed).join("")}</ul>`:'<p class="bk-empty">받은 알림이 없습니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>STONK Card <span class="bk-tag ${m.suspended||m.overdue?"risk":m.enabled?"safe":""}">${m.enabled?m.lost?"분실":m.suspended?"정지":m.overdue?"미납":"정상":"미발급"}</span><button class="bk-btn ghost small" data-tab="card" style="float:right">카드</button></h3>
        ${m.enabled?eo(m,!0)+`<div class="bk-row"><span>청구 예정/청구</span><b class="${g>0?"warn":""}">${v(g)}</b></div>`:'<p class="bk-empty">카드를 발급하면 한도 내 게임머니 신용 결제가 가능합니다.</p>'}
      </div>

      ${zv()}
      ${Yv()}

      <div class="bk-card">
        <h3>Activity Feed <small class="muted">최근 활동</small></h3>
        ${ya().length?`<ul class="bk-activity">${ya().slice(0,8).map(db).join("")}</ul>`:'<p class="bk-empty">최근 활동이 없습니다.</p>'}
      </div>

      <div class="bk-card">
        <h3>최근 거래 <button class="bk-btn ghost small" data-tab="history" style="float:right">전체 보기</button></h3>
        ${f.length?`<ul class="bk-tx mini">${f.map(to).join("")}</ul>`:'<p class="bk-empty">거래내역이 없습니다.</p>'}
      </div>
    </div>`}function mt(t,e){return`<span class="bk-status ${e}">${C(t)}</span>`}function Ms(t){return`<span class="bk-vip v-${t||"NORMAL"}">${C(kt(t))}</span>`}const lb={deposit:"🏦",withdraw:"🏧",fixedOpen:"📦",fixedCancel:"📦",fixedClaim:"📦",loan:"📝",repay:"✅",interest:"💰",loanInterest:"⚠️",vipInterest:"👑",insurance_buy:"🛡️",insurance_used:"🛡️",investment_buy:"📈",investment_settle:"📊",vip_deposit:"👑",vip_withdraw:"👑",vip_tier_up:"⭐",card_issue:"💳",card_upgrade:"💳",card_use:"💳",card_pay:"✅",card_bill:"🧾",card_overdue:"🚨",card_suspend:"⛔",card_restore:"🔓",admin_adjust:"🛠️"};function cb(t){const e=E(t.amount);switch(t.type){case"deposit":return`예금 ${v(e)}이 금고에 보관되었습니다.`;case"withdraw":return`예금 ${v(Math.abs(e))}을 인출했습니다.`;case"loan":return`대출 ${v(e)}이 승인되었습니다.`;case"repay":return`대출 ${v(Math.abs(e))}을 상환했습니다.`;case"fixedClaim":return`정기예금 ${v(e)}을 수령했습니다.`;case"investment_settle":return`${t.title}${t.memo?" · "+t.memo:""}`;case"insurance_used":return`${t.title}.`;case"card_issue":return"STONK Card가 발급되었습니다.";case"card_use":return`STONK Card 결제가 승인되었습니다. (${v(e)})`;case"card_pay":return`카드 청구액 ${v(Math.abs(e))}이 납부되었습니다.`;case"card_overdue":return"카드 미납이 발생했습니다.";case"vip_tier_up":return`VIP 등급이 상승했습니다.${t.memo?" ("+t.memo+")":""}`;default:return`${t.title||t.type}${e?" · "+(e>=0?"+":"−")+v(Math.abs(e)):""}`}}function ya(){return(p.tx||[]).slice(0,12)}function db(t){return`<li class="bk-act"><span class="bk-act-ico">${lb[t.type]||"•"}</span><span class="bk-act-text">${C(cb(t))}</span><i class="bk-act-time">${Gn(t.createdAt)}</i></li>`}function ub(){const t=p.tx||[],e=Object.values(p.bank&&p.bank.insurances||{}),n=e.filter(a=>a.status==="used").length,s=e.filter(a=>a.status==="expired").length;let i=0,r=0,o=0;return t.forEach(a=>{a.type==="insurance_used"&&(/Arcade/.test(a.title||"")?i+=E(a.amount):/Gacha/.test(a.title||"")?r+=1:/유예/.test(a.title||"")&&(o+=1))}),{total:e.length,used:n,expired:s,arcadeRefund:i,gachaDust:r,loanGrace:o}}function hb(){const t=p.bank,e=Object.values(t.fixed||{}).sort((s,i)=>F(s.maturesAt)-F(i.maturesAt)),n=Date.now();return`
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
        <p class="bk-note">보유 현금 ${v(p.cash)} · 이자 하루 ${(Sn*100).toFixed(1)}%</p>
      </div>

      <div class="bk-card">
        <h3>정기예금 <span class="bk-tag safe">묶을수록 이자↑</span></h3>
        ${Object.values(lv).map(s=>`
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
      ${e.length?`<div class="bk-fixedlist">${e.map(s=>{const i=n>=F(s.maturesAt),r=Math.max(0,F(s.maturesAt)-n),o=Math.floor(E(s.amount)*F(s.rate));return`<div class="bk-fixed ${i?"matured":""}">
          <div><b>${C(s.label)}</b><small>${v(s.amount)} · 이자 ${v(o)} ${i?"· <span class='ok'>만기 완료</span>":"· 남은 시간 "+jt(r)}</small></div>
          <div class="bk-fixed-act">
            ${i?`<button class="bk-btn primary small" data-claim="${C(s.id)}">수령하기</button>`:`<button class="bk-btn small" data-cancel="${C(s.id)}">중도해지</button>`}
          </div>
        </div>`}).join("")}</div>`:'<p class="bk-empty">가입한 정기예금이 없습니다.</p>'}
    </div>`}function fb(){const t=p.bank,e=ni(t.creditScore),n=Zr(e),s=Math.max(0,n-E(t.loanPrincipal));return`
    <div class="bk-grid">
      <div class="bk-card loanbox">
        <h3>대출 받기 <span class="bk-tag risk">위험</span></h3>
        <div class="bk-row"><span>내 등급 / 한도</span><b>${Id(e)} ${v(n)}</b></div>
        <div class="bk-row"><span>추가 대출 가능</span><b>${v(s)}</b></div>
        <div class="bk-amount">
          <input id="loanAmt" type="number" inputmode="numeric" placeholder="대출 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="loanAmt:maxloan">최대</button></div>
        <button class="bk-btn danger" data-act="loan" ${n<=0?"disabled":""}>대출 받기</button>
        <p class="bk-note danger">이자 하루 ${(An*100).toFixed(1)}% — 갚지 않으면 빠르게 불어나고 신용등급이 떨어집니다.</p>
      </div>

      <div class="bk-card">
        <h3>상환하기</h3>
        <div class="bk-row"><span>대출 원금</span><b class="${E(t.loanPrincipal)>0?"warn":""}">${v(t.loanPrincipal)}</b></div>
        <div class="bk-row"><span>누적 이자</span><b class="${E(t.loanInterest)>0?"warn":""}">${v(t.loanInterest)}</b></div>
        <div class="bk-row total"><span>상환할 금액</span><b>${v(E(t.loanPrincipal)+E(t.loanInterest))}</b></div>
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
    </div>`}const pb={deposit:["입금","in"],withdraw:["출금","out"],fixedOpen:["정기가입","out"],fixedCancel:["중도해지","in"],fixedClaim:["만기수령","in"],loan:["대출","in"],repay:["상환","out"],interest:["예금이자","in"],loanInterest:["대출이자","out"],vipInterest:["VIP이자","in"],insurance_buy:["보험가입","out"],insurance_expired:["보험만료","out"],insurance_used:["보험사용","in"],investment_buy:["투자가입","out"],investment_settle:["투자정산","in"],investment_cancel:["투자해지","in"],vip_deposit:["VIP입금","in"],vip_withdraw:["VIP출금","out"],vip_tier_up:["VIP승급","in"],card_issue:["카드발급","in"],card_upgrade:["카드전환","in"],card_use:["카드결제","out"],card_bill:["카드청구","out"],card_pay:["카드납부","out"],card_overdue:["카드미납","out"],card_suspend:["카드정지","out"],card_restore:["카드복구","in"],admin_adjust:["관리자조정","in"],biz_loan:["사업대출","in"],biz_repay:["사업상환","out"]},wa={all:null,deposit:["deposit","withdraw"],fixed:["fixedOpen","fixedCancel","fixedClaim"],loan:["loan","repay"],interest:["interest","loanInterest","vipInterest"],insurance:["insurance_buy","insurance_expired","insurance_used"],invest:["investment_buy","investment_settle","investment_cancel"],vip:["vip_deposit","vip_withdraw","vip_tier_up"],card:["card_issue","card_upgrade","card_use","card_bill","card_pay","card_overdue","card_suspend","card_restore"]},Ci={all:"전체",deposit:"예금",fixed:"정기예금",loan:"대출",interest:"이자",insurance:"보험",invest:"투자",vip:"VIP",card:"카드"};function to(t){const e=pb[t.type]||[t.type,"in"],n=E(t.amount),s=n>=0?"plus":"minus";return`<li><span class="bk-tx-badge t-${e[1]}">${e[0]}</span>
    <div class="bk-tx-mid"><b>${C(t.title||e[0])}</b><small>${Gn(t.createdAt)}${t.memo?" · "+C(t.memo):""}</small></div>
    <b class="bk-tx-amt ${s}">${n>=0?"+":"−"}${v(Math.abs(n))}</b></li>`}function mb(){const t=p.tx||[],e=wa[ln],n=(e?t.filter(s=>e.includes(s.type)):t).slice(0,50);return`<div class="bk-card">
    <h3>거래내역 <small class="muted">${Ci[ln]} · ${n.length}건</small></h3>
    <div class="bk-filters">
      ${Object.keys(wa).map(s=>`<button class="bk-chipbtn ${ln===s?"active":""}" data-filter="${s}">${Ci[s]}</button>`).join("")}
    </div>
    ${n.length?`<ul class="bk-tx">${n.map(to).join("")}</ul>`:`<p class="bk-empty">${Ci[ln]} 거래내역이 없습니다.</p>`}
  </div>`}const _b={arcade:"Arcade에서 100만원 이상 손실 시 1회에 한해 손실액의 10%를 환급합니다. (자동 적용)",gacha:"10회 뽑기에서 Epic 이상이 없거나 Common이 8개 이상일 때 Dust 300을 지급합니다. (자동 적용)",loan:"대출 실행 또는 대출 위험도 하락 시 신용점수 하락을 1회 완화합니다. (자동 적용)"};function gb(t,e){return t.status==="used"?'<span class="bk-status ok">사용됨</span>':t.status==="expired"||F(t.expiresAt)<=e?'<span class="bk-status muted">만료</span>':'<span class="bk-status warn">활성</span>'}function vb(){const t=p.bank,e=Date.now(),n=t.vipTier||"NORMAL",s=Iv(n),i=Object.values(t.insurances||{}),r=i.filter(o=>o.status==="used").sort((o,a)=>F(a.usedAt)-F(o.usedAt)).slice(0,3);return`
    <div class="bk-grid">
      ${Object.values(fd).map(o=>{const a=i.find(c=>c.type===o.id&&wi(c,e)),l=Math.max(1,Math.floor(o.premium*(1-s)));return`<div class="bk-card">
          <h3>${C(o.title)} ${a?'<span class="bk-tag safe">가입중</span>':'<span class="bk-tag risk">게임머니 보호</span>'}</h3>
          <p class="bk-note">${C(_b[o.id]||o.desc)}</p>
          <div class="bk-row"><span>가입비</span><b>${s>0?`<s class="muted">${v(o.premium)}</s> ${v(l)}`:v(o.premium)}</b></div>
          ${s>0?`<div class="bk-row"><span>VIP 할인</span><b class="ok">${kt(n)} ${Math.round(s*100)}%</b></div>`:""}
          ${a?`<div class="bk-row"><span>만료까지</span><b class="ok">${jt(Math.max(0,F(a.expiresAt)-e))}</b></div>
               <button class="bk-btn" disabled>가입 중</button>`:`<button class="bk-btn primary" data-buyins="${o.id}">${v(l)} 가입하기</button>`}
        </div>`}).join("")}
    </div>
    <div class="bk-card">
      <h3>보험 통계 <small class="muted">게임머니 보호 기능</small></h3>
      ${(()=>{const o=ub();return`
        <div class="bk-row"><span>총 가입 / 사용됨 / 만료</span><b>${o.total} / <span class="ok">${o.used}</span> / <span class="muted">${o.expired}</span></b></div>
        <div class="bk-row"><span>Arcade 보험 총 환급액</span><b>${v(o.arcadeRefund)}</b></div>
        <div class="bk-row"><span>Gacha 보호권 지급</span><b>${o.gachaDust}회</b></div>
        <div class="bk-row"><span>대출 유예권 사용</span><b>${o.loanGrace}회</b></div>`})()}
    </div>
    ${r.length?`<div class="bk-card">
      <h3>최근 보험 적용 기록</h3>
      <div class="bk-fixedlist">${r.map(o=>`<div class="bk-fixed matured"><div><b>${C(o.title)}</b><small>${o.usedAt?Gn(o.usedAt)+" 적용됨":"적용됨"}</small></div><span class="bk-status ok">사용됨</span></div>`).join("")}</div>
    </div>`:""}
    <div class="bk-card">
      <h3>내 보험 내역</h3>
      ${i.length?`<div class="bk-fixedlist">${i.sort((o,a)=>F(a.startedAt)-F(o.startedAt)).map(o=>`
        <div class="bk-fixed ${wi(o,e)?"matured":""}">
          <div><b>${C(o.title)}</b><small>${v(o.premium)} · ${wi(o,e)?"만료 "+jt(Math.max(0,F(o.expiresAt)-e)):o.status==="used"?"보상 적용 완료":"만료됨"}</small></div>
          ${gb(o,e)}
        </div>`).join("")}</div>`:'<p class="bk-empty">가입 이력이 없습니다.</p>'}
      <p class="bk-note">보험은 손실을 완화/보호하는 <b>게임머니 보호 기능</b>입니다. 무한 증식 수단이 아닙니다.</p>
    </div>`}function bb(){const t=p.bank,e=Date.now(),n=Object.values(t.investments||{}).sort((s,i)=>F(s.maturesAt)-F(i.maturesAt));return`
    <div class="bk-grid">
      <div class="bk-card">
        <h3>투자상품 가입 <span class="bk-tag risk">원금 손실 가능</span></h3>
        ${[...Object.values(cv),...Object.values(dv)].map(s=>{const i=s.requiredVipTier&&Os(t.vipTier)<Os(s.requiredVipTier);return`<label class="bk-product ${i?"locked":""}"><input type="radio" name="invProd" value="${s.id}" ${s.id==="stable"?"checked":""} ${i?"disabled":""}/>
            <span><b>${C(s.title)} <small class="bk-risk r-${C(s.risk)}">${C(s.risk)}</small>${s.requiredVipTier?` <small class="bk-tag ${i?"risk":"safe"}">${kt(s.requiredVipTier)} 전용</small>`:""}</b>
            <small>${Ib(s.ms)} · 예상 ${(s.min*100).toFixed(0)}% ~ +${(s.max*100).toFixed(0)}%${i?` · ${kt(s.requiredVipTier)} 등급 필요`:""}</small></span></label>`}).join("")}
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
      ${n.length?`<div class="bk-fixedlist">${n.map(s=>{const i=e>=F(s.maturesAt),r=i?pd(s):null,[o,a]=r?hv(r.rate):["",""],l=F(s.startedAt)||F(s.maturesAt)-1,c=i?100:Math.max(0,Math.min(100,Math.round((e-l)/(F(s.maturesAt)-l)*100))),d=`예상 ${(F(s.expectedMinRate)*100).toFixed(0)}% ~ +${(F(s.expectedMaxRate)*100).toFixed(0)}%`;return`<div class="bk-fixed ${i?"matured":""}">
          <div style="flex:1;min-width:0"><b>${C(s.title)}${s.productType==="pbond"||s.productType==="bsecret"?' <small class="bk-tag safe">VIP</small>':""}</b><small>${v(s.principal)} · ${i?`<span class="inv-${a}">${o} ${r.rate>=0?"+":"−"}${v(Math.abs(r.profit))}</span>`:`${d} · 남은 ${jt(Math.max(0,F(s.maturesAt)-e))}`}</small>
            <div class="inv-progress"><span style="width:${c}%"></span></div></div>
          <div class="bk-fixed-act">${i?`<button class="bk-btn primary small" data-claiminv="${C(s.id)}">수령하기</button>`:`<span class="bk-tag">운용중 ${c}%</span>`}</div>
        </div>`}).join("")}</div>`:'<p class="bk-empty">보유한 투자상품이 없습니다.</p>'}
    </div>`}const yb={NORMAL:["기본 Bank 기능 사용"],SILVER:["보험 가입비 3% 할인","거래내역 SILVER 표시"],GOLD:["VIP 금고 사용 가능","보험 가입비 5% 할인","VIP 금고 이자 하루 0.30%"],PLATINUM:["VIP 금고 이자 하루 0.35%","보험 가입비 8% 할인","PLATINUM 안정 채권 해금"],BLACK:["VIP 금고 이자 하루 0.40%","보험 가입비 10% 할인","BLACK 시크릿 펀드 해금","대시보드 BLACK 전용 효과"]};function wb(){const t=p.bank,e=mn(t),n=t.vipTier||"NORMAL",s=Ev(n)||wv;return`
    <div class="bk-grid">
      <div class="bk-card credit ${n==="BLACK"?"black-card":""}">
        <h3>VIP 등급 ${n==="BLACK"?'<span class="bk-tag" style="background:#14151c;color:#f0d488">BLACK 혜택 활성화</span>':""}</h3>
        <div class="bk-credit"><div class="bk-grade-big v-${n}">${kt(n).slice(0,1)}</div>
          <div class="bk-score"><div class="bk-score-bar"><span style="width:${t.vipScore}%"></span></div><small>${kt(n)} · ${t.vipScore} / 100</small></div></div>
        <p class="bk-note">예금·정기·투자·보험 이용과 무대출·높은 순자산으로 VIP 점수가 오릅니다. GOLD 등급부터 VIP 금고가 열립니다.</p>
      </div>
      <div class="bk-card">
        <h3>등급별 혜택</h3>
        ${["SILVER","GOLD","PLATINUM","BLACK"].map(i=>`
          <div class="bk-row"><span>${Ms(i)}</span><b class="${Os(n)>=Os(i)?"ok":"muted"}" style="font-weight:600;font-size:12px;text-align:right">${yb[i].join(" · ")}</b></div>`).join("")}
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
    </div>`}function Ib(t){return Math.round(t/36e5)+"시간"}function jt(t){const e=Math.floor(t/36e5),n=Math.floor(t%36e5/6e4);return e>0?`${e}시간 ${n}분`:`${n}분`}function Gn(t){const e=new Date(F(t)||Date.now()),n=s=>(s<10?"0":"")+s;return`${e.getMonth()+1}/${n(e.getDate())} ${n(e.getHours())}:${n(e.getMinutes())}`}function Eb(){const t=K.querySelector("[data-home]");t&&t.addEventListener("click",s=>{s.preventDefault(),xs="dashboard",window.scrollTo(0,0),Re()}),K.querySelectorAll("[data-tab]").forEach(s=>s.addEventListener("click",()=>{xs=s.dataset.tab,Re()})),K.querySelectorAll("[data-fill]").forEach(s=>s.addEventListener("click",()=>Cb(s.dataset.fill))),K.querySelectorAll("[data-act]").forEach(s=>s.addEventListener("click",()=>kb(s.dataset.act))),K.querySelectorAll("[data-claim]").forEach(s=>s.addEventListener("click",()=>z(()=>sd(p.uid,s.dataset.claim,p)))),K.querySelectorAll("[data-cancel]").forEach(s=>s.addEventListener("click",()=>{confirm("정기예금을 중도해지하면 이자 없이 원금만 돌려받습니다. 해지할까요?")&&z(()=>nd(p.uid,s.dataset.cancel,p))})),K.querySelectorAll("[data-claiminv]").forEach(s=>s.addEventListener("click",()=>z(()=>vv(p.uid,s.dataset.claiminv,p)))),K.querySelectorAll("[data-buyins]").forEach(s=>s.addEventListener("click",()=>{const i=fd[s.dataset.buyins];i&&confirm(`${i.title} 가입비 ${v(i.premium)}을(를) 결제할까요? (게임머니)`)&&z(()=>_v(p.uid,s.dataset.buyins,p))})),K.querySelectorAll("[data-filter]").forEach(s=>s.addEventListener("click",()=>{ln=s.dataset.filter,Re()})),K.querySelectorAll("[data-cardhist]").forEach(s=>s.addEventListener("click",()=>{Qi=s.dataset.cardhist,Re()}));const e=K.querySelector("#cardPayAmt");e&&e.addEventListener("input",wd),K.querySelectorAll("[data-msgread]").forEach(s=>s.addEventListener("click",()=>{const i=(p.msgs||[]).find(r=>r.id===s.dataset.msgread);i&&!i.read&&(i.read=!0,p.unread=Tv(p.msgs),Cv(p.uid,i.id).catch(()=>{}),Re())}));const n=K.querySelector("[data-allread]");n&&n.addEventListener("click",()=>{kv(p.uid,p.msgs).catch(()=>{}),(p.msgs||[]).forEach(s=>{s.read=!0}),p.unread=0,Re()})}function Cb(t){const[e,n]=t.split(":"),s=document.getElementById(e);if(!s)return;const i=p.bank;let r=0;if(n==="maxin")r=E(p.cash);else if(n==="maxout")r=E(i.balance);else if(n==="maxvip")r=E(i.vipVaultBalance);else if(n==="maxloan")r=Math.max(0,Zr(ni(i.creditScore))-E(i.loanPrincipal));else if(n==="maxpay"){const o=i.card||{};r=Math.min(E(p.cash),Math.max(E(o.billingAmount),E(o.usedAmount)))}else n==="minpay"&&(r=_d(i.card));s.value=r>0?r:"",e==="cardPayAmt"&&wd()}function kb(t){var n;const e=p.bank;if(t==="deposit")return z(()=>Zc(p.uid,Ee("freeAmt"),p));if(t==="withdraw")return z(()=>ed(p.uid,Ee("freeAmt"),p));if(t==="openFixed"){const s=(K.querySelector('input[name="fixedProd"]:checked')||{}).value||"d1";return z(()=>td(p.uid,s,Ee("fixedAmt"),p))}if(t==="loan"){const s=Ee("loanAmt");return Xn(s,"대출 심사 중...",()=>id(p.uid,s,p))}if(t==="repay"){const s=Ee("repayAmt");return Xn(s,"상환 처리 중...",()=>Yi(p.uid,s,p))}if(t==="buyInvest"){const s=(K.querySelector('input[name="invProd"]:checked')||{}).value||"stable",i=Ee("invAmt");return Xn(i,"투자 계약 체결...",()=>gv(p.uid,s,i,p))}if(t==="vipDeposit")return z(()=>bv(p.uid,Ee("vipAmt"),p));if(t==="vipWithdraw")return z(()=>yv(p.uid,Ee("vipAmt"),p));if(t==="cardIssue"){const s=(K.querySelector('input[name="cardTier"]:checked')||{}).value||md(p.bank);if(!s){On("발급 가능한 카드 등급이 없습니다.","err");return}return z(async()=>{const i=await Av(p.uid,s,p);return ba(s),i})}if(t==="cardUpgrade"){const s=(n=(K.querySelector('[data-act="cardUpgrade"]')||{}).dataset)==null?void 0:n.tier;return z(async()=>{const i=await Rv(p.uid,s,p);return ba(s),i})}if(t==="cardRestore")return z(()=>Nv(p.uid,p));if(t==="autoPayToggle"){const s=!(p.bank.card||{}).autoPayEnabled;return z(()=>Jn(p.uid,s,"full",p))}if(t==="autoPayFull")return z(()=>Jn(p.uid,!0,"full",p));if(t==="autoPayMin")return z(()=>Jn(p.uid,!0,"minimum",p));if(t==="autoPayOff")return z(()=>Jn(p.uid,!1,"off",p));if(t==="cardLost")return confirm("카드를 분실 신고하면 즉시 사용이 정지됩니다. 진행할까요?")?z(()=>xv(p.uid,p)):void 0;if(t==="cardReissue"){const s=vd(p.bank.card,p.bank);return confirm(`카드 재발급 수수료 ${v(s)}을 결제할까요? (게임머니)`)?z(()=>Mv(p.uid,p)):void 0}if(t==="stmtRefresh"){Re();return}if(t==="cardPay"){const s=Ee("cardPayAmt");return Xn(s,"카드 승인 확인 중...",()=>Pv(p.uid,s,p))}if(t==="repayAll"){const s=E(e.loanPrincipal)+E(e.loanInterest);if(s<=0){On("상환할 대출이 없습니다.","err");return}return z(()=>Yi(p.uid,s,p))}}
