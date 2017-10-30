import * as React from 'react';
import './Runway.css';

import * as jQuery from 'jquery';
import { fabric } from 'fabric';
import { isUndefined } from 'util';

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function parseOrThrow(value) {
    if (isUndefined(value)) {
        throw Error('API returned invalid response');
    } else {
        return parseInt(value, 10);
    }
}

class Runway extends React.Component {
    render() {
        return (
            <div>
                <canvas className="runway" id="runway" width="346" height="300" />
                <p id="weather">Weather information is loading. Provided by openweatherapi.com</p>
            </div>
        );
    }

    componentDidMount() {

        // TODO : Switch to https://api.darksky.net/forecast/ee9674fddecc28aa06243b405920c521/51.307862,-0.252657?exclude=minutely,hourly,daily,alerts,flags&units=uk2
        var url = 'http://api.openweathermap.org/data/2.5/weather?id=7290639&appid=f244df20990dd7f488afbd527b4803ca&mode=xml&units=imperial';

        jQuery.get(url).then(function(data) {
            const wind  = jQuery(data).find('wind');
            const speed = parseOrThrow(wind.find('speed').attr('value'));
            const direction = parseOrThrow(wind.find('direction').attr('value'));
            const directionName = wind.find('direction').attr('name');

            const msg = 'The wind is ' + speed + ' MPH from ' + directionName + ' at ' + direction + '&deg;.';

            jQuery('#weather').html(msg);

            const runwayAngle = 22.9;
            const relativeDirection = direction - runwayAngle + 180;
            const scale = 1;

            const runwayCenterX = 170 * scale;
            const runwayCenterY = 150 * scale;

            const length = speed * 5 * scale;

            const arrowEndX = runwayCenterX + Math.cos(toRadians(relativeDirection - 90)) * length;
            const arrowEndY = runwayCenterY + Math.sin(toRadians(relativeDirection - 90)) * length;
            console.log('Arrow end X = ' + arrowEndX + ' Arrow End Y = ' + arrowEndY);

            var canvas = new fabric.Canvas('runway');

            var line = new fabric.Line([arrowEndX, arrowEndY, runwayCenterX, runwayCenterY], {
                stroke: '#300',
                selectable: false,
                strokeWidth: '2',
                padding: 5,
                hasBorders: false,
                hasControls: false,
                originX: 'center',
                originY: 'center',
                lockScalingX: true,
                lockScalingY: true
            });

            var centerX = (line.x1 + line.x2) / 2,
                centerY = (line.y1 + line.y2) / 2;
            var deltaX = line.left - centerX,
                deltaY = line.top - centerY;

            var arrow = new fabric.Triangle({
                left: line.get('x1') + deltaX,
                top: line.get('y1') + deltaY,
                originX: 'center',
                originY: 'center',
                hasBorders: false,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
                pointType: 'arrow_start',
                angle: relativeDirection,
                width: 20,
                height: 20,
                fill: '#400'
            });
            arrow.line = line;

            var circle = new fabric.Circle({
                left: line.get('x2') + deltaX,
                top: line.get('y2') + deltaY,
                radius: 3,
                stroke: '#400',
                strokeWidth: 3,
                originX: 'center',
                originY: 'center',
                hasBorders: false,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
                pointType: 'arrow_end',
                fill: '#400'
            });
            circle.line = line;

            line.customType = arrow.customType = circle.customType = 'arrow';
            line.circle = arrow.circle = circle;
            line.arrow = circle.arrow = arrow;

            canvas.add(line, arrow, circle);


            fabric.Image.fromURL('runway.jpg', function(img) {
                img.scale(scale).set({
                    left: 0,
                    top: 0
                });
                canvas.setWidth(img.width * scale);
                canvas.setHeight(img.height * scale);
                canvas.add(img);
                canvas.sendToBack(img);

            });


        }).fail(function(error) { console.log('Error ' + JSON.stringify(error)); });
    }
}

export default Runway;

