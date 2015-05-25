{% macro content(content) %}
{% for item in content -%}
    {% if item.type == 'headline' -%}
    {% import 'partials/headlines.njs' as headlines -%}
    {{ headlines.headline(item.content) }}
    {%- endif %}
{%- endfor %}
{% endmacro %}
