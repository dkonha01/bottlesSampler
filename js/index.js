'use strict';

var soundSource = 'https://res.cloudinary.com/de3c6e2g5/video/upload/v1537446208/kathysKlown_toenir.mp3';

var audioContext = new AudioContext()

var zoom = document.querySelector('#zoom');
var volume = document.querySelector('#volume');
zoom.oninput = function () {
  wavesurfer.zoom(Number(this.value));
};

var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  cursorColor: '#fff',
  waveColor: 'rgba(147, 188, 255,0.8)',
  progressColor: 'rgba(147, 188, 255,0.8)',
  hideScrollbar: true,
  splitChannels: true,/*
  backend: 'MediaElement' */
  scrollParent: true
});
wavesurfer.load(soundSource);

var sound;
var curRegion='0';

wavesurfer.on('ready', function () {
  var timeline = Object.create(WaveSurfer.Timeline);
  timeline.init({
    wavesurfer: wavesurfer,
    container: '#waveform-timeline'
  });
  for(var i=0;i<12;i++){
    wavesurfer.addRegion({
      id:''+i,
      start: regions['reg'+i].start,//i*2, // time in seconds
      end: regions['reg'+i].stop, //i*2+0.5, // time in seconds
      color: 'hsla('+i*1+', 10%, 50%, 0.17)',
      attributes: {
        highlight: true
    },
    });
  }
  for(var i=0;i<12;i++){
  (function(){
  wavesurfer.regions.list[''+i].on('update',function(region){
      createsound();
    });
  }());
}
  createsound();
});
$(document).ready(() => {
  const tl = new TimelineLite();
  // tl.append(TweenLite.delayedCall(2.5, removeFakePads));
  tl.to('.fakepad', 2, {
    opacity: 0,
    },1,'first')
     .to('#volume,#zoom,.label',1,{
        opacity:1
        },3)
});
function removeFakePads() {
  $('.fakepad').remove();
  // console.log('TimeLineCallback');
  // $('#volume').css('visibility','visible');
}
function createsound(){
  sound = new Howl({
  src: [soundSource],
    volume: Number(volume.value/100),
  sprite: {
    pad0: [getRegStart('0'), getRegDur('0')],
    pad1: [getRegStart('1'), getRegDur('1')],
    pad2: [getRegStart('2'), getRegDur('2')],
    pad3: [getRegStart('3'), getRegDur('3')],
    pad4: [getRegStart('4'), getRegDur('4')],
    pad5: [getRegStart('5'), getRegDur('5')],
    pad6: [getRegStart('6'), getRegDur('6')],
    pad7: [getRegStart('7'), getRegDur('7')],
    pad8: [getRegStart('8'), getRegDur('8')],
    pad9: [getRegStart('9'), getRegDur('9')],
    pad10: [getRegStart('10'), getRegDur('10')],

  }});
}
function getRegStart(regId){// space
  return wavesurfer.regions.list[regId]['start']*1000;
}
function getRegDur(regId){// space
  return (wavesurfer.regions.list[regId]['end']*1000-wavesurfer.regions.list[regId]['start']*1000);
}
function PlayPause(){// space
  wavesurfer.playPause();
}

function playPad(pad,padId){
  sound.play(pad);
  $(padId).addClass('pressed');
  setTimeout(() => {
    $(padId).removeClass('pressed');
  }, 100);

  var curRegion = $("div").find("[data-id='"+pad.replace('pad','')+"']");
  var playingTime = wavesurfer.regions.list[pad.replace('pad','')]['end']*1000-wavesurfer.regions.list[pad.replace('pad','')]['start']*1000;
  var curBackground = wavesurfer.regions.list[pad.replace('pad','')]['color'];
  var per = 0;
  var progressBackground = curBackground.replace('50%','10%');

  if(playingRegions[pad]!=''){
    console.log(playingRegions[pad]);
    clearInterval(playingRegions[pad]);
  }

var intervalId = setInterval(() => {
  playingRegions[pad] = intervalId;
    per+=10;
    if(per <= playingTime){
        curRegion.css({background: "linear-gradient(to right, "+progressBackground+" "+((per/playingTime)*100)+"%,"+curBackground+" "+((per/playingTime)*100)+"%,"+curBackground+" 100%)"});
    }else{
      curRegion.css({background: curBackground});
      clearInterval(intervalId);
    }
}, 10);



  $("div").find("[data-id='"+pad.replace('pad','')+"']").addClass( "bang" );
     setTimeout(function(){$("div").find("[data-id='"+pad.replace('pad','')+"']").removeClass( "bang" );},
                100);
}
$(document).keydown((e) => {
  switch (e.which) {
    //case(90): //z
    case(70): //f
      playPad('pad0','#8');
      return;
    case(88): //x
      playPad('pad1','#9');
      return;
    case(67): //c
      playPad('pad2','#10');
      return;
    case(86): //v
      playPad('pad3','#11');
      return;
    case(65): //a
      playPad('pad4','#4');
      return;
    case(83): //s
      playPad('pad5','#5');
      return;
    case(68): //d
      playPad('pad6','#6');
      return;
     case(69): //e
      playPad('pad10','#2');
      return;
    //case(70): //f
    case(90): //z
      playPad('pad7','#7');
      return;
    case(81): //q
      playPad('pad8','#0');
      return;
    case(87): //w
      playPad('pad9','#1');

      return;
    case(82): //r
      playPad('pad11','#3');
      sound.rate(.95);
      return;
    case(84): //t
      sound.rate(1.0);
      return;
    case(85): //u
      sound.rate(.97);
      return;

  }
})


volume.oninput = function () {
  sound._volume=Number(volume.value/100);
};
var playingRegions = {
  'pad0':'',
  'pad1':'',
  'pad2':'',
  'pad3':'',
  'pad4':'',
  'pad5':'',
  'pad6':'',
  'pad7':'',
  'pad8':'',
  'pad9':'',
  'pad10':'',
  'pad11':'',


}
var regions ={
  reg0:{
    start:0.0,
    stop:7.85,
  },
  reg1:{
    start:2.86,
    stop:7.50,
  },
  reg2:{
     start:8.00,
    stop:12.5,
  },
  reg3:{
    start:14.8,
    stop:19.0,
  },
  reg4:{
    start:30.1,
    stop:38.0,
  },
  reg5:{
    start:19.8,
    stop:24.75,
  },
  reg6:{
    start:40.0,
    stop:48.7,
  },
  reg7:{
     start:25.0,
    stop:31.0,
  },
  reg8:{
    start:32.0,
    stop:39.0,
  },
  reg9:{
    start:48.8,
    stop:59.0,
  },
  reg10:{
    start:60.0,
    stop:77.85,
  },
  reg11:{
   start:80,
    stop:112.5,
  }
};
