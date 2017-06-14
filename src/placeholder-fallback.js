/*
	simulate textbox placeholder for IE9-
 */
function placeholderFallback($inputFields) {
	if (typeof $('<input type="text"/>')[0].placeholder !== 'undefined') {
		return;
	}
	if (!$inputFields.length) {
		return;
	}

	var CLS_FIELD_EMPTY = 'empty-field';
	var CLS_FIELD_NOEMPTY = 'noempty-field';
	var ATTR_ORIGINAL_VALUE = 'data-original-value';

	$inputFields.addClass(CLS_FIELD_EMPTY);
	$inputFields.each(function () {
		var $this = $(this);
		var defaultValue = $this.attr('placeholder');
		$this.attr(ATTR_ORIGINAL_VALUE, defaultValue);

		var currentValue = $this.val();

		if (defaultValue && !currentValue) {
			$this.val(defaultValue);
			currentValue = defaultValue;
		}

		if (currentValue === defaultValue) {
			$this.removeClass(CLS_FIELD_NOEMPTY).addClass(CLS_FIELD_EMPTY);
		}
		else {
			$this.removeClass(CLS_FIELD_EMPTY).addClass(CLS_FIELD_NOEMPTY);
		}
	});

	$inputFields.focus(function () {
		var $this = $(this);
		$this.off('change', fieldChange);

		if ($this.hasClass(CLS_FIELD_EMPTY)) {
			$this.val('');
			$this.removeClass(CLS_FIELD_EMPTY).addClass(CLS_FIELD_NOEMPTY);
		}
	});

	$inputFields.blur(function () {
		var $this = $(this);
		$this.on('change', fieldChange);

		if ($this.val()) {
			$this.removeClass(CLS_FIELD_EMPTY).addClass(CLS_FIELD_NOEMPTY);
		}
		else {
			$this.removeClass(CLS_FIELD_NOEMPTY).addClass(CLS_FIELD_EMPTY);
			$this.val($this.attr(ATTR_ORIGINAL_VALUE));
		}
	});

	function fieldChange() {
		$(this).removeClass(CLS_FIELD_EMPTY).addClass(CLS_FIELD_NOEMPTY);
	}
}
