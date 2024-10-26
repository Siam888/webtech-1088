class Robot {
    constructor(name) {
        this.name = name;
    }

    move() {
        console.log(`Robot ${this.name} is moving`);
    }
}

class Weapon {
    constructor(description) {
        this.description = description
    }

    fire() {
        console.log(`Firing ${this.description}`);
    }
}

class CombatRobot extends Robot {
    constructor(name) {
        super(name)
        this.weapons = []
    }

    addWeapon(weapon) {
        this.weapons.push(weapon)
    }

    fireAll() {
        console.log('Combat Robot is firing');

        this.weapons.forEach(w => w.fire())
    }
}


const r1 = new CombatRobot('Combat Robot Abc')
const r2 = new Robot('Combat Robot Abc')
const w1 = new Weapon('pew pew laser')
const w2 = new Weapon('boom boom bomb')



r1.addWeapon(w1);
r1.addWeapon(w2);
r1.move();
r1.fireAll();

Robot.prototype.fly = function () { console.log(`${this.name} is flying`) }

r1.fly()

 
