"use strict";(self.webpackChunkpoker=self.webpackChunkpoker||[]).push([[253],{6253:function(e,n,r){r.r(n),r.d(n,{default:function(){return f}});var t=r(4165),a=r(5861),o=r(8391),s=r(2159),c=r(99),i=r(4728),u=r(2343),d=r(7141),l=r(9277),p=r(3712),m=function(e){var n=e.imgSrc,r=e.username,t=e.itsI,a=e.isCurrentPlayer,o=e.money,s=e.setIsRenameModalOpen,c=e.setIsChangeIconModalOpen;return(0,p.jsxs)("div",{className:"user_block ".concat(t?"itsI":""," ").concat(a?"is_current_player":""," ").concat(o<=25?"no_cash":""),children:[(0,p.jsx)("p",{onClick:function(){return t&&s(!0)},children:r}),(0,p.jsx)("img",{src:n,alt:"",width:"65px",height:"65px",onClick:function(){return t&&c(!0)}})]})},f=function(e){var n=e.isHost,r=e.playerDataArr,f=e.uuid,h=e.id,k=e.dealerUid,_=e.setIsRenameModalOpen,x=e.setIsChangeIconModalOpen,b=(0,c.s0)(),v=(0,o.useContext)(d.u).setToast,y=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,s.r7)((0,s.JU)(i.db,"game_rooms_poker",h),{game_room_closed:!0});case 2:return e.next=4,(0,s.oe)((0,s.JU)(i.db,"game_rooms_poker",h));case 4:return e.next=6,(0,s.r7)((0,s.JU)(i.db,"game_room_codes_poker","code_array"),{codes:(0,s.Ab)(h)});case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){var n,a,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=r.find((function(e){return e.uid===f})),a=r.filter((function(e){return e.money>25})).map((function(e){return e.uid})),o=(0,l.uU)(a,k),(0,s.r7)((0,s.JU)(i.db,"game_rooms_poker",h),{player_data_arr:(0,s.Ab)(n),dealer_uid:n.uid===k?o:k}),b("/");case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,p.jsxs)("div",{className:"start_block",children:[(0,p.jsx)("div",{className:"player_block",children:null===r||void 0===r?void 0:r.map((function(e){return(0,p.jsx)(m,{imgSrc:u.Z[e.icon_index],username:e.username,itsI:f===e.uid,money:e.money,setIsRenameModalOpen:_,setIsChangeIconModalOpen:x},e.uid)}))}),n?(0,p.jsxs)("div",{className:"btn-block",children:[(0,p.jsx)("button",{onClick:y,children:"Delete Room"}),(0,p.jsx)("button",{onClick:function(){(null===r||void 0===r?void 0:r.filter((function(e){return e.money>25})).length)>=2?(0,l.t)({playerDataArr:r,id:h,dealerUid:k}):v({type:"danger",text:"At least 2 players are required"})},children:"Start Game"})]}):(0,p.jsx)("div",{className:"btn-block",children:(0,p.jsx)("button",{onClick:g,children:"Leave"})})]})}}}]);