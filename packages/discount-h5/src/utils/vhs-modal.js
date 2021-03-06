const vhs = {
  /** 使用方式
     *
     * vhs.showToast({
     *       content: "toast内容",
     *       duration: 2500,
     *       complete: function() {
     *           console.log("toast消失回调");
     *       }
     *   });
     */
  showToast(toast) {
    // 动态创建toast模版 - 作为body的子节点
    const that = this;
    const createToastTemplate = () => {
      const scale = that.getValidMetaWidthScale();

      const x = document.getElementsByTagName('body')[0];
      const v = document.createElement('div');
      v.id = 'vhs-main-toast';
      v.style.visibility = 'hidden';
      v.style.minWidth = '45%';
      v.style.maxWidth = '55%';
      v.style.left = '0';
      v.style.right = '0';
      v.style.marginLeft = 'auto';
      v.style.marginRight = 'auto';
      v.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      v.style.color = '#fff';
      v.style.textAlign = 'center';
      v.style.borderRadius = `${5}px`;
      v.style.padding = `${10}px`;
      v.style.position = 'fixed';
      v.style.zIndex = '10';
      v.style.top = '35%';
      v.style.fontSize = `${16 * scale}px`;
      x.appendChild(v);
    };

    // 删除toast模版
    const removeToast = () => {
      const v = document.getElementById('vhs-main-toast');
      v.parentNode.removeChild(v);
    };

    let duration = 3000;
    if (toast.duration) {
      duration = toast.duration;
    }

    if (toast.content) {
      createToastTemplate();
      const x = document.getElementById('vhs-main-toast');
      x.innerHTML = toast.content;
      x.style.visibility = 'visible';
      setTimeout(() => {
        removeToast();
        if (toast.complete) toast.complete();
      }, duration);
    }
  },
  getValidMetaWidthScale() {
    let scale = 1;
    const metaTagList = document.getElementsByTagName('meta');
    let metaContentWidth = 0;
    for (let i = metaTagList.length - 1; i >= 0; i -= 1) {
      const meta = metaTagList[i];
      const content = meta.getAttribute('content');
      if (!(content == null || content.indexOf('width') === -1 || content === 'null')) {
        const attributeList = content.split(',');
        for (let j = 0, len = attributeList.length; j < len; j += 1) {
          const attr = attributeList[j];
          if (attr.indexOf('width') !== -1) {
            const widthArray = attr.split('=');
            metaContentWidth = widthArray[widthArray.length - 1];
          }
        }
        if (metaContentWidth > 0) {
          break;
        }
      }
    }
    const standardMetaWidth = 375.0;
    if (metaContentWidth !== 0) {
      scale = metaContentWidth / standardMetaWidth;
    }
    return scale;
  },

  /** 使用方式
     *
     * vhs.showModal({
     *       title: "提示",
     *       content: "modal内容",
     *       cancelTitle: "取消按钮文本",
     *       cancel: function() {
     *           console.log("取消事件回调");
     *       },
     *       confirmTitle: "确认按钮文本",
     *       confirm: function() {
     *           console.log("确认按钮回调");
     *       }
     *   });
     */
  showModal(modal, dom) {
    const that = this;
    const createModalTemplate = () => {
      const scale = that.getValidMetaWidthScale();

      const body = document.getElementsByTagName('body')[0];

      const bgCover = document.createElement('div');
      bgCover.id = 'vhs-modal-bg-cover';
      bgCover.style.backgroundColor = 'rgba(51, 51, 51, 0.85)';
      bgCover.style.width = '100%';
      bgCover.style.height = '100%';
      bgCover.style.position = 'fixed';
      bgCover.style.zIndex = '999';
      bgCover.style.top = '0';
      body.appendChild(bgCover);

      const warp = document.createElement('div');
      warp.id = 'vhs-modal-warp';
      warp.style.visibility = 'visible';
      warp.style.minWidth = '50%';
      warp.style.maxWidth = '66.8%';
      warp.style.backgroundColor = '#fff';
      warp.style.color = '#333';
      warp.style.textAlign = 'center';
      warp.style.borderRadius = `${5 * scale}px`;
      warp.style.paddingTop = `${10 * scale}px`;
      warp.style.position = 'fixed';
      warp.style.zIndex = '10';
      warp.style.left = 0;
      warp.style.right = 0;
      warp.style.marginLeft = 'auto';
      warp.style.marginRight = 'auto';
      warp.style.top = '44%';
      warp.style.fontSize = `${15 * scale}px`;
      warp.style.borderStyle = 'solid';
      warp.style.borderColor = '#e1e0e4';
      warp.style.borderWidth = `${1 * scale}px`;
      bgCover.appendChild(dom);

      // const topDiv = document.createElement('div');
      // warp.appendChild(topDiv);

      // const title = document.createElement('p');
      // title.id = 'vhs-modal-title';
      // title.style.fontSize = `${16 * scale}px`;
      // title.style.marginTop = '0px';
      // title.style.marginBottom = '0px';
      // topDiv.appendChild(title);

      // const content = document.createElement('div');
      // content.id = 'vhs-modal-content';
      // content.style.paddingTop = `${10 * scale}px`;
      // content.style.paddingBottom = `${15 * scale}px`;
      // content.style.paddingLeft = `${10 * scale}px`;
      // content.style.paddingRight = `${10 * scale}px`;
      // content.style.fontSize = `${14 * scale}px`;
      // content.style.color = 'rgb(95, 92, 92)';
      // topDiv.appendChild(content);

      // const actionDiv = document.createElement('div');
      // actionDiv.id = 'vhs-modal-action';
      // actionDiv.style.bottom = `${9 * scale}px`;
      // actionDiv.style.width = '100%';
      // actionDiv.style.borderTop = '1px solid rgb(191, 190, 190)';
      // actionDiv.style.height = `${41 * scale}px`;
      // warp.appendChild(actionDiv);

      // const cancel = document.createElement('div');
      // cancel.id = 'vhs-modal-cancel';
      // cancel.style.float = 'left';
      // cancel.style.width = '50%';
      // cancel.style.color = 'red';
      // cancel.style.height = `${41 * scale}px`;
      // cancel.style.lineHeight = `${41 * scale}px`;
      // actionDiv.appendChild(cancel);

      // const confirm = document.createElement('div');
      // confirm.id = 'vhs-modal-confirm';
      // confirm.style.float = 'right';
      // confirm.style.width = '49%';
      // confirm.style.height = `${41 * scale}px`;
      // confirm.style.lineHeight = `${41 * scale}px`;
      // confirm.style.borderLeft = '1px solid rgb(191, 190, 190)';
      // actionDiv.appendChild(confirm);
    };

    const removeModal = () => {
      const w = document.getElementById('vhs-modal-bg-cover');
      w.parentNode.removeChild(w);
    };

    const fixModalPosition = () => {
      const scale = that.getValidMetaWidthScale();
      const warpDiv = document.getElementById('vhs-modal-warp');
      const winOutHeight = window.outerHeight;
      warpDiv.style.top = `${((winOutHeight * scale) - warpDiv.clientHeight) / 2}px`;
    };

    if (modal.content) {
      createModalTemplate();
      // default "提示", dynamic set modal title
      const title = document.getElementById('vhs-modal-title');
      title.innerText = modal.title || '提示';

      const content = document.getElementById('vhs-modal-content');
      content.innerText = modal.content;

      const cancel = document.getElementById('vhs-modal-cancel');
      cancel.innerHTML = modal.cancelTitle || '取消';

      // position fix to window center
      fixModalPosition();

      cancel.onclick = () => {
        if (modal.cancel) {
          modal.cancel();
        }
        removeModal();
      };

      const confirm = document.getElementById('vhs-modal-confirm');
      confirm.innerHTML = modal.confirmTitle || '确认';
      confirm.onclick = () => {
        if (modal.confirm) modal.confirm();
        removeModal();
      };
    }
  },
};
export default vhs;
