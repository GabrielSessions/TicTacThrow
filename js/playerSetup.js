var username = '';

//loading screen when waiting to join game
function loading(){
    username = document.getElementById('fname').value;

    document.getElementById('nameForm').remove();

    document.getElementById('loader').removeAttribute ('hidden');
    document.getElementById('subheadLoad').removeAttribute ('hidden');


}