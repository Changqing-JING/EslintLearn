export interface Block {
  text: string;
  filename: string;
}

type PreprocessFn = (text: string, filename: string) => Block[];

export interface Processor {
  preprocess: PreprocessFn;
}

const asProcessor: Processor = {
  // takes text of the file and filename
  preprocess: function (text: string, filename: string): Block[] {
    const code = text.replace("@noinline", " ");

    return [
      // return an array of code blocks to lint
      { text: code, filename: filename },
    ];
  },
};

export const processor = {
  ".ts": asProcessor,
};
