Selectize.define('quick_list', function (options) {
    var self = this,
        is_visible = true,
        $list = $('<div class="selectize-quick-list"></div>');

    options = _.extend({
        pinnedOptions: []
    }, options);

    self.on('dropdown_close', function () {
        is_visible = true;
    });

    self.addItem = _.wrap(self.addItem, function (original) {
        is_visible = true;

        return original.apply(self, _.rest(arguments));
    });
    self.removeItem = _.wrap(self.removeItem, function (original) {
        is_visible = true;

        return original.apply(self, _.rest(arguments));
    });
    self.onSearchChange = _.wrap(self.onSearchChange, function (original, value) {
        is_visible = value === '';

        return original.apply(self, _.rest(arguments));
    });
    self.refreshOptions = _.wrap(self.refreshOptions, function (original) {
        var result = original.apply(self, _.rest(arguments));

        self.refreshPinned();

        return result;
    });
    self.refreshPinned = function () {
        if (!is_visible) {
            return;
        }

        var values = [];
        if (_.isArray(options.pinnedOptions)) {
            values = options.pinnedOptions;
        } else if (_.isFunction(options.pinnedOptions)) {
            values = options.pinnedOptions.call(undefined);
        }

        if (self.settings.hideSelected) {
            values = _.difference(values, _.isArray(self.getValue()) ? self.getValue() : [self.getValue()]);
        }
        if (!values.length) {
            return;
        }

        var items = [];
        _.each(values, function (value) {
            var option = self.options[value];
            if (option) {
                items.push(self.render('option', option));
            }
        });

        if (!items.length) {
            return;
        }

        self.$quick_list.empty().html(items.join(''));
        self.$dropdown_content.prepend(self.$quick_list);

        self.setActiveOption(self.getOption(values[0]));
    };
    self.setup = _.wrap(self.setup, function (original) {
        self.$quick_list = $list;

        return original.apply(self, _.rest(arguments));
    });
});