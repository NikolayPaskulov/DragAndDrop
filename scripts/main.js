
$(function () {

    var ComponentsInteractions = (function () {
        var selectors = {
            pageLayout: '#page-layout',
            components: '#components',
            componentsHeader: '#components .components-header',
        }

        var Directions = { Left: 'left', Right: 'right' };

        function ComponentsInteractions() {
            this.Initialize();
        }

        ComponentsInteractions.prototype.Initialize = function () {
            this.AddEvents();
        };

        ComponentsInteractions.prototype.AddEvents = function () {
            this.AddComponentsLayoutEvents();
            this.AddComponentsEvents();
        };

        ComponentsInteractions.prototype.AddComponentsLayoutEvents = function () {
            dragula([document.querySelector('.container-fluid > .row')], {
                moves: function (el, source, handle, sibling) {
                    return el.id != 'page-layout' && handle.className == 'components-header';
                },
                accepts: function (el, target, source, sibling) {
                    return false;
                },
            })
            .on('drag', drag_start)
            .on('dragend', drag_end);

            function drag_start(element) {
                // Create a shadow

                // handle on mouse move
                // update data-direction
                // update shadow position

                var el = $(element);
                var direction = el.data('direction');

                var dropShadow = $('<div />')
                                    .addClass('components-drop-shadow')
                                    .hide()
                                    .data('direction', direction);

                $(document).on('mousemove', function (ev) {
                    var closeToEdge = 20;
                    var width = $(document.body).width();
                    var height = $(document.body).height();
                    var x = ev.pageX;
                    var y = ev.pageY;

                    if (x >= (width - closeToEdge)) {
                        positionShadow(Directions.Right, el.width() + 50);
                    } else if (x <= closeToEdge) {
                        positionShadow(Directions.Left, el.width() + 50);
                    } else {
                        resetShadow();
                    }
                });

                function resetShadow() {
                    dropShadow.removeClass(dropShadow.data('direction'));
                    dropShadow.data('direction', false);
                    dropShadow.hide();
                }

                function positionShadow(direction, width) {
                    var directionClass = dropShadow.data('direction');

                    dropShadow.removeClass(directionClass);
                    dropShadow.addClass(direction);

                    if (width)
                        dropShadow.css('width', width);

                    dropShadow.data('direction', direction);
                    dropShadow.show();
                }

                $('.container-fluid').append(dropShadow);
            }

            function drag_end(element) {
                // handle drop based on data-direction
                // remove drop-shadow

                var el = $(element);
                var pageLayout = $(selectors.pageLayout);
                var shadow = $('.components-drop-shadow');
                var direction = shadow.data('direction');

                if (direction != false && direction != el.data('direction')) {
                    if (direction == Directions.Left) {
                        replaceComeponets(Directions.Left, 'col-xs-3', 'row col-xs-9');
                    } else if (direction == Directions.Right) {
                        replaceComeponets(Directions.Right, 'col-xs-3 col-xs-push-9', 'row col-xs-9 col-xs-pull-3');
                    }
                }

                function replaceComeponets(direction, componentsClasses, pageClasses) {
                    el.get(0).className = componentsClasses;
                    pageLayout.get(0).className = pageClasses;

                    el.data('direction', direction);
                }

                $(document).off('mousemove');

                shadow.remove();
            }
        };

        ComponentsInteractions.prototype.AddComponentsEvents = function () {
            dragula([document.querySelector('#components .components-body')], {
                isContainer: function (el) {
                    return el.classList.contains('aside');
                },
                moves: function (el, source, handle, sibling) {
                    return true;
                },
                accepts: function (el, target, source, sibling) {
                    return !target.classList.contains("components-body");
                },
                copy: function (el, source) {
                    return source.classList.contains("components-body");
                }
            }).on('drag', function (el) {
                console.log(el);
            });
        };

        return ComponentsInteractions;
    })();

    var componentsInteractions = new ComponentsInteractions();

});