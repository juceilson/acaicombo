package br.com.acaicombo.service;

import br.com.acaicombo.model.Acai;
import br.com.acaicombo.repository.AcaiRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final AcaiRepository acaiRepo;

    public ReportService(AcaiRepository acaiRepo) {
        this.acaiRepo = acaiRepo;
    }

    public byte[] generateReport() {
        try {
            List<Acai> acais = acaiRepo.findAll();

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(acais);

            InputStream reportStream = getClass()
                    .getResourceAsStream("/relatorio/acais.jasper");

            JasperReport reporte = (JasperReport) JRLoader.loadObject(reportStream);
            Map<String, Object> params = new HashMap<>();
            JasperPrint print = JasperFillManager.fillReport(reporte, params, dataSource);

            return JasperExportManager.exportReportToPdf(print);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar relatório", e);
        }
    }
}
