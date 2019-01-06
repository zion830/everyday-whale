/* -----------------------------------------------------
  Pure CSS Progress Bars
  GitHub Project: https://github.com/rkchauhan/pure-css-progress-bars/
  By: Ravikumar Chauhan
  Find me on -
  Twitter: https://twitter.com/rkchauhan01
  Facebook: https://www.facebook.com/ravi032chauhan
  GitHub: https://github.com/rkchauhan
  CodePen: http://codepen.io/rkchauhan
-------------------------------------------------------- */
$(document).ready(function () {

    $('#level').progress_fnc();

    $('.progressStart').on('click', function () {
        var perent = $(this).closest("div").attr("id");
        $('#' + perent).progress_fnc({type: 'start'});
    });

    $('.progressReset').on('click', function () {
        var perent = $(this).closest("div").attr("id");
        $('#' + perent).progress_fnc({type: 'reset'});
    });

});


(function ($) {
    var perent = $(this).closest("div").attr("id");
    $('#' + perent).progress_fnc({type: 'start'});

    $.fn.progress_fnc = function (options) {
        var settings = $.extend({
            type: 'start'
        }, options);

        var div = $(this);
        var progress = div.find('.cssProgress');

        progress.each(function () {
            var self = $(this);
            var progress_bar = self.find('.cssProgress-bar');
            var progress_label = self.find('.cssProgress-label, .cssProgress-label2');
            var progress_value = progress_bar.data('percent');
            var percentage = parseInt(progress_value, 10) + '%';

            progress_bar.css({
                'width': '0%',
                'transition': 'none',
                '-webkit-transition': 'none',
                '-moz-transition': 'none'
            });

            if (settings.type === 'start') {
                progress_bar.animate({
                    width: percentage
                }, {
                    duration: 1000,
                    step: function (x) {
                        progress_label.text(Math.round(x) + '%');
                    }
                });

            } else if (settings.type == 'reset') {
                progress_bar.css('width', '0%');
                progress_label.text('0%');
            }

        });
    }

}(jQuery));
