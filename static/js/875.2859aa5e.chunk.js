"use strict";(self.webpackChunkpoker=self.webpackChunkpoker||[]).push([[875],{5875:function(e,n,t){t.r(n),t.d(n,{default:function(){return x}});var r=t(1037),s=t(4165),c=t(5861),a=t(8391),i=t(2159),o=t(3712),u=function(e){var n=e.children,t=e.value,r=e.onClick,a=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.clipboard.writeText(t);case 3:r&&r(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();return(0,o.jsx)("button",{type:"button",className:"copy_btn",onClick:a,children:n})},l=function(e){var n=e.text,t=void 0===n?"":n,r=e.onToggle,s=e.isToggle;return(0,o.jsxs)("label",{className:"toggle_label",children:[(0,o.jsxs)("div",{className:"toggle",children:[(0,o.jsx)("input",{className:"toggle-state",type:"checkbox",name:"check",value:"check",onChange:r,checked:s}),(0,o.jsx)("div",{className:"indicator"})]}),(0,o.jsx)("div",{className:"label-text",children:t})]})},d=t(2603),p=t(4728),h=t(7518),m=t(7141),x=function(e){var n=e.isHost,t=e.withBackgroundAnimation,x=e.id,b=e.ongoingGame,g=e.uuid,f=(0,a.useContext)(m.u).setToast,k=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.r7)((0,i.JU)(p.db,"game_rooms_poker",x),{ongoing_game:!1,midgame_player_uid:[],card_deck:[],player_cards:{},players_list:[],current_player_uid:g,last_actions:{},game_stage:h.H.start,game_cards:[],bank:0,current_bet:0,all_in_banks:{}});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.r7)((0,i.JU)(p.db,"game_rooms_poker",x),{with_background_animation:!t});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=(0,a.useState)(50),j=(0,r.Z)(v,2),y=j[0],C=j[1],N=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.r7)((0,i.JU)(p.db,"game_rooms_poker",x),{history_list:[]});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,o.jsxs)("div",{className:"menu_settings_block",children:[(0,o.jsx)("h4",{children:"Settings"}),(0,o.jsxs)("div",{className:"custom_scrollbar",children:[(0,o.jsxs)("div",{className:"game_id_block",children:[(0,o.jsx)("span",{children:x}),(0,o.jsx)(u,{value:window.location.href,onClick:function(){return f({type:"success",text:"Copy"})},children:(0,o.jsx)("span",{children:"Copy"})})]}),n&&!b&&(0,o.jsxs)("div",{className:"blinds_btns",children:[(0,o.jsx)("h4",{children:"Min bet"}),(0,o.jsx)("button",{className:50===y?"selected":"",type:"button",onClick:function(){return C(50)},children:"50"}),(0,o.jsx)("button",{className:100===y?"selected":"",type:"button",onClick:function(){return C(100)},children:"100"}),(0,o.jsx)("button",{className:200===y?"selected":"",type:"button",onClick:function(){return C(200)},children:"200"}),(0,o.jsx)("button",{className:500===y?"selected":"",type:"button",onClick:function(){return C(500)},children:"500"})]}),n&&!b&&(0,o.jsx)("button",{className:"clear_history_btn",type:"button",onClick:function(){return N()},children:"Clear game history"}),n&&b&&(0,o.jsx)(l,{text:"Background animation",onToggle:_,isToggle:t}),n&&b&&(0,o.jsx)("div",{className:"reset_btn",children:(0,o.jsx)(d.Z,{text:"Reset Game \u21ac",onClick:k})})]})]})}}}]);