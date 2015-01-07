var spheron = require('spheron'),
    sphero = spheron.sphero(),
    spheroPort = '/dev/cu.Sphero-RRY-RN-SPP',
    COLORS = spheron.toolbelt.COLORS,
    dualShock = require('dualshock-controller'),
    controller = dualShock({
        config: "dualShock3"
    }),
    controllerEvents = [{
        controllerEvent: 'dpadUp:press',
        response: roll(0)
    }, {
        controllerEvent: 'dpadUp:release',
        response: stop
    }, {
        controllerEvent: 'dpadDown:press',
        response: roll(180)
    }, {
        controllerEvent: 'dpadUp:release',
        response: stop
    }, {
        controllerEvent: 'dpadLeft:press',
        response: roll(270)
    }, {
        controllerEvent: 'dpadLeft:release',
        response: stop
    }, {
        controllerEvent: 'dpadRight:press',
        response: roll(90)
    }, {
        controllerEvent: 'dpadRight:release',
        response: stop
    }, {
        controllerEvent: 'square:press',
        response: setColor(COLORS.PINK)
    }, {
        controllerEvent: 'triangle:press',
        response: setColor(COLORS.GREEN)
    }, {
        controllerEvent: 'circle:press',
        response: setColor(COLORS.RED)
    }, {
        controllerEvent: 'x:press',
        response: setColor(COLORS.BLUE)
    }];

sphero.on('open', function() {
    setControllerEvents();
});

sphero.on('message', function (message) {
  console.log('Sphero sent this message: ', message);
});

sphero.open(spheroPort);

function roll(heading) {
    return function() {
        sphero.heading = heading;
        sphero.roll(128, heading, 1);
    };
}

function stop() {
    sphero.roll(0, sphero.heading || 0, 0);
}

function setColor(color) {
    return function() {
        sphero.setRGB(color, false);
    };
}

function setControllerEvents() {
    controller.connect();
    for (var i = 0; i < controllerEvents.length; i++) {
        controller.on(controllerEvents[i].controllerEvent, controllerEvents[i].response);
    }
}