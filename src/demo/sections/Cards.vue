<template>
  <div>
    <h3>Cards</h3>
    <div class="d-flex">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        class="mr-4 mt-4 d-inline-block my-auto"
        :height="height"
        :width="width"
      >
        <template v-if="card.headerTag" v-slot:header>
          <component
            :is="card.headerTag"
            :class="card.headerClass"
            :height="card.headerHeight"
          >
            {{ card.header }}
          </component>
        </template>

        <component
          v-if="card.overline"
          :is="card.overlineTag || 'div'"
          :class="card.overlineClass"
        >
          {{ card.overline }}
        </component>
        <component
          v-if="card.title"
          :is="card.titleTag || 'div'"
          :class="card.titleClass"
        >
          {{ card.title }}
        </component>
        <component
          v-if="card.subtitle"
          :is="card.subtitleTag || 'div'"
          :class="card.subtitleClass"
        >
          {{ card.subtitle }}
        </component>

        <template v-if="card.asideTag" v-slot:aside>
          <component
            :is="card.asideTag || 'div'"
            :class="card.asideClass"
            :width="card.asideWidth"
          >
            {{ card.aside }}
          </component>
        </template>

        <component
          v-if="card.content"
          :is="card.contentTag || 'div'"
          :class="card.contentClass"
        >
          {{ card.content }}
        </component>

        <template v-slot:actions>
          <component
            v-if="card.actions"
            :class="card.actionClass"
            :is="'CardActions'"
          >
            <component
              v-for="(action, index) in card.actions"
              :key="index"
              :is="action.tag"
              class="mr-2"
              :color="action.color"
              :disabled="action.disabled"
              :class="action.class"
            >
              {{ action.text }}
            </component>
          </component>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
