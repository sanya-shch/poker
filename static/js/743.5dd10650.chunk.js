"use strict";(self.webpackChunkpoker=self.webpackChunkpoker||[]).push([[743],{1791:function(e,n,t){t.d(n,{Z:function(){return a}});t(8391);var r=t(3712),a=function(e){var n=e.value,t=e.onChange,a=e.maxLength,o=e.autofocus,u=void 0!==o&&o;return(0,r.jsxs)("div",{className:"input_container",children:[(0,r.jsx)("input",{type:"text",name:"name",className:"question",id:"nme",required:!0,autoComplete:"off",maxLength:a,value:n,onChange:t,autoFocus:u}),(0,r.jsx)("label",{htmlFor:"nme",children:(0,r.jsx)("span",{children:"What's your name?"})})]})}},693:function(e,n,t){var r=t(1037),a=t(8391),o=t(7650);n.Z=function(e){var n=e.children,t=e.wrapperId,u=void 0===t?"react-portal-wrapper":t,c=(0,a.useState)(null),i=(0,r.Z)(c,2),s=i[0],l=i[1];if((0,a.useLayoutEffect)((function(){var e=document.getElementById(u),n=!1;return e||(n=!0,e=function(e){var n=document.createElement("div");return n.setAttribute("id",e),document.body.appendChild(n),n}(u)),l(e),function(){n&&e.parentNode&&e.parentNode.removeChild(e)}}),[u]),null!==s)return(0,o.createPortal)(n,s)}},6743:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var r=t(1037),a=t(2982),o=t(8391),u=t(2159),c=t(2343),i=t(4728),s=t(7141),l=t(693),d=t(1791),m=t(2603),f=t(3712),p=(0,a.Z)(Object.keys(c.v)),h=function(e){var n=e.isOpen,t=e.handleClose,a=(e.isHost,e.id),h=e.uuid,v=e.ongoingGame,x=e.playerDataArr,g=(0,o.useContext)(s.u).setToast,y=(0,o.useMemo)((function(){return x.map((function(e){return e.icon_index}))}),[x]),_=(0,o.useMemo)((function(){return p.filter((function(e){return!y.includes(e)}))}),[p,y]),b=(0,o.useState)(_[0]),j=(0,r.Z)(b,2),k=j[0],C=j[1],N=(0,o.useState)(""),Z=(0,r.Z)(N,2),w=Z[0],E=Z[1];return o.useEffect((function(){return n&&(document.body.style.overflow="hidden"),function(){document.body.style.overflow="auto"}}),[n]),n?(0,f.jsx)(l.Z,{wrapperId:"react-portal-start-modal",children:(0,f.jsx)("div",{className:"start-modal",children:(0,f.jsxs)("div",{className:"modal-content",children:[(0,f.jsx)("div",{className:"input_name_block",children:(0,f.jsx)(d.Z,{maxLength:12,value:w,onChange:function(e){E(e.target.value)},autofocus:!0})}),(0,f.jsx)("div",{className:"content_block",children:(0,f.jsx)("div",{className:"icons_block custom_scrollbar",children:_.map((function(e){return(0,f.jsx)("div",{className:e===k?"checked":"",children:(0,f.jsx)("img",{src:c.Z[e],alt:e,width:"65px",height:"65px",onClick:function(){return C(e)}})},"img-".concat(e))}))})}),(0,f.jsx)("div",{className:"btn_block",children:(0,f.jsx)(m.Z,{text:"Join",onClick:function(){k&&w?((0,u.r7)((0,u.JU)(i.db,"game_rooms_poker",a),{player_data_arr:(0,u.vr)({username:w,uid:h,points:0,icon_index:k,money:5e3})}),v&&(0,u.r7)((0,u.JU)(i.db,"game_rooms_poker",a),{midgame_player_uid:(0,u.vr)(h)}),t()):(w||g({type:"danger",text:"Enter your username"}),k||g({type:"danger",text:"Select the icon"}))}})})]})})}):null}}}]);