{% macro row(columns) -%}
{% import 'partials/structure.njs' as structure %}
{% import 'partials/content.njs' as content %}
    <div class="row">
        {% for column in columns -%}
        <div class="{{ structure.columnClass(column.width) }}">
            {{ content.content(column.content) }}
        </div>
        {%- endfor %}
    </div>
{%- endmacro %}

{% macro columnClass(number) -%}
    {% if number == 1 -%}one-columns
    {%- elif number == 2 -%}two-columns
    {%- elif number == 3 -%}three-columns
    {%- elif number == 4 -%}four-columns
    {%- elif number == 5 -%}five-columns
    {%- elif number == 6 -%}six-columns
    {%- elif number == 7 -%}seven-columns
    {%- elif number == 8 -%}eight-columns
    {%- elif number == 9 -%}nine-columns
    {%- elif number == 10 -%}ten-columns
    {%- elif number == 11 -%}eleven-columns
    {%- elif number == 12 -%}twelve-columns{%- endif %}
{%- endmacro %}
