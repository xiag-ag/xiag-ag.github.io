Selectize.define('caret_button', function (options) {
    var self = this,
        is_open = false,
        is_disabled = false,
        $button = $('<a href="#" class="selectize-caret-btn"></a>'),
        $icon = $('<span class="selectize-caret-ico"></span>').appendTo($button);

    options = _.extend({
        closeDelay: 250
    }, options);

    self.on('dropdown_open', function () {
        is_open = true;
        is_disabled = false;

        $icon.addClass('open');
    });
    self.on('dropdown_close', function () {
        is_open = false;
        is_disabled = true;

        $icon.removeClass('open');

        _.delay(function () {
            is_disabled = false;
        }, options.closeDelay);
    });

    self.onMouseDown = _.wrap(self.onMouseDown, function (original) {
        if (self.isFocused) {
            return false;
        }

        return original.apply(self, _.rest(arguments));
    });
    self.setup = _.wrap(self.setup, function (original) {
        $button.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (self.isLocked) {
                return;
            }

            if (!is_open && !is_disabled) {
                self.open();
            }
        });

        var result = original.apply(self, _.rest(arguments));

        self.$caret_button = $button;
        self.$caret_icon = $icon;
        self.$wrapper.append($button);

        return result;
    });
});