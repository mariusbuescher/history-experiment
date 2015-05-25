{% macro content(content) %}
{% for item in content -%}
    {% if item.type == 'row' -%}
    {% import 'partials/structure.njs' as structure %}
    {{ structure.row(item.columns) }}
    {%- elif item.type == 'tabs' -%}
    {% import 'partials/structure.njs' as structure %}
    {{ structure.tabs(item.tabs) }}
    {%- elif item.type == 'headline' -%}
    {% import 'partials/headlines.njs' as headlines -%}
    {{ headlines.headline(item.content) }}
    {%- elif item.type == 'copytext' -%}
    {% import 'partials/text.njs' as text %}
    {{ text.copytext(item.content) }}
    {%- endif %}
{%- endfor %}
{% endmacro %}
