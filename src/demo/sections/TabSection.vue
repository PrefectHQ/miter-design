<template>
  <div>
    <h3>Tabs</h3>

    <div class="container">
      <Tabs v-model="tab" class="mt-5">
        <Tab href="1">
          <i class="pi pi-Earth pi-lg mr-1" />
          Tab 1
        </Tab>
        <Tab href="2"> <i class="pi pi-Tag-with-Heart pi-lg mr-1" />Tab 2 </Tab>
        <Tab href="3"> <i class="pi pi-Bug-Warning pi-lg mr-1" />Tab 3 </Tab>
        <Tab href="4"> <i class="pi pi-Compass pi-lg mr-1" />Tab 4 </Tab>
      </Tabs>

      <div class="pr-4 py-2">
        <div v-if="tab == 1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <br />
          Suspendisse sit amet sagittis erat, vel lacinia felis. Curabitur
          blandit accumsan scelerisque. In id facilisis sapien. Proin malesuada
          eros nec tempor faucibus. Suspendisse vel vestibulum tortor, vitae
          convallis elit. Nam non dolor gravida, tempor nunc vitae, maximus
          velit. Maecenas consequat ante nunc, posuere cursus est congue quis.
          Morbi at convallis nunc. Maecenas tempus ex at hendrerit commodo. Duis
          urna elit, auctor vitae purus in, hendrerit volutpat justo.
        </div>
        <div v-else-if="tab == 2">
          Mauris ac leo placerat, fermentum justo a, cursus nibh. Phasellus in
          elementum quam. Ut non facilisis augue, nec suscipit quam. Integer
          dignissim lobortis ligula, in pellentesque leo euismod eget. Aenean
          sodales sodales sem non fermentum. Duis posuere pretium ante, vel
          faucibus odio eleifend sit amet.
          <br />
          Aliquam nec convallis nunc. Sed efficitur consequat dolor, condimentum
          hendrerit ante dignissim nec. Aliquam erat volutpat. Aenean blandit
          lectus a dolor gravida condimentum. Aenean ac lacinia libero, quis
          iaculis urna. Duis interdum dolor ligula, et semper eros maximus nec.
          Maecenas maximus, ante sit amet sollicitudin posuere, metus purus
          tristique ante, ac sollicitudin ex magna ullamcorper sem. Quisque et
          dapibus nisi, ac iaculis ex. Etiam eu nulla nec felis vulputate
          finibus sit amet eget mauris. Nulla ornare ultrices ex sit amet
          lobortis. Morbi et varius nisi, vel porttitor sapien. Integer quis
          diam neque. Nunc porttitor auctor suscipit.
        </div>
        <div v-else-if="tab == 3">
          Nullam ullamcorper lobortis massa. Etiam maximus, lacus eget volutpat
          pharetra, risus neque rutrum erat, dapibus varius sem quam vitae
          lorem. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Nulla sem ex, fermentum non elit
          et, pellentesque aliquet felis. Nunc vitae eros id ipsum laoreet
          pulvinar ac nec ex. Vestibulum tincidunt nunc sapien. Proin laoreet
          tempus ex sit amet convallis. Nullam pellentesque nisl sit amet magna
          rhoncus lobortis. Donec ex orci, porta ut magna ullamcorper, suscipit
          mollis magna. Etiam at dolor orci. Duis iaculis varius velit. Donec
          tempor leo eget aliquam laoreet. Morbi ut fermentum nulla, vel
          tristique nisi. Phasellus eget sapien nec elit dictum scelerisque.
          <br />
          Proin tempus nisl nec diam dapibus, sit amet facilisis risus mattis.
          Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nullam vehicula tortor diam, nec porta lacus dictum vitae.
          Nulla vel tellus magna. Nunc nisi lacus, molestie eget sapien ac,
          ornare iaculis elit. Nulla volutpat egestas felis vel hendrerit.
        </div>
        <div v-else-if="tab == 4">
          Etiam et ligula fermentum, vehicula tellus eget, pellentesque justo.
          Donec magna turpis, pulvinar et felis at, placerat ullamcorper sapien.
          Fusce nibh quam, cursus lobortis tempus vel, tincidunt non metus. Sed
          quis magna rhoncus, auctor lorem a, vestibulum urna. Pellentesque
          sagittis vel ex vel gravida. Aenean efficitur vestibulum mi, at varius
          ex maximus id. Donec vel euismod neque. Etiam lacus lacus, porttitor
          id dolor in, hendrerit volutpat massa. Suspendisse potenti. Fusce nibh
          mi, dapibus sed urna non, auctor iaculis velit. Morbi ullamcorper
          risus ut metus porta fringilla. Suspendisse at velit ante. Suspendisse
          accumsan sagittis faucibus.
          <br />
          Sed aliquet, augue sed euismod dapibus, massa est placerat tellus, vel
          porttitor quam ipsum nec nisl. Phasellus urna odio, egestas ut dictum
          vel, pharetra quis tellus. Proin cursus ex diam, a cursus neque
          pellentesque blandit. Proin non luctus augue. Nulla et eros quis felis
          lacinia porta. Nam porta tristique venenatis. Pellentesque condimentum
          purus eget turpis interdum sollicitudin. Vivamus tempus ipsum diam,
          sit amet tempus justo tempor nec. In tortor sapien, convallis eget
          sollicitudin vitae, volutpat non arcu. Praesent pulvinar nisl non
          augue pellentesque ullamcorper. Etiam et nisl diam. Integer facilisis
          varius luctus. Duis sed pulvinar sapien.
        </div>
        <div v-else>No tab selected</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class TabSection extends Vue {
  tab = 1

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
.divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 600px;
}
</style>
