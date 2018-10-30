'use strict';
class APlay {

  constructor() {
    this.playNext=true; // Автоматическое проигрывание следующего файла
    this.pList={}; // Объект текущего плейлиста
    this.pTrackIndex=-1; // Индекс текущего трека
    this.timer_id=null; // включение таймера
    this.timer=0; // осталось секунд

    this.player=document.createElement("audio");
    this.player.preload="metadata";
    this.player_currentTime=0;
    this.timeLine=Q('#timeLine');
    this.uiTimer=Q('#timer');
    let clTime = Q('#clTime');

    this.player.ontimeupdate =()=> {
      let ct=this.player.currentTime.toFixed(0);
      timeLine.value=ct;
      clTime.innerHTML=timeFormat(this.timeLine.max-ct);
      this.savePosition();
    }
    this.player.onloadedmetadata =()=>{
      let dr=this.player.duration.toFixed(0);
      this.timeLine.max=dr;
      if (this.player_currentTime>0){
        this.player.currentTime=this.player_currentTime;
        this.player_currentTime=0;
      }
    }

    let uiLoad = Q('#uiLoad');
    let progress = false;

    this.player.onloadstart = function() {
        progress=true;
        uiLoad.classList.toggle('loadGradient');
    }

    this.player.onprogress =()=> {
      if(!progress){
        progress=true;
        uiLoad.classList.toggle('loadGradient');
      }
    }

    this.player.onsuspend =()=> {
      progress = false;
      uiLoad.classList.toggle('loadGradient');
    }

    this.player.onended = ()=> {
      if (this.playNext){ this.next() }
    }
    timeLine.oninput =()=>{
      this.player.currentTime=timeLine.value;
    }

    this.uiApp=Q('#app');
    this.uiParams=Q('#params');
    this.uiTrack=Q('#uiTrack');

    // buttons
    this.btPrev = Q('#btPrev');
    this.btPrev.innerHTML=icons.prev;
    this.btPrev.onclick =(me)=>{
      this.prev();
    }

    this.btAction = Q('#btAction');
    this.btAction.innerHTML=icons.play;
    this.btAction.onclick = (me)=>{
      if (this.player.paused === true) {
        this.play();
      }else{
        this.stop();
      }      
    }
    this.btNext = Q('#btNext');
    this.btNext.innerHTML=icons.next;
    this.btNext.onclick =(me)=>{
      this.next();
    }


    this.panelList=Q('#panelList');

    // localStorage
    this.storage=this.getStorage();
    this.lastTime=0;
  }
 
  timer_on(t){
    this.timer_off();
    this.uiTimer.innerHTML=timeFormat(t);
    this.uiTimer.classList.remove('hide');
    this.timer_id=setInterval(()=>{
      t--;
      this.uiTimer.innerHTML=timeFormat(t);
      if (t<=0){
        this.timer_off();
        this.stop();
        
      }
    },60000) // 1 раз в минуту
  }

  timer_off(){
    if (this.timer_id!=null){
      this.uiTimer.classList.add('hide');
      clearInterval(this.timer_id);
      this.timer_id=null;
    }
  }

  play() {
    if (this.pTrackIndex==-1){
      this.next();
    }else{
      this.player.play();
      this.btAction.innerHTML=icons.pause;
    }
  }
  
  stop(){
    this.player.pause();
    this.btAction.innerHTML=icons.play;
  }
  
  setTrack(i,trk){
    this.pTrackIndex=i;
    this.player.src=trk.src;
    this.uiTrack.innerHTML=trk.name;
  }

  next(){
    if(this.pTrackIndex<this.pList.list.length-1){
      this.setTrack(this.pTrackIndex+1, this.pList.list[this.pTrackIndex+1]);
      this.play();
    }
  }

  prev(){
    if(this.pTrackIndex>0){
      this.setTrack(this.pTrackIndex-1, this.pList.list[this.pTrackIndex-1]);
      this.play();
    }
  }

  showPlayList(list){
    this.stop();
    this.pList=list;
    this.panelList.innerHTML=''
    this.pTrackIndex=-1;
    this.player_currentTime=0;
    Q('#uiAlbum').innerHTML=this.pList.name;
    this.pList.list.forEach((track, i, arr)=>{
        let div=E("div");
        div.innerHTML='<div class="ico">'+icons.audio_file+'</div><div>'+track.name+'</div><div>'+(i+1)+'</div>';
        div.onclick = ()=>{
          this.setTrack(i,track)
          this.play();
        }
        this.panelList.appendChild(div);

    });
    this.restorePosition();
  }

  getStorage(){
    try{
      let storage = window['localStorage'];
      storage.setItem('app', 'APlay.v2');
      return storage;
    }catch(e){
      // localStorage не доступен
      return none;
    }
  }

  savePosition(){
    if (this.storage){
      let curTime=this.player.currentTime.toFixed(0);

      if ((curTime-this.lastTime>16) || (this.lastTime==0) || (curTime<this.lastTime)) {
        let data={
          index: this.pTrackIndex,
          playNext: this.playNext,
          max: this.timeLine.max,
          time: curTime
        }
        this.lastTime=curTime;
        this.storage.setItem(this.pList.id, JSON.stringify(data));
      }
    }
  }

  restorePosition(){
    if (this.storage){
      let data=this.storage.getItem(this.pList.id);
      if (data) {
        data=JSON.parse(data);
        this.setTrack(data.index, this.pList.list[data.index]);
        this.lastTime=data.time;
        this.timeLine.max=data.max;
        //this.player.currentTime=data.time;
        this.player_currentTime=data.time;
        this.playNext=data.playNext;
      }
    }
  }
}
