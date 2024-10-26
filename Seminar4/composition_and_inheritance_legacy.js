function Robot(name) {
    this.name = name;
}

// Adding methods to the Robot prototype
Robot.prototype.move = function() {
    console.log(`Robot ${this.name} is moving`);
};

function Weapon(description) {
    this.description = description;
}

// Adding methods to the Weapon prototype
Weapon.prototype.fire = function() {
    console.log(`Firing ${this.description}`);
};

function CombatRobot(name) {
    // Call the parent constructor with the context of this new object
    Robot.call(this, name);
    this.weapons = [];
}

// Set up inheritance from Robot
CombatRobot.prototype = Object.create(Robot.prototype);
CombatRobot.prototype.constructor = CombatRobot;

// Adding methods specific to CombatRobot
CombatRobot.prototype.addWeapon = function(weapon) {
    this.weapons.push(weapon);
};

CombatRobot.prototype.fireAll = function() {
    console.log('Combat Robot is firing');
    this.weapons.forEach(function(w) {
        w.fire();
    });
};


const terminator = new CombatRobot('Terminator');
terminator.move(); // Output: Robot Terminator is moving

const laser = new Weapon('Laser');
terminator.addWeapon(laser);
terminator.fireAll(); // Output: Combat Robot is firing... Firing Laser
