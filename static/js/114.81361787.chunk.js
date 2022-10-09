"use strict";(self.webpackChunkpoker=self.webpackChunkpoker||[]).push([[114],{693:function(n,e,t){var i=t(1037),a=t(8391),r=t(7650);e.Z=function(n){var e=n.children,t=n.wrapperId,o=void 0===t?"react-portal-wrapper":t,c=(0,a.useState)(null),s=(0,i.Z)(c,2),l=s[0],u=s[1];if((0,a.useLayoutEffect)((function(){var n=document.getElementById(o),e=!1;return n||(e=!0,n=function(n){var e=document.createElement("div");return e.setAttribute("id",n),document.body.appendChild(e),e}(o)),u(n),function(){e&&n.parentNode&&n.parentNode.removeChild(n)}}),[o]),null!==l)return(0,r.createPortal)(e,l)}},5114:function(n,e,t){t.r(e),t.d(e,{default:function(){return g}});var i=t(8391),a=t(9277),r=t(693),o=t(4942),c=t(1413),s=t(2982),l=t(2159),u=t(4728),d=t(1037),m=t(4462),v="styles_container__hjN+V",_="styles_overlay__Auta6",f="styles_content__JQFKp",p={contentEnter:"animation_contentEnter__xMhvu",contentEnterActive:"animation_contentEnterActive__TQvpJ",contentExit:"animation_contentExit__8s4jy",contentExitActive:"animation_contentExitActive__w7q8m",overlayEnterActive:"animation_overlayEnterActive__yvqJw",unfoldIn:"animation_unfoldIn__ITEaz",overlayExitActive:"animation_overlayExitActive__c+FAL",unfoldOut:"animation_unfoldOut__2dzYw"},x=t(3712),y={enter:p.overlayEnter,enterActive:p.overlayEnterActive,exit:p.overlayExit,exitActive:p.overlayExitActive},b={enter:p.contentEnter,enterActive:p.contentEnterActive,exit:p.contentExit,exitActive:p.contentExitActive},h=function(n){var e=n.children,t=n.opened,a=n.contentStyle,r=(0,i.useRef)(),o=(0,i.useRef)(),c=(0,i.useState)(!1),s=(0,d.Z)(c,2),l=s[0],u=s[1];return(0,i.useEffect)((function(){u(t)}),[t]),(0,x.jsxs)("div",{className:v,children:[(0,x.jsx)(m.Z,{in:l,nodeRef:r,timeout:1e3,mountOnEnter:!0,unmountOnExit:!0,classNames:y,children:(0,x.jsx)("div",{ref:r,className:_})}),(0,x.jsx)(m.Z,{in:l,nodeRef:o,timeout:1e3,mountOnEnter:!0,unmountOnExit:!0,classNames:b,children:(0,x.jsx)("div",{ref:o,className:"".concat(f," ").concat(a),children:e})})]})},E=t(434),j=t(7518),A=function(){return(0,x.jsx)("div",{className:"loader-container",children:(0,x.jsx)("svg",{children:(0,x.jsx)("circle",{cx:"15",cy:"15",r:"15"})})})},k=function(n){var e=n.children,t=n.text,i=void 0===t?"":t,a=n.position,r=void 0===a?"down":a;return(0,x.jsx)("div",{tooltip:i,flow:r,children:e})},C=t(6165),N=function(n){var e=n.isOpen,t=n.handleClose,r=n.isHost,d=n.id,m=n.uuid,v=n.playerCards,_=n.lastActions,f=n.gameCards,p=n.playerDataArr,y=n.playersList,b=n.dealerUid,N=n.allInBanks,g=n.bankCount,w=Object.keys(v).filter((function(n){var e;return(null===(e=_[n])||void 0===e?void 0:e.action)!==E.A.fold})).map((function(n){return{combination:(0,a.nn)([].concat((0,s.Z)(v[n]),(0,s.Z)(f))),uid:n}})).sort((function(n,e){return Number(e.combination.combinationCost)-Number(n.combination.combinationCost)})),Z=(0,a.ix)({allInBanks:N,combinations:w,bankCount:g,lastActions:_}),I=Z.map((function(n){return n.uid})),O=(0,a.uU)(y,b),B=p.reduce((function(n,e){return(0,c.Z)((0,c.Z)({},n),{},(0,o.Z)({},e.uid,e))}),{});return i.useEffect((function(){var n=setTimeout((function(){r?((0,l.r7)((0,l.JU)(u.db,"game_rooms_poker/".concat(d)),{ongoing_game:!1,midgame_player_uid:[],card_deck:[],player_cards:{},players_list:[],current_player_uid:m,last_actions:{},game_stage:j.H.start,game_cards:[],bank:0,current_bet:0,player_data_arr:p.map((function(n){var e=Z.find((function(e){return n.uid===e.uid}));return e?(0,c.Z)((0,c.Z)({},n),{},{points:n.points+1,money:n.money+e.bank}):n})),dealer_uid:O,all_in_banks:{}}),t()):t()}),15e3);return function(){return clearTimeout(n)}}),[]),(0,x.jsx)(h,{opened:e,contentStyle:"finish-modal",children:(0,x.jsxs)("div",{className:"modal-content",children:[(0,x.jsxs)("div",{className:"modal-header",children:[(0,x.jsx)("div",{children:"Game Results"}),(0,x.jsx)(A,{})]}),(0,x.jsx)("div",{className:"content_block combination_block custom_scrollbar",children:w.map((function(n){return(0,x.jsxs)("div",{className:"combination_item",children:[(0,x.jsx)("p",{className:I.includes(n.uid)?"winner":"",children:B[n.uid].username}),(0,x.jsx)(k,{text:n.combination.combinationName,position:"left",children:(0,x.jsx)("div",{className:"combination_item_row",children:n.combination.cards.slice(0,5).map((function(e){return(0,x.jsxs)("div",{className:"combination_card_item",children:[(0,x.jsx)("p",{children:e.number}),(0,x.jsx)("img",{src:C[e.type],alt:""})]},"".concat(B[n.uid].username,"-").concat(e.number,"-").concat(e.type))}))})})]},n.uid)}))})]})})},g=function(n){var e=n.isOpen,t=n.handleClose,o=n.isHost,c=n.id,s=n.uuid,l=n.playerCards,u=n.lastActions,d=n.gameCards,m=n.playerDataArr,v=n.playersList,_=n.dealerUid,f=n.allInBanks,p=n.bankCount,y=(0,a.b6)({opened:e}).mounted;return i.useEffect((function(){return e&&(document.body.style.overflow="hidden"),function(){document.body.style.overflow="auto"}}),[e]),y?(0,x.jsx)(r.Z,{wrapperId:"react-portal-finish-modal",children:(0,x.jsx)(N,{isOpen:e,handleClose:t,isHost:o,id:c,uuid:s,playerCards:l,lastActions:u,gameCards:d,playerDataArr:m,playersList:v,dealerUid:_,allInBanks:f,bankCount:p})}):null}}}]);