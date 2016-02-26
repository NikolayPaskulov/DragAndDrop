$(function () {

    var ComponentsInteractions = (function () {
        
        var selectors = {
            pageLayout: '#page-layout',
            components : '#components',
            componentsHeader: '#components .components-header',
            componentsMinimize: '#components .components-header .components-minimize',
            componentsPin: '#components .components-header .components-pin'
        }

        var events = {
            pin: {
                click: function (e) {
                    var _this = $(this);
                    if (_this.data('pinned') === true) {
                        var components = $(selectors.components);
                        var direction = components.data('direction')
                        var componentsWidth = components.width();

                        components.css('width', componentsWidth);

                        if (direction == 'left') {
                            components.css('right', '10px');
                        } else if (direction == 'right') {
                            components.css('left', '10px');
                        } else if (direction == 'top') {
                            components.css('top', '10px');
                        } else if (direction == 'bottom') {
                            components.css('bottom', '10px');
                        }

                        components.addClass("fixed");


                        _this.data('isPinned', false);
                    } else {
                        var components = $(selectors.components);
                        var direction = components.data('direction');

                        _this.data('isPinned', true);
                    }
                }
            }
        }

        function ComponentsInteractions() {
            this.Initialize();
        }

        ComponentsInteractions.prototype.Initialize = function () {
            this.AddEvents();
        };

        ComponentsInteractions.prototype.AddEvents = function () {
            $(selectors.componentsPin).on("click", events.pin.click)
        };

        // helpers



        return ComponentsInteractions;
    })();

    var componentsInteractions = new ComponentsInteractions();

});