(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{RXBc:function(t,e,i){"use strict";i.r(e),i.d(e,"pageQuery",(function(){return u}));var n=i("iYmT"),c=i("q1tI"),a=i.n(c),o=i("Wbzz"),l=i("9eSz"),r=i.n(l),s=i("IaKx"),g=i("BBGl"),d=i("JcNy"),m=i("JwsL"),p=i("zDcZ"),b=i("lWtG"),f=i("qKvR"),h={name:"hjz6ei",styles:"border-radius:100%;width:160px;height:160px;display:inline-block;"};e.default=function(t){var e,i,l,u,j,O,x,y,v,w,k,S,T,z,L=t.data.markdownRemark,B=L.content,D=L.frontmatter,W=D.metaDescription,I=D.metaTitle,R=D.title,F=D.tags,H=D.contactButtonText,C=D.firstLame,A=D.servicesTitle,M=D.services,E=D.servicesButtonText,P=D.studiesTitle,_=D.studies,J=D.studiesButtonText,q=Object(c.useState)(!0),G=q[0],K=q[1],N=Object(c.useRef)(null);return Object(c.useEffect)((function(){K(!1);var t=function(){if(N.current){var t=N.current.getBoundingClientRect().top;window.innerHeight-t>200&&K(!0)}};return window.addEventListener("scroll",t),window.addEventListener("resize",t),t(),function(){window.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),Object(f.c)(a.a.Fragment,null,Object(f.c)(s.a,{description:W,title:I}),Object(f.c)(g.a,null),Object(f.c)(d.c,null),Object(f.c)("section",{title:R,css:Object(n.a)((e={height:"calc(90vh - "+d.a+"px)",minHeight:500,marginTop:d.a+40,display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:120,paddingRight:120},e[p.g.notDesktop]={marginTop:d.b+30,marginBottom:30,paddingLeft:40,paddingRight:40,height:"auto"},e))},Object(f.c)("div",{css:Object(n.a)((i={width:960},i[p.g.notDesktop]={width:"100%"},i))},Object(f.c)("h1",{css:Object(n.a)((l={fontFamily:p.e.title,fontWeight:p.d.regular,fontSize:p.c.title,marginBottom:10},l[p.g.smartphone]={fontSize:p.c.smallTitle},l))},R),Object(f.c)("h2",{css:Object(n.a)((u={fontFamily:p.e.title,fontWeight:p.d.regular,fontSize:p.c.title,marginBottom:20},u[p.g.smartphone]={fontSize:p.c.smallTitle},u))},F),Object(f.c)("div",{css:Object(n.a)({fontSize:p.c.mediumLarge}),dangerouslySetInnerHTML:{__html:B}}),Object(f.c)(o.Link,{to:"/contact",css:Object(n.a)([Object(p.f)(p.b.green,p.b.blue),{marginTop:30}])},H))),Object(f.c)("section",{title:C.title,css:Object(n.a)((j={display:"flex"},j[p.g.desktop]={height:"calc(98vh - "+d.a+"px)",minHeight:650},j))},Object(f.c)(r.a,{css:Object(n.a)((O={width:"58%",flexShrink:0},O[p.g.notDesktop]={display:"none"},O)),imgStyle:{objectPosition:"top center"},fluid:C.image.childImageSharp.fluid,alt:C.imageAlt,title:C.imageTitle}),Object(f.c)("div",{css:Object(n.a)((x={background:p.b.yellow,width:"42%",flexShrink:0,padding:"50px 100px",display:"flex",flexDirection:"column",justifyContent:"center"},x[p.g.notDesktop]={width:"100%",padding:40,height:"auto"},x))},Object(f.c)("h2",{css:Object(n.a)({fontFamily:p.e.title,fontWeight:p.d.regular,fontSize:p.c.larger,fontStyle:"italic",letterSpacing:5,marginBottom:10})},C.title),Object(f.c)("h3",{css:Object(n.a)({fontFamily:p.e.title,fontWeight:p.d.regular,fontSize:p.c.large,fontStyle:"italic",marginBottom:40})},C.subTitle),Object(f.c)("div",{css:Object(n.a)((y={fontSize:p.c.medium},y[p.g.smartphone]={fontSize:p.c.mediumLarge},y)),dangerouslySetInnerHTML:{__html:C.body}}),Object(f.c)(o.Link,{to:C.readMoreButtonLink,css:Object(n.a)([Object(p.f)(p.b.orange,p.b.pink),{marginTop:40}])},C.readMoreButtonText))),Object(f.c)(b.a,{css:Object(n.a)((v={padding:"80px 0",width:900,margin:"auto"},v[p.g.notDesktop]={padding:"30px  40px",width:"auto",margin:0},v))}),Object(f.c)("section",{title:A,css:Object(n.a)((w={display:"flex",flexDirection:"column",justifyContent:"center",height:"calc(98vh - "+d.a+"px)",minHeight:650,paddingBottom:40,paddingLeft:120,paddingRight:120,background:p.b.lightGrey,marginTop:100},w[p.g.notDesktop]={paddingLeft:40,paddingRight:40,marginTop:30,height:"auto"},w))},Object(f.c)("h2",{css:Object(n.a)({fontFamily:p.e.title,fontWeight:p.d.regular,fontSize:p.c.smallTitle,alignSelf:"center",position:"relative",textAlign:"center",maxWidth:800,marginTop:40,paddingBottom:80,":after":{content:'" "',position:"absolute",bottom:40,width:30,height:2,background:p.b.dark,left:"calc(50% - 15px)"}})},A),Object(f.c)("div",{css:Object(n.a)((k={display:"flex",minHeight:400,width:"100%",justifyContent:"space-around",alignItems:"flex-start"},k[p.g.smartphone]={flexDirection:"column",alignItems:"center"},k))},M.map((function(t,e){var i,c,a=t.title,o=t.image,l=t.imageAlt,s=t.imageTitle,g=t.content;return Object(f.c)("div",{key:e,css:Object(n.a)((i={flex:1,display:"inline-block",textAlign:"center",fontSize:p.c.medium},i[p.g.smartphone]={marginBottom:30,fontSize:p.c.mediumLarge},i))},o&&Object(f.c)(r.a,{css:h,imgStyle:{objectPosition:"top center"},fluid:o.childImageSharp.fluid,title:s,alt:l}),Object(f.c)("h3",{css:Object(n.a)((c={fontFamily:p.e.title,fontWeight:p.d.regular,fontSize:p.c.mediumLarge,fontStyle:"italic",margin:"10px 0 "},c[p.g.smartphone]={fontSize:p.c.large},c))},a),g.map((function(t,e){return Object(f.c)("span",{key:e},t,Object(f.c)("br",null))})))}))),Object(f.c)(o.Link,{to:"/services",css:Object(n.a)([Object(p.f)(p.b.orange,p.b.pink),{display:"inline-block",marginTop:0,alignSelf:"center"}])},E)),Object(f.c)("section",{ref:N,title:P,css:Object(n.a)((S={display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"80vh",paddingBottom:80,marginTop:100,paddingLeft:60,paddingRight:60},S[p.g.notDesktop]={minHeight:"40vh",marginTop:30,padding:40},S))},Object(f.c)("h2",{css:Object(n.a)({fontFamily:p.e.title,fontWeight:p.d.regular,fontSize:p.c.smallTitle,alignSelf:"center",position:"relative",textAlign:"center",maxWidth:800,paddingBottom:80,":after":{content:'" "',position:"absolute",bottom:40,width:30,height:2,background:p.b.dark,left:"calc(50% - 15px)"}})},P),Object(f.c)("div",{css:Object(n.a)([(T={display:"flex",width:"100%",justifyContent:"space-between",alignItems:"flex-start",transition:"opacity 1.2s ease-in"},T[p.g.smartphone]={flexDirection:"column",alignItems:"center"},T),!G&&(z={opacity:0},z[p.g.smartphone]={opacity:1},z)])},_.map((function(t,e){var i,c,a,o=t.title,l=t.path,s=t.image,g=t.imageAlt,d=t.imageTitle,m=t.content;return Object(f.c)("a",{key:e,css:Object(n.a)((i={display:"inline-block",fontSize:p.c.normal,width:"calc((100vw - 120px - 80px) / 3)",textDecoration:"none",color:p.b.dark,cursor:"pointer",img:{transition:"all 0.5s ease, opacity 500ms ease 0s !important"},":hover img,:active img":{transform:"scale(1.1)",filter:"brightness(50%)"}},i[p.g.smartphone]={width:"auto",marginBottom:30,fontSize:p.c.mediumLarge},i)),href:l,alt:o},Object(f.c)(r.a,{css:Object(n.a)((c={width:"calc((100vw - 120px - 80px) / 3)",height:"calc((3 / 4) * (100vw - 120px - 80px) / 3)",display:"inline-block"},c[p.g.smartphone]={width:"calc((100vw - 80px))",height:"calc((3 / 4) * (100vw - 80px))"},c)),imgStyle:{objectPosition:"top center"},fluid:s.childImageSharp.fluid,title:d,alt:g}),Object(f.c)("h3",{css:Object(n.a)((a={fontFamily:p.e.title,fontWeight:p.d.semibold,fontSize:p.c.mediumLarge,margin:"10px 0"},a[p.g.smartphone]={fontSize:p.c.large,marginBottom:0},a))},o),Object(f.c)("div",{dangerouslySetInnerHTML:{__html:m}}))}))),Object(f.c)(o.Link,{to:"/ux-studies",css:Object(n.a)([Object(p.f)(p.b.orange,p.b.pink),{display:"inline-block",marginTop:40,alignSelf:"center",width:280}])},J)),Object(f.c)(m.a,null))};var u="3625280871"},lWtG:function(t,e,i){"use strict";i("E5k/");var n=i("iYmT"),c=i("r0e+"),a=(i("q1tI"),i("zDcZ")),o=i("qKvR");function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}e.a=function(t){var e,i=c.data.markdownRemark.frontmatter,r=i.title,s=i.items;return Object(o.c)("section",l({title:r},t),Object(o.c)("h2",{css:Object(n.a)({fontFamily:a.e.title,fontWeight:a.d.regular,fontSize:a.c.smallTitle,alignSelf:"center",position:"relative",textAlign:"center",maxWidth:800,marginTop:40,paddingBottom:80,":after":{content:'" "',position:"absolute",bottom:40,width:30,height:2,background:a.b.dark,left:"calc(50% - 15px)"}})},r),Object(o.c)("div",{css:Object(n.a)((e={display:"flex",justifyContent:"space-between"},e[a.g.notDesktop]={flexDirection:"column",alignItems:"center"},e))},s.map((function(t,e){var i,c=t.color,l=t.label;return Object(o.c)("div",{key:e,css:Object(n.a)((i={width:220,height:260,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",fontSize:"3.0rem",background:c,color:"white"},i[a.g.notDesktop]={width:"calc(100vw - 80px)",height:"calc((100vw - 80px) / 3)",marginBottom:5},i))},l)}))))}},"r0e+":function(t){t.exports=JSON.parse('{"data":{"markdownRemark":{"frontmatter":{"title":"We Provide solutions/studies for","items":[{"label":"Product Managers","color":"rgb(235, 192, 110)"},{"label":"Researchers","color":"rgb(237, 107, 103)"},{"label":"Designers","color":"rgb(88, 111, 178)"},{"label":"Marketers","color":"rgb(137, 200, 170)"}]}}}}')}}]);
//# sourceMappingURL=component---src-pages-index-js-c1384e5a11d3cd2f6010.js.map