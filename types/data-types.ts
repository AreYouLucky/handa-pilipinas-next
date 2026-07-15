export type LaravelBoolean = boolean | 0 | 1;

export type FooterCategory = {
  category_id: number | string;
  title: string;
  slug: string;
};

export type Material = {
  classification: string | null;
  title: string;
  slug: string;
  description: string | null;
  description_text: string | null;
  filter_type: string | null;
  info_type_material: string | null;
  author: string | null;
  encoded_by_id: number | null;
  encoded_at: string | null;
  modified_by_id: number | null;
  modified_at: string | null;
  submitted_at: string | null;
  publisher_publish_date: string | null;
  agency: string | null;
  region: string | null;
  regional_office: string | null;
  thumbnail: string | null;
  tags: string | string[] | null;
  source_url: string | null;
  hits: number;
  status: string | number;
  publish_date: string | null;
  is_publish: LaravelBoolean;
  is_press_release: LaravelBoolean;
  trash: LaravelBoolean;
  is_archive: LaravelBoolean;
};
