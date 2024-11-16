import { createSlice } from '@reduxjs/toolkit'

const reloadSlice = createSlice({
  name: 'reload',
  initialState: {
    reload: false
  },
  reducers: {
    triggerReload: (state) => {
      state.reload = !state.reload // Đảo trạng thái reload để kích hoạt
    }
  }
})

export const { triggerReload } = reloadSlice.actions
export default reloadSlice.reducer
