function setupTemplates()
{
	$('script[type=text/html][source]').each( function(i) {
		$this = $(this);
		_this = this;
		$.ajax({
			url:$this.attr('source'),
			async:false,
			success:function(resp) {
				$this.replaceWith("<script type='text/html' id='{0}'>{1}</script>".format(_this.id, resp));
			}
		});
	});
	$.each( $('script[type=text/html]'), function(i,v) {
		window[v.id] = new JTMLTemplate($(v));
	});
}

var currentHouse;
function getCurrentHouse(callback)
{
	if (currentHouse) callback (currentHouse);
	//first get current user
	$.rest.get ('/api/model/house/user/' + $.cookie ('UserId'), 'fields=*', function (h) {
		currentHouse = h;
		callback (h);
	});
}

function getGame(gameId)
{
	return JSON.parse($.cookie('game_' + gameId)) || {};
}

function setGame(gameId, gameData)
{
	console.log( 'writing game data to game id', gameId, gameData);
	$.cookie ('game_' + gameId, JSON.stringify(gameData), {expires:30, path:'/'}); //TODO: how long to keep the cookie for?  30 days seems okay for now.
}

function setGameField( gameId, key, value )
{
	var obj = getGame(gameId);
	obj[key] = value;
	setGame(gameId, obj);
}

var urlParams = {};
(function () {
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
       urlParams[d(e[1])] = d(e[2]);
})();

function getParameterByName( name )
{
	return urlParams[name];
}
