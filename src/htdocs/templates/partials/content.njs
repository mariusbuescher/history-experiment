{% macro content(content) %}
{% for item in content -%}
    {% if item.type == 'row' -%}
    {% import 'partials/structure.njs' as structure %}
    {{ structure.row(item.columns) }}
    {%- elif item.type == 'headline' -%}
    {% import 'partials/headlines.njs' as headlines -%}
    {{ headlines.headline(item.content) }}
    {%- endif %}
{%- endfor %}
{% endmacro %}
