//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------


/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 *
 * Game state.
 */


the_final_stand.scene.Highscore = function () {
    rune.scene.Scene.call(this);

    this.highscoreManager = new the_final_stand.managers.HighscoreManager();
};


//-----------------------------------------------------------A-------------------
// Inheritance
//------------------------------------------------------------------------------


the_final_stand.scene.Highscore.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.Highscore.prototype.constructor = the_final_stand.scene.Highscore;


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


/**
 * @inheritDoc
 */


the_final_stand.scene.Highscore.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.selectSound = this.application.sounds.sound.get("select");
    this.music = this.application.sounds.sound.get("highscore");

    this.m_initBackground();
    this.m_initMenu();
    this.m_renderHighScores();
};

the_final_stand.scene.Highscore.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepads.get(0).justPressed(0)) {
        this.selectSound.play();
        this.menu.select();
    }
};

the_final_stand.scene.Highscore.prototype.m_initBackground = function () {
    this.background = new rune.display.Sprite(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, "highscore_bg"
    );
    this.background.animation.create("play", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
    this.stage.addChild(this.background);
};

the_final_stand.scene.Highscore.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({ resource: "tfs_font", duration: 30, pointer: the_final_stand.entity.Pointer });
    this.menu.add("BACK TO MENU");
    this.menu.x = 435;
    this.menu.y = 665;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
    this.music.play();
};

the_final_stand.scene.Highscore.prototype.m_renderHighScores = function () {
    var teamHeader = new rune.text.BitmapField("TEAM", "tfs_font_black");
    var waveHeader = new rune.text.BitmapField("WAVE", "tfs_font_black");
    var zombiesKilledHeader = new rune.text.BitmapField("ZOMBIES KILLED", "tfs_font_black");

    var spacing = 1280 / 4;

    teamHeader.x = spacing - 120;
    waveHeader.x = (spacing - 100) * 2;
    zombiesKilledHeader.x = (spacing - 100) * 3;

    teamHeader.y = waveHeader.y = zombiesKilledHeader.y = 235;

    teamHeader.autoSize = waveHeader.autoSize = zombiesKilledHeader.autoSize = true;
    teamHeader.scaleX = waveHeader.scaleX = zombiesKilledHeader.scaleX = 1.8;
    teamHeader.scaleY = waveHeader.scaleY = zombiesKilledHeader.scaleY = 1.8;

    this.stage.addChild(teamHeader);
    this.stage.addChild(waveHeader);
    this.stage.addChild(zombiesKilledHeader);

    // Hämta highscores
    var highscores = this.highscoreManager.getHighscores();

    for (var i = 0; i < highscores.length; i++) {
        var text1 = "" + highscores[i].team;
        var teamText = new rune.text.BitmapField(text1, "tfs_font_black");

        var text2 = "" + highscores[i].wave;
        var waveText = new rune.text.BitmapField(text2, "tfs_font_black");

        var text3 = "" + highscores[i].zombiesKilled;
        var zombiesKilledText = new rune.text.BitmapField(text3, "tfs_font_black");

        teamText.autoSize = waveText.autoSize = zombiesKilledText.autoSize = true;

        teamText.x = teamHeader.x; // Same as teamHeader
        teamText.y = teamHeader.y + teamHeader.height + 25 + i * 30; // Below teamHeader

        waveText.x = waveHeader.x + 45; // Same as waveHeader
        waveText.y = waveHeader.y + waveHeader.height + 25 + i * 30; // Below waveHeader

        zombiesKilledText.x = zombiesKilledHeader.x + 210; // Same as zombiesKilledHeader
        zombiesKilledText.y = zombiesKilledHeader.y + zombiesKilledHeader.height + 25 + i * 30; // Below zombiesKilledHeader

        teamText.scaleX = waveText.scaleX = zombiesKilledText.scaleX = 1.5;
        teamText.scaleY = waveText.scaleY = zombiesKilledText.scaleY = 1.5;

        this.stage.addChild(teamText);
        this.stage.addChild(waveText);
        this.stage.addChild(zombiesKilledText);
    }
};

the_final_stand.scene.Highscore.prototype.selectOption = function (option) {
    switch (option.text) {
        case "BACK TO MENU":
            this.application.scenes.load([
                new the_final_stand.scene.Menu()
            ]);
            break;
    }
};