class n{static async login(s,e){try{return await(await fetch("http://zenx5.pro/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,password:e})})).json()}catch(t){return{error:!0,message:(t==null?void 0:t.message)??"Uknown error"}}}static async register(s,e,t,o){try{return await(await fetch("http://zenx5.pro/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:s,email:e,password:t,password_confirmation:o})})).json()}catch(r){return{error:!0,message:(r==null?void 0:r.message)??"Uknown error"}}}static async logout(s){try{return await(await fetch("http://zenx5.pro/api/logout",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s}})).json()}catch(e){return{error:!0,message:(e==null?void 0:e.message)??"Uknown error"}}}}export{n as U};
