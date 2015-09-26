//(function(window) {

	//"use strict";

	var levelProgressBar = document.getElementById('levelProgress');

	var database = {};

	var ready = 0;

	var hero, objects, abilities, stats, talents;

	var $tooltip = $('#tooltip');

	var tooltip = new Tooltip();

	listeners();

	function listeners() {
		$(levelProgressBar).on('mousedown', function(e) {
			changeLevel(e);
			$(this).on('mousemove', changeLevel);
			$(window).on('mouseup', removeMouseUp);

			function removeMouseUp(e) {
				$(levelProgressBar).off('mousemove', changeLevel);
				$(window).off('mouseup', removeMouseUp);
			}
		});

		$('#heroName').on('click', selectionWindow);
		$('#heroSelect').on('click', selectionWindow);

		function selectionWindow(e) {
			if( e.target != this ) return;
			$('#heroSelect').toggleClass('selection');
			$('.selection > #heroInput').focus();
		}
	}

	$(document).ready(function() {
		jsonArray('heroes', setDatabase);
		jsonArray('stats', setDatabase);
		jsonArray('abilities', setDatabase);
		jsonArray('talents', setDatabase);
	});

	// Database

		function jsonArray(pSrc, pDone) {
			$.getJSON('resource/db/' + pSrc + '.json', function(data){
				database[pSrc] = data;
			}).done(pDone);
		}


		function setDatabase() {
			ready++;
			if(ready == 4) {
				Hero.prototype.heroes = database.heroes;
				Stat.prototype.stats = database.stats;
				Ability.prototype.abilities = Talent.prototype.abilitiesDb = database.abilities;
				Talent.prototype.talentsDb = database.talents;

				changeHero(1);
				createHeroes();
			}
		}

	// Heroes

		function createHeroes() {
			for (var i = 1; i < database.heroes.length; i++) {
				var heroId = database.heroes[i].id;
				var heroName = database.heroes[i].name;
				var heroRole = database.heroes[i].role;
				$('#heroes').append('<span class="hero" data-id="' + heroId + '" data-name="' + heroName + '" data-desc="' + heroRole + '"></span>');
			}
			$('#heroes > .hero').click(function() {
				var heroId = $(this).attr('data-id');
				$('#heroSelect').removeClass('selection');
				changeHero(heroId);
			});
		}

		function changeHero(pId) {
			hero = new Hero(pId);

			$('#heroName').html(hero.name);

			objects = hero.getObjects();
			abilities = objects.abilities;
			stats = objects.stats;
			updateDps();

			eraseStats();
			eraseTalents();
			eraseAbilities();

			Talent.prototype.abilities = abilities;

			talents = hero.tierTalents();

			for (var i = 0; i < abilities.length; i++) {
				createAbility(abilities[i], i);
			}

			for (var x = 0; x < talents.length; x++) {
				createTier(talents[x], x);
			}

			updateLevel(1);

			$('.calc-box').on('mouseenter', moveTooltip);
			$('.calc-box').on('mousemove', moveTooltip);
			$('.calc-box').on('mouseout', moveTooltip);

			$('#talents-chosen input').change(chooseTalent);
		}

	// Stats

		function updateDps() {
			var atks, dmg, dps;

			if(stats[stats.length-1].id !== 7) {
				atks = parseFloat(stats[stats.length-2].desc);
				dmg = parseFloat(stats[stats.length-1].desc);
				dps = atks * dmg;
				stats[stats.length] = new Stat(7, dps);
			} else {
				atks = parseFloat(stats[stats.length-3].desc);
				dmg = parseFloat(stats[stats.length-2].desc);
				dps = atks * dmg;
				stats[stats.length-1] = new Stat(7, dps);
			}
		}

		function createStat(pStat) {
			var statClass = '.stat.stat-' + pStat.name;
			var $statDiv = $(statClass);
			if(!$statDiv.length) {
				$('#heroStats').append('<div class="stat tips stat-' + pStat.name + '" data-stat="' + capitalize(pStat.name) + '"></div>');
				createStat(pStat);
				return;
			}

			$statDiv.append('<span>' + pStat.desc + '</span>');
		}

		function eraseStats() {
			$('#heroStats').empty();
		}

	// Abilities

		function createAbility(pAbility, pId) {
			$('#abilities').append('<label class="calc-box ability" data-id="'+ pId +'" style="background-image:url(resource/img/icon/'+ pAbility.src +'.png)"><input type="checkbox"></label>');
		}

		function eraseAbilities() {
			$('#abilities').empty();
		}

	// Talents

		function createTier(pTalents, pTier) {
			var tier = [1, 4, 7, 10, 13, 16, 20][pTier];
			$('#talents').append('<div class="tier" data-level="' + tier + '"></div>');
			for (var i = 0; i < pTalents.length; i++) {
				var num = pTier + '' + i;
				createTalent(pTalents[i], num, tier);
			}
		}

		function createTalent(pTalent, pNum, pTier) {
			$('.tier[data-level='+ pTier +']').append('<label for="talent' + pNum + '" data-id="'+ pNum +'" class="calc-box talent" style="background-image:url(resource/img/icon/'+ pTalent.src +'.png)"></label>');
			$('#talents-chosen').append('<input type="radio" name="tier'+ pTier +'" id="talent'+ pNum +'">');
		}

		function eraseTalents() {
			$('#talents').empty();
		}

	// Talents Chosen

		function chooseTalent(e) {
			var talentId = $(e.target).attr('id');
			talentId = talentId.match(/\d+/g)[0];

			for (var i = 0; i < talents[talentId.charAt(0)].length; i++) {
				talents[talentId.charAt(0)][i].deactivateTalent();
			}

			$('.tier[data-level=' + [1, 4, 7, 10, 13, 16, 20][talentId.charAt(0)] + '] .active').removeClass('active');
			$('.calc-box.talent[data-id=' + talentId + ']').addClass('active');
			talents[talentId.charAt(0)][talentId.charAt(1)].activateTalent();

			if([1, 4, 7, 10, 13, 16, 20][talentId.charAt(0)] > Item.prototype.level) {
				updateLevel([1, 4, 7, 10, 13, 16, 20][talentId.charAt(0)]);
			}
		}

	// Leveling

		function updateLevel(pLevel) {
			levelProgressBar.value = pLevel;
			Item.prototype.level = pLevel;

			eraseStats();

			for (var i = 0; i < stats.length - 1; i++) {
				stats[i].updateValues();
				createStat(stats[i]);
			}

			updateDps();
			createStat(stats[stats.length-1]);
		}

		function changeLevel(e) {
			var x = e.pageX - levelProgressBar.offsetLeft;
			var level = Math.round(x * levelProgressBar.max / levelProgressBar.offsetWidth);
			if (level === 0) level = 1;
			updateLevel(level);
		}

	// Tooltip

		function moveTooltip(e) {
			switch (e.type) {
				case 'mousemove':
					var posLeft = e.pageX + 430 < window.innerWidth ? e.pageX + 20 : e.pageX - 380;
					var posRight = e.pageY + 270 < window.innerHeight ? e.pageY + 20 : e.pageY - 220;

					$tooltip.css({
						left: posLeft,
						top: posRight
					});
					break;
				case 'mouseenter':
					changeTooltip(e.target);
					break;
				case 'mouseout':
					$tooltip.addClass('hidden');
					break;
			}
		}

		function changeTooltip(pTarget) {
			var item;
			var itemId = $(pTarget).data('id');


			if($(pTarget).hasClass('talent')) {
				var talentTier = itemId.toString().charAt(0);
				var talentRow = itemId.toString().charAt(1);
				item = talents[talentTier][talentRow];
			} else {
				item = abilities[itemId];
			}

			tooltip.changeTip(item);

			$('#tooltip .tip-name').html(tooltip.name);

			var tooltipP = tooltip.desc.split(/ \n /g);
			var desc = "";
			for (var i = 0; i < tooltipP.length; i++) {
				desc += '<p>' + tooltipP[i].replace(/\d+(?:[\.]\d+)?\%?/g, '<b>$&</b>') + '</p>';
			}
			$('#tooltip .tip-desc').empty().append(desc);

			$tooltip.css('background-image', 'url(resource/img/icon/' + tooltip.src + '.png)');

			var mismatchTip = ['name', 'desc', 'src'];
			var keys = Object.keys(tooltip);
			$('#tooltip .tip-stats').empty();
			for (var x = 0; x < keys.length; x++) {
				if(mismatchTip.indexOf(keys[x]) == -1) {
					$('#tooltip .tip-stats').append('<span class="hero-icon ' + keys[x] + '">' + tooltip[keys[x]] + '</span>');
				}
			}

			$tooltip.removeClass('hidden');
		}

	// Misc

	function capitalize(pString) {
    return pString.charAt(0).toUpperCase() + pString.slice(1);
	}

//}(window));
