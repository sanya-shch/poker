"use strict";(self.webpackChunkpoker=self.webpackChunkpoker||[]).push([[394],{1791:function(e,n,t){t.d(n,{Z:function(){return r}});t(8391);var a=t(3712),r=function(e){var n=e.value,t=e.onChange,r=e.maxLength,u=e.autofocus,o=void 0!==u&&u;return(0,a.jsxs)("div",{className:"input_container",children:[(0,a.jsx)("input",{type:"text",name:"name",className:"question",id:"nme",required:!0,autoComplete:"off",maxLength:r,value:n,onChange:t,autoFocus:o}),(0,a.jsx)("label",{htmlFor:"nme",children:(0,a.jsx)("span",{children:"What's your name?"})})]})}},693:function(e,n,t){var a=t(1037),r=t(8391),u=t(7650);n.Z=function(e){var n=e.children,t=e.wrapperId,o=void 0===t?"react-portal-wrapper":t,l=(0,r.useState)(null),c=(0,a.Z)(l,2),i=c[0],d=c[1];if((0,r.useLayoutEffect)((function(){var e=document.getElementById(o),n=!1;return e||(n=!0,e=function(e){var n=document.createElement("div");return n.setAttribute("id",e),document.body.appendChild(n),n}(o)),d(e),function(){n&&e.parentNode&&e.parentNode.removeChild(e)}}),[o]),null!==i)return(0,u.createPortal)(n,i)}},1394:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});var a=t(1413),r=t(1037),u=t(8391),o=t(2159),l=t(4728),c=t(693),i=t(1791),d=t(2603),s=t(9277),m=t(3712),f=function(e){var n=e.isOpen,t=e.handleClose,f=e.id,p=e.uuid,h=e.playerDataArr,v=u.useRef(null);(0,s.O3)(v,(function(){t()}));var x=(0,u.useState)(""),b=(0,r.Z)(x,2),j=b[0],y=b[1];return u.useEffect((function(){return n&&(document.body.style.overflow="hidden"),function(){document.body.style.overflow="auto"}}),[n]),n?(0,m.jsx)(c.Z,{wrapperId:"react-portal-rename-modal",children:(0,m.jsx)("div",{className:"rename-modal",children:(0,m.jsxs)("div",{className:"modal-content",ref:v,children:[(0,m.jsx)("div",{className:"input_name_block",children:(0,m.jsx)(i.Z,{maxLength:12,value:j,onChange:function(e){y(e.target.value)},autofocus:!0})}),(0,m.jsx)("div",{className:"btn_block",children:(0,m.jsx)(d.Z,{text:j?"Rename":"X",onClick:function(){j?((0,o.r7)((0,o.JU)(l.db,"game_rooms_poker",f),{player_data_arr:h.map((function(e){return e.uid===p?(0,a.Z)((0,a.Z)({},e),{},{username:j}):e}))}),t()):t()}})})]})})}):null}}}]);