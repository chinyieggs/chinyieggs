import { AnimatedSection } from '@/components/AnimatedSection'
import { Hero } from '@/components/Hero'
import { Button } from '@/components/ui/button'
import PageClient from './page.client'
import Link from 'next/link'

export const metadata = {
  title: '動畫效果示範頁面',
  description: '展示所有 Framer Motion 動畫效果和新設計元件',
}

export default function DemoPage() {
  return (
    <article className="pb-24">
      <PageClient />

      {/* Hero 示範 */}
      <Hero
        title="動畫效果示範頁面"
        subtitle="體驗流暢的滾動動畫與現代化設計"
        description="這個頁面展示了所有 Framer Motion 動畫效果、白底紅點綴配色系統，以及響應式設計元件。向下滾動查看各種動畫效果。"
        ctaButtons={[
          { text: '返回首頁', href: '/', variant: 'default' },
        ]}
        alignment="center"
      />

      {/* 頁面內導覽目錄 */}
      <section className="container py-12">
        <AnimatedSection animation="fade-up">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">快速導覽</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="#fade-up"
                className="p-4 text-center bg-background hover:bg-primary/5 border border-border rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="font-semibold text-primary">Fade Up</div>
                <div className="text-sm text-muted-foreground mt-1">向上淡入</div>
              </Link>
              <Link
                href="#fade-lr"
                className="p-4 text-center bg-background hover:bg-primary/5 border border-border rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="font-semibold text-primary">Fade L/R</div>
                <div className="text-sm text-muted-foreground mt-1">左右淡入</div>
              </Link>
              <Link
                href="#zoom"
                className="p-4 text-center bg-background hover:bg-primary/5 border border-border rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="font-semibold text-primary">Zoom In</div>
                <div className="text-sm text-muted-foreground mt-1">縮放淡入</div>
              </Link>
              <Link
                href="#stagger"
                className="p-4 text-center bg-background hover:bg-primary/5 border border-border rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="font-semibold text-primary">Stagger</div>
                <div className="text-sm text-muted-foreground mt-1">延遲動畫</div>
              </Link>
              <Link
                href="#buttons"
                className="p-4 text-center bg-background hover:bg-primary/5 border border-border rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="font-semibold text-primary">按鈕樣式</div>
                <div className="text-sm text-muted-foreground mt-1">UI 元件</div>
              </Link>
              <Link
                href="#hover"
                className="p-4 text-center bg-background hover:bg-primary/5 border border-border rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="font-semibold text-primary">Hover 效果</div>
                <div className="text-sm text-muted-foreground mt-1">互動動畫</div>
              </Link>
              <Link
                href="#colors"
                className="p-4 text-center bg-background hover:bg-primary/5 border border-border rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="font-semibold text-primary">配色系統</div>
                <div className="text-sm text-muted-foreground mt-1">色彩方案</div>
              </Link>
              <Link
                href="/"
                className="p-4 text-center bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="font-semibold text-primary">首頁</div>
                <div className="text-sm text-primary/80 mt-1">實際應用</div>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 動畫測試區塊 */}
      <section className="container space-y-32 py-24">
        {/* Fade Up 動畫 */}
        <div id="fade-up" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Fade Up 動畫</h2>
          <AnimatedSection animation="fade-up">
            <div className="p-8 bg-card border border-border rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">從下往上淡入</h3>
              <p className="text-muted-foreground">
                這個區塊使用 fade-up 動畫效果，當您滾動到這裡時會從下方淡入出現。
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Fade Left & Right 動畫 */}
        <div id="fade-lr" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Fade Left & Right 動畫</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection animation="fade-right">
              <div className="p-8 bg-card border border-border rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary">從左往右淡入</h3>
                <p className="text-muted-foreground">
                  使用 fade-right 動畫，從左側滑入。
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <div className="p-8 bg-card border border-border rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary">從右往左淡入</h3>
                <p className="text-muted-foreground">
                  使用 fade-left 動畫，從右側滑入。
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Zoom In 動畫 */}
        <div id="zoom" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Zoom In 動畫</h2>
          <AnimatedSection animation="zoom-in">
            <div className="p-8 bg-card border border-border rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">縮放淡入</h3>
              <p className="text-muted-foreground">
                這個區塊使用 zoom-in 動畫效果，從小到大縮放淡入。
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Stagger 效果示範 */}
        <div id="stagger" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Stagger 效果（多個元素延遲動畫）
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 0.1}>
                <div className="p-6 bg-card border border-border rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">卡片 {i + 1}</h3>
                  <p className="text-muted-foreground text-sm">
                    每張卡片都有 {i * 100}ms 的延遲動畫效果。
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* 按鈕樣式示範 */}
        <div id="buttons" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">按鈕樣式（白底紅點綴）</h2>
          <AnimatedSection animation="fade-up">
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default">主要按鈕（紅色）</Button>
              <Button variant="secondary">次要按鈕</Button>
              <Button variant="outline">邊框按鈕</Button>
              <Button variant="ghost">透明按鈕</Button>
              <Button variant="destructive">危險按鈕</Button>
            </div>
          </AnimatedSection>
        </div>

        {/* 卡片 Hover 效果示範 */}
        <div id="hover" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">
            卡片 Hover 效果（陰影 + 上移 + 紅線）
          </h2>
          <AnimatedSection animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative border border-border rounded-lg overflow-hidden bg-card cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Hover 這張卡片
                  </h3>
                  <p className="text-muted-foreground">
                    觀察陰影加深、向上移動和紅色底線效果
                  </p>
                </div>
              </div>

              <div className="group relative border border-border rounded-lg overflow-hidden bg-card cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    第二張卡片
                  </h3>
                  <p className="text-muted-foreground">
                    同樣的 Hover 動畫效果
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* 配色示範 */}
        <div id="colors" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">配色系統示範</h2>
          <AnimatedSection animation="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-full h-24 bg-primary rounded-lg mb-2" />
                <p className="text-sm font-medium">主紅色</p>
                <p className="text-xs text-muted-foreground">Primary</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-brand-red-light rounded-lg mb-2" />
                <p className="text-sm font-medium">淺紅色</p>
                <p className="text-xs text-muted-foreground">Red Light</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-card border border-border rounded-lg mb-2" />
                <p className="text-sm font-medium">卡片背景</p>
                <p className="text-xs text-muted-foreground">Card</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-muted rounded-lg mb-2" />
                <p className="text-sm font-medium">柔和背景</p>
                <p className="text-xs text-muted-foreground">Muted</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </article>
  )
}
