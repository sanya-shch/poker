"use strict";(self.webpackChunkpoker=self.webpackChunkpoker||[]).push([[95],{693:function(e,n,t){var a=t(1037),r=t(8391),o=t(7650);n.Z=function(e){var n=e.children,t=e.wrapperId,c=void 0===t?"react-portal-wrapper":t,s=(0,r.useState)(null),i=(0,a.Z)(s,2),u=i[0],l=i[1];if((0,r.useLayoutEffect)((function(){var e=document.getElementById(c),n=!1;return e||(n=!0,e=function(e){var n=document.createElement("div");return n.setAttribute("id",e),document.body.appendChild(n),n}(c)),l(e),function(){n&&e.parentNode&&e.parentNode.removeChild(e)}}),[c]),null!==u)return(0,o.createPortal)(n,u)}},95:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});var a=t(1037),r=t(2982),o=t(8391),c=t(2159),s=t(2343),i=t(4728),u=t(7141),l=t(693),d=t(3712),m=function(e){var n=e.value,t=e.onChange,a=e.maxLength,r=e.autofocus,o=void 0!==r&&r;return(0,d.jsxs)("div",{className:"input_container",children:[(0,d.jsx)("input",{type:"text",name:"name",className:"question",id:"nme",required:!0,autoComplete:"off",maxLength:a,value:n,onChange:t,autoFocus:o}),(0,d.jsx)("label",{htmlFor:"nme",children:(0,d.jsx)("span",{children:"What's your name?"})})]})},p=t(2603),h=(0,r.Z)(Object.keys(s.v)),f=function(e){var n=e.isOpen,t=e.handleClose,r=(e.isHost,e.id),f=e.uuid,v=e.ongoingGame,x=(0,o.useContext)(u.u).setToast,g=(0,o.useState)(Object.keys(s.v)[0]),b=(0,a.Z)(g,2),j=b[0],k=b[1],y=(0,o.useState)(""),_=(0,a.Z)(y,2),C=_[0],N=_[1];return o.useEffect((function(){return n&&(document.body.style.overflow="hidden"),function(){document.body.style.overflow="auto"}}),[n]),n?(0,d.jsx)(l.Z,{wrapperId:"react-portal-start-modal",children:(0,d.jsx)("div",{className:"start-modal",children:(0,d.jsxs)("div",{className:"modal-content",children:[(0,d.jsx)("div",{className:"input_name_block",children:(0,d.jsx)(m,{maxLength:12,value:C,onChange:function(e){N(e.target.value)},autofocus:!0})}),(0,d.jsx)("div",{className:"content_block",children:(0,d.jsx)("div",{className:"icons_block custom_scrollbar",children:h.map((function(e){return(0,d.jsx)("div",{className:e===j?"checked":"",children:(0,d.jsx)("img",{src:s.Z[e],alt:e,width:"65px",height:"65px",onClick:function(){return k(e)}})},"img-".concat(e))}))})}),(0,d.jsx)("div",{className:"btn_block",children:(0,d.jsx)(p.Z,{text:"Join",onClick:function(){j&&C?((0,c.r7)((0,c.JU)(i.db,"game_rooms_poker",r),{player_data_arr:(0,c.vr)({username:C,uid:f,points:0,icon_index:j,money:5e3})}),v&&(0,c.r7)((0,c.JU)(i.db,"game_rooms_poker",r),{midgame_player_uid:(0,c.vr)(f)}),t()):(C||x({type:"danger",text:"Enter your username"}),j||x({type:"danger",text:"Select the icon"}))}})})]})})}):null}}}]);