function openStream()
{
    const config = {audio: true, video: true};
    return navigator.mediaDevices.getUserMedia(config);
}
function playVideo(id, stream)
{
    const video = document.getElementById(id);
    video.srcObject = stream;
    video.play();
}

// openStream()
// .then(stream => playVideo("localStream", stream));

var peer = new Peer({host: '9000-ae408b57-594c-4c80-8302-4cabada6073d.ws-us02.gitpod.io', secure: true, port: 443}); 


peer.on('open', id => $("#peer-Id").append(id));

$("#connect").click(() => { //Ấn nút thì
    const id = $("#nhap-id").val(); //Lấy ID
    openStream()
    .then(stream => {
        playVideo('localStream', stream); //Play stream của chính mình
        const call = peer.call(id, stream);//gửi id và stream của mình đến id kia
        call.on('stream', (remoteStream) => { //nếu có sự kiện stream đến thì lấy remoteStream rồi play
            playVideo('remoteStream', remoteStream);
        });
    });
});

peer.on('call', call => {//nếu có sự kiện call
    openStream()//
    .then(stream => {
        call.answer(stream);//gửi lại stream của mình cho ng gọi đến
        playVideo('localStream', stream);//Play cái của mình
        call.on('stream', remoteStream => playVideo('remoteStream', remoteStream));//Nhận đc stream thì play ra
    });
});
