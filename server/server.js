const express=require('\x65\x78\x70\x72\x65\x73\x73');const bodyParser=require("\x62\x6F\x64\x79\x2D\x70\x61\x72\x73\x65\x72");const app=express();const crypto=require('\x63\x72\x79\x70\x74\x6F');const jsonInfo=require('\x2E\x2F\x6D\x79\x49\x6E\x66\x6F\x73\x2E\x6A\x73\x6F\x6E');app["\x75\x73\x65"](bodyParser["\x6A\x73\x6F\x6E"]());app["\x75\x73\x65"](bodyParser["\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64"]({extended:true}));app["\x75\x73\x65"](bodyParser["\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64"]({extended:true}));const user="\x42\x61\x6E\x6B\x69\x6E\x55\x73\x65\x72";const password="\x31\x32\x33\x34\x35\x36\x37\x38";const clientId="\x42\x61\x6E\x6B\x69\x6E\x43\x6C\x69\x65\x6E\x74\x49\x64";const clientSecret="\x73\x65\x63\x72\x65\x74";let refresh_token=null;let access_token=null;app["\x67\x65\x74"]("\x2F",(req,res)=>{res["\x73\x65\x6E\x64"]('\x57\x65\x6C\x63\x6F\x6D\x65\x20\x74\x6F\x20\x62\x61\x6E\x6B\x69\x6E\x20\x74\x65\x63\x68\x6E\x69\x63\x61\x6C\x20\x74\x65\x73\x74\x20\x21')});app["\x70\x6F\x73\x74"]("\x2F\x6C\x6F\x67\x69\x6E",(req,res)=>{if(!req["\x68\x65\x61\x64\x65\x72\x73"]|| req["\x68\x65\x61\x64\x65\x72\x73"]["\x61\x75\x74\x68\x6F\x72\x69\x7A\x61\x74\x69\x6F\x6E"]!== "\x42\x61\x73\x69\x63\x20"+ Buffer["\x66\x72\x6F\x6D"](`${clientId}:${clientSecret}`).toString("\x62\x61\x73\x65\x36\x34")){return res["\x73\x74\x61\x74\x75\x73"](401)["\x73\x65\x6E\x64"]("\x4E\x6F\x74\x20\x61\x75\x74\x68\x6F\x72\x69\x7A\x65\x64")};if(!req["\x62\x6F\x64\x79"]||  !req["\x62\x6F\x64\x79"]["\x75\x73\x65\x72"] ||  !req["\x62\x6F\x64\x79"]["\x70\x61\x73\x73\x77\x6F\x72\x64"]){return res["\x73\x74\x61\x74\x75\x73"](400)["\x73\x65\x6E\x64"]("\x42\x61\x64\x20\x72\x65\x71\x75\x65\x73\x74")};if(req["\x62\x6F\x64\x79"]["\x75\x73\x65\x72"]!== user|| req["\x62\x6F\x64\x79"]["\x70\x61\x73\x73\x77\x6F\x72\x64"]!== password){return res["\x73\x74\x61\x74\x75\x73"](401)["\x73\x65\x6E\x64"]("\x57\x72\x6F\x6E\x67\x20\x63\x72\x65\x64\x65\x6E\x74\x69\x61\x6C\x73")};refresh_token= generateToken();return res["\x73\x74\x61\x74\x75\x73"](200)["\x73\x65\x6E\x64"]({refresh_token})});app["\x70\x6F\x73\x74"]("\x2F\x74\x6F\x6B\x65\x6E",(req,res)=>{if(!req["\x62\x6F\x64\x79"]||  !req["\x62\x6F\x64\x79"]["\x67\x72\x61\x6E\x74\x5F\x74\x79\x70\x65"] ||  !req["\x62\x6F\x64\x79"]["\x72\x65\x66\x72\x65\x73\x68\x5F\x74\x6F\x6B\x65\x6E"]){return res["\x73\x74\x61\x74\x75\x73"](400)["\x73\x65\x6E\x64"]("\x42\x61\x64\x20\x72\x65\x71\x75\x65\x73\x74")};if(req["\x62\x6F\x64\x79"]["\x67\x72\x61\x6E\x74\x5F\x74\x79\x70\x65"]!== "\x72\x65\x66\x72\x65\x73\x68\x5F\x74\x6F\x6B\x65\x6E"){return res["\x73\x74\x61\x74\x75\x73"](400)["\x73\x65\x6E\x64"]("\x67\x72\x61\x6E\x74\x5F\x74\x79\x70\x65\x20\x65\x72\x72\x6F\x72")};if(!refresh_token|| req["\x62\x6F\x64\x79"]["\x72\x65\x66\x72\x65\x73\x68\x5F\x74\x6F\x6B\x65\x6E"]!== refresh_token){return res["\x73\x74\x61\x74\x75\x73"](401)["\x73\x65\x6E\x64"]("\x4E\x6F\x74\x20\x61\x75\x74\x68\x6F\x72\x69\x7A\x65\x64")};access_token= generateToken();return res["\x73\x74\x61\x74\x75\x73"](200)["\x73\x65\x6E\x64"]({access_token})});app["\x67\x65\x74"]('\x2F\x61\x63\x63\x6F\x75\x6E\x74\x73',(req,res)=>{if(!access_token|| req["\x68\x65\x61\x64\x65\x72\x73"]["\x61\x75\x74\x68\x6F\x72\x69\x7A\x61\x74\x69\x6F\x6E"]!== `Bearer ${access_token}`){return res["\x73\x74\x61\x74\x75\x73"](401)["\x73\x65\x6E\x64"]("\x4E\x6F\x74\x20\x61\x75\x74\x68\x6F\x72\x69\x7A\x65\x64")};let page=1;if(req["\x71\x75\x65\x72\x79"]&& req["\x71\x75\x65\x72\x79"]["\x70\x61\x67\x65"]){page= req["\x71\x75\x65\x72\x79"]["\x70\x61\x67\x65"]};let next=`/accounts?page=${(((req["\x71\x75\x65\x72\x79"]&& req["\x71\x75\x65\x72\x79"]["\x70\x61\x67\x65"])|| page)* 1)+ 1}`;if(page> 21){next= null};if(page> 3){page= 3};accounts= {account:jsonInfo["\x61\x63\x63\x6F\x75\x6E\x74\x73"][page],link:{self:`/accounts?page=${(req["\x71\x75\x65\x72\x79"]&& req["\x71\x75\x65\x72\x79"]["\x70\x61\x67\x65"])|| page}`,next}};return res["\x73\x74\x61\x74\x75\x73"](200)["\x73\x65\x6E\x64"](accounts)});app["\x67\x65\x74"]('\x2F\x61\x63\x63\x6F\x75\x6E\x74\x73\x2F\x3A\x61\x63\x63\x5F\x6E\x75\x6D\x62\x65\x72\x2F\x74\x72\x61\x6E\x73\x61\x63\x74\x69\x6F\x6E\x73',(req,res)=>{if(!access_token|| req["\x68\x65\x61\x64\x65\x72\x73"]["\x61\x75\x74\x68\x6F\x72\x69\x7A\x61\x74\x69\x6F\x6E"]!== `Bearer ${access_token}`){return res["\x73\x74\x61\x74\x75\x73"](401)["\x73\x65\x6E\x64"]("\x4E\x6F\x74\x20\x61\x75\x74\x68\x6F\x72\x69\x7A\x65\x64")};const trs=jsonInfo["\x74\x72\x61\x6E\x73\x61\x63\x74\x69\x6F\x6E\x73"][req["\x70\x61\x72\x61\x6D\x73"]["\x61\x63\x63\x5F\x6E\x75\x6D\x62\x65\x72"]];if(!trs){return res["\x73\x74\x61\x74\x75\x73"](400)["\x73\x65\x6E\x64"]("\x41\x63\x63\x6F\x75\x6E\x74\x20\x6E\x6F\x74\x20\x66\x6F\x75\x6E\x64")};let page=1;if(req["\x71\x75\x65\x72\x79"]&& req["\x71\x75\x65\x72\x79"]["\x70\x61\x67\x65"]){page= req["\x71\x75\x65\x72\x79"]["\x70\x61\x67\x65"]};const pageNext=((((req["\x71\x75\x65\x72\x79"]&& req["\x71\x75\x65\x72\x79"]["\x70\x61\x67\x65"])|| page)* 1)+ 1)|| page;const next=trs[pageNext]?`/accounts/${req["\x70\x61\x72\x61\x6D\x73"]["\x61\x63\x63\x5F\x6E\x75\x6D\x62\x65\x72"]}/transactions?page=${pageNext}`:null;const response={transactions:(trs&& trs[page])|| [],link:{self:`/accounts/${req["\x70\x61\x72\x61\x6D\x73"]["\x61\x63\x63\x5F\x6E\x75\x6D\x62\x65\x72"]}/transactions?page=${(req["\x71\x75\x65\x72\x79"]&& req["\x71\x75\x65\x72\x79"]["\x70\x61\x67\x65"])|| page}`,next}};return res["\x73\x74\x61\x74\x75\x73"](200)["\x73\x65\x6E\x64"](response)});app["\x6C\x69\x73\x74\x65\x6E"](3000,()=>console["\x6C\x6F\x67"]('\x42\x61\x6E\x6B\x69\x6E\x27\x20\x61\x70\x70\x20\x6C\x69\x73\x74\x65\x6E\x69\x6E\x67\x20\x6F\x6E\x20\x70\x6F\x72\x74\x20\x33\x30\x30\x30\x21'));function generateToken(){return crypto["\x72\x61\x6E\x64\x6F\x6D\x42\x79\x74\x65\x73"](64).toString('\x68\x65\x78')}
